/**
 * Chat Page
 * 
 * Real-time chat interface using WebSocket.
 * Supports both user-to-ulema and ulema-to-user messaging.
 */

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_ENDPOINTS, authFetch } from "../config/api";

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch chat details and messages
  useEffect(() => {
    const fetchChatData = async () => {
      if (!isAuthenticated()) return;

      try {
        // Fetch chat details
        const chatResponse = await authFetch(API_ENDPOINTS.CHATS_GET(chatId));
        const chatData = await chatResponse.json();

        if (!chatData.success) {
          setError("Chat not found");
          setLoading(false);
          return;
        }

        setChat(chatData.chat);

        // Fetch messages
        const messagesResponse = await authFetch(
          API_ENDPOINTS.CHATS_MESSAGES(chatId)
        );
        const messagesData = await messagesResponse.json();

        if (messagesData.success) {
          setMessages(messagesData.messages);
        }
      } catch (err) {
        setError("Failed to load chat");
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatId, isAuthenticated]);

  // WebSocket connection
  useEffect(() => {
    if (!token || !chatId) return;

    const wsUrl = API_ENDPOINTS.WS_CHAT(chatId, token);
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "new_message") {
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === data.message.id)) {
              return prev;
            }
            return [...prev, data.message];
          });
        }
      } catch (e) {
        console.error("WebSocket message parse error:", e);
      }
    };

    ws.onclose = () => {
      setWsConnected(false);
    };

    ws.onerror = () => {
      setWsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [token, chatId]);

  // Send message via HTTP (WebSocket will broadcast)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);

    try {
      const response = await authFetch(API_ENDPOINTS.CHATS_MESSAGES(chatId), {
        method: "POST",
        body: JSON.stringify({ content: newMessage.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        // Message will be added via WebSocket, but add immediately for responsiveness
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.message.id)) {
            return prev;
          }
          return [...prev, data.message];
        });
        setNewMessage("");
      }
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Download PDF report from chat inheritance data
  const handleDownloadPDF = async () => {
    try {
      // Get inheritance data from chat
      const inheritanceDataStr = chat?.inheritance_data;
      if (!inheritanceDataStr) {
        alert("No inheritance data available");
        return;
      }

      const data = JSON.parse(inheritanceDataStr);
      
      const response = await axios.post(
        API_ENDPOINTS.PDF_REPORT,
        {
          total_amount: data.total_amount,
          funeral_expenses: data.funeral_expenses || 0,
          mehr: data.mehr || 0,
          debt: data.debt || 0,
          will: data.will || 0,
          currency: data.currency || "USD",
          gender: data.gender || "male",
          heir_list: data.heir_shares.map(heir => ({
            relation: heir.relation,
            category: heir.category || [],
            val: heir.count,
            amount: heir.amount
          })),
        },
        { responseType: "blob" }
      );

      // Create downloadable link
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Inheritance-Calculation.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("PDF download error:", err);
      alert("Failed to download PDF report");
    }
  };

  // Render inheritance message with formatted content
  const renderInheritanceMessage = (message) => {
    const lines = message.content.split("\n");
    
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 max-w-[85%] shadow-md">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-emerald-200">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-semibold text-emerald-800">Inheritance Calculation Shared</span>
          </div>
          
          {/* Content */}
          <div className="text-sm text-gray-700 space-y-1">
            {lines.map((line, idx) => {
              // Skip header line and empty lines at start
              if (idx === 0 || (idx === 1 && line === "")) return null;
              // Skip PDF line as we have a button
              if (line.includes("PDF report available")) return null;
              
              // Style section headers
              if (line.includes("**")) {
                return (
                  <p key={idx} className="font-semibold text-emerald-700 mt-2">
                    {line.replace(/\*\*/g, "")}
                  </p>
                );
              }
              
              // Style list items
              if (line.startsWith("•")) {
                return (
                  <p key={idx} className="pl-2 text-gray-600">
                    {line}
                  </p>
                );
              }
              
              // Style currency lines
              if (line.includes("💰") || line.includes("📊")) {
                return (
                  <p key={idx} className="font-medium text-gray-700">
                    {line}
                  </p>
                );
              }
              
              return line ? <p key={idx}>{line}</p> : null;
            })}
          </div>
          
          {/* Download Button */}
          <button
            onClick={handleDownloadPDF}
            className="mt-4 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF Report
          </button>
          
          {/* Timestamp */}
          <p className="text-xs text-gray-400 text-center mt-2">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const otherPartyName =
    user?.user_type === "ulema" ? chat?.user_name : chat?.ulema_name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-emerald-100 px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-lg font-serif text-emerald-700">
              {otherPartyName?.charAt(0) || "?"}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{otherPartyName}</h2>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  wsConnected ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              <span className="text-xs text-gray-500">
                {wsConnected ? "Connected" : "Connecting..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.sender_id === user?.id;
          const isSystem = message.sender_type === "system";
          const isInheritance = message.sender_type === "inheritance";

          // Render inheritance calculation message
          if (isInheritance) {
            return <React.Fragment key={message.id}>{renderInheritanceMessage(message)}</React.Fragment>;
          }

          // Render system message
          if (isSystem) {
            return (
              <div key={message.id} className="flex justify-center">
                <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full">
                  {message.content}
                </div>
              </div>
            );
          }

          // Render regular message
          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  isOwnMessage
                    ? "bg-emerald-600 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
                }`}
              >
                <p className="break-words">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    isOwnMessage ? "text-emerald-100" : "text-gray-400"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-emerald-100 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sending ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

