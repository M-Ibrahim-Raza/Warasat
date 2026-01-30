/**
 * Ulema Dashboard
 * 
 * Dashboard for Ulema to view and manage their chat conversations.
 * Shows list of users who have started chats with unread message counts.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_ENDPOINTS, authFetch } from "../config/api";

const UlemaDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isUlema } = useAuth();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await authFetch(API_ENDPOINTS.ULEMA_CHATS);
        const data = await response.json();

        if (data.success) {
          setChats(data.chats);
        } else {
          setError("Failed to load chats");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated() && isUlema()) {
      fetchChats();
    }
  }, [isAuthenticated, isUlema]);

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-emerald-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-emerald-800">
              Ulema Dashboard
            </h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
          <p className="text-sm text-gray-500">
            {chats.length} active conversation{chats.length !== 1 && "s"}
          </p>
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="w-full bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100 p-4 hover:shadow-lg transition-all duration-200 text-left flex items-center gap-4"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-lg font-serif text-emerald-700">
                    {chat.user_name?.charAt(0) || "U"}
                  </span>
                </div>
                {chat.unread_count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {chat.unread_count > 9 ? "9+" : chat.unread_count}
                  </span>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {chat.user_name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTime(chat.last_message_time)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-0.5">
                  {chat.last_message || "No messages yet"}
                </p>
              </div>

              {/* Arrow */}
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {chats.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No Conversations Yet
            </h3>
            <p className="text-gray-500">
              When users start chats with you, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UlemaDashboard;

