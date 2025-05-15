"use client"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser, loading } = useAuth()
  const location = useLocation()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        console.error("Protected route access denied: No user logged in")
        setError("You must be logged in to access this page")
      } else if (requiredRole && currentUser.user_type !== requiredRole) {
        console.error(
          `Protected route access denied: User type ${currentUser.user_type} does not match required role ${requiredRole}`,
        )
        setError(`This page requires ${requiredRole} access`)
      } else {
        console.log("Protected route access granted for user:", currentUser.name)
      }
    }
  }, [loading, currentUser, requiredRole])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-TCDG1"></div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <Navigate to="/login" state={{ from: location, error: "You must be logged in to access this page" }} replace />
    )
  }

  if (requiredRole && currentUser.user_type !== requiredRole) {
    return <Navigate to="/" state={{ error: `This page requires ${requiredRole} access` }} replace />
  }

  return children
}

export default ProtectedRoute
