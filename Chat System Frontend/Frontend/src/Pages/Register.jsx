"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Heading from "../../Components/Heading"
import Button from "../../Components/Button"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const result = await register(name, email, password)

      if (result.success) {
        navigate("/login")
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (err) {
      setError("An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Heading className="w-[35rem]">Register for Warasat</Heading>
      <div className="bg-white/60 p-6 rounded-xl mt-4 mx-auto max-w-md">
        {error && <div className="bg-TCR1/20 text-TCR1 p-3 rounded-md mb-4 text-center font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold text-TCDG2 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-TCLG1/60 border-2 border-TCDG1 rounded-lg text-TCDG2 focus:outline-none focus:ring-2 focus:ring-TCDG1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-TCDG2 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-TCLG1/60 border-2 border-TCDG1 rounded-lg text-TCDG2 focus:outline-none focus:ring-2 focus:ring-TCDG1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-TCDG2 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-TCLG1/60 border-2 border-TCDG1 rounded-lg text-TCDG2 focus:outline-none focus:ring-2 focus:ring-TCDG1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirm-password" className="font-semibold text-TCDG2 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 bg-TCLG1/60 border-2 border-TCDG1 rounded-lg text-TCDG2 focus:outline-none focus:ring-2 focus:ring-TCDG1"
              required
            />
          </div>

          <Button type="submit" className="mt-4 !py-2" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>

          <p className="text-center text-TCDG2 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-TCDG1 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Register
