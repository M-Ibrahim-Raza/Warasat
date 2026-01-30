/**
 * Ulema Selection Page
 * 
 * Displays list of available Ulema for users to start a chat.
 * Users can share their inheritance calculation data when starting a chat.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_ENDPOINTS, authFetch } from "../config/api";

const UlemaSelection = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  const [ulemas, setUlemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startingChat, setStartingChat] = useState(null);

  // Fetch Ulema list
  useEffect(() => {
    const fetchUlemas = async () => {
      try {
        const response = await authFetch(API_ENDPOINTS.ULEMAS);
        const data = await response.json();

        if (data.success) {
          setUlemas(data.ulemas);
        } else {
          setError("Failed to load Ulema list");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated()) {
      fetchUlemas();
    }
  }, [isAuthenticated]);

  // Start chat with selected Ulema
  const handleStartChat = async (ulemaId) => {
    setStartingChat(ulemaId);
    setError(null);

    try {
      // Only get inheritance data if user came from Calculation page (flag is set)
      const shouldShareInheritance = localStorage.getItem("share_inheritance") === "true";
      const inheritanceData = shouldShareInheritance 
        ? localStorage.getItem("inheritance_result") 
        : null;

      const response = await authFetch(API_ENDPOINTS.CHATS_START, {
        method: "POST",
        body: JSON.stringify({
          ulema_id: ulemaId,
          inheritance_data: inheritanceData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Clear the share flag after starting chat
        localStorage.removeItem("share_inheritance");
        navigate(`/chat/${data.chat_id}`);
      } else {
        setError("Failed to start chat. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setStartingChat(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Ulema...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-emerald-800">
            Consult with Ulema
          </h1>
          <p className="mt-2 text-gray-600">
            Choose a scholar to verify your inheritance calculation
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Ulema Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ulemas.map((ulema) => (
            <div
              key={ulema.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-2xl font-serif text-emerald-700">
                    {ulema.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{ulema.name}</h3>
                  <p className="text-sm text-gray-500">{ulema.expertise}</p>
                </div>
              </div>

              {/* Online Status */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    ulema.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                <span className="text-sm text-gray-600">
                  {ulema.isOnline ? "Online" : "Offline"}
                </span>
              </div>

              {/* Start Chat Button */}
              <button
                onClick={() => handleStartChat(ulema.id)}
                disabled={startingChat === ulema.id}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {startingChat === ulema.id ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
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
                    Starting...
                  </>
                ) : (
                  <>
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Start Chat
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {ulemas.length === 0 && (
          <div className="text-center py-12">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No Ulema Available
            </h3>
            <p className="text-gray-500">
              Please check back later for available scholars.
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UlemaSelection;

