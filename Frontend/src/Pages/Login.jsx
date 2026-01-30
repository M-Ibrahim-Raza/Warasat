/**
 * Login Page
 * 
 * Single login page with User/Ulema toggle.
 * Redirects to appropriate dashboard after login.
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please fill in all fields");
      return;
    }

    const result = await login(email, password, userType);

    if (result.success) {
      // Check for redirect URL (e.g., from Calculation page)
      const redirectUrl = localStorage.getItem("redirect_after_login");
      localStorage.removeItem("redirect_after_login");
      
      // Redirect based on user type or stored redirect
      if (result.user.user_type === "ulema") {
        navigate("/ulema-dashboard");
      } else if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate("/");
      }
    } else {
      setLocalError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-emerald-800 tracking-tight">
            Warasat
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Islamic Inheritance Calculator
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Welcome Back
          </h2>

          {/* User Type Toggle */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setUserType("user")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                userType === "user"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setUserType("ulema")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                userType === "ulema"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Ulema
            </button>
          </div>

          {/* Error Display */}
          {(localError || error) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {localError || error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-emerald-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
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
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Signup Link (only for users) */}
          {userType === "user" && (
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Sign up
              </Link>
            </p>
          )}

          {/* Ulema notice */}
          {userType === "ulema" && (
            <p className="mt-6 text-center text-xs text-gray-500">
              Ulema accounts are managed by administrators. Contact support if
              you need access.
            </p>
          )}
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

