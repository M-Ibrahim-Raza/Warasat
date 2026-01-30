import React, { useState } from "react";
import { API_ENDPOINTS } from "@/config/api";

const Chatbot = () => {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [isOpen, setIsOpen] = useState(false); 

  const sendMessage = async () => {
    if (!input.trim()) return; 
    setLoading(true);

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]); 

    try {
      const response = await fetch(API_ENDPOINTS.CHATBOT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();

      const botMessage = { sender: "bot", text: data.answer || "Error getting response" };
      setMessages((prev) => [...prev, botMessage]); 
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error contacting server." }]);
    }

    setInput(""); 
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-TCDG2 text-white rounded-full p-4 shadow-md shadow-slate-600 hover:bg-TCDG1 hover:scale-105 hover:text-background_color transition hover:shadow-none"
      >
        <span className="text-xl font-semibold">💬 Chat Bot</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col z-[9999]">
          <div className="p-4 h-80 overflow-y-auto border-b border-gray-200">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md max-w-xs ${
                  msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="bg-gray-200 text-black p-2 rounded-md self-start">Typing...</div>}
          </div>

          <div className="p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
