"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Heading from "../../Components/Heading"
import Button from "../../Components/Button"
import RadioButton from "../../Components/RadioButton"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("user")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Check for error message in location state (from redirects)
  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error)
    }
  }, [location])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log(`Attempting to login as ${userType} with email: ${email}`)
      const result = await login(email, password, userType)

      if (result.success) {
        console.log(
          "Login successful, navigating to:",
          location.state?.from?.pathname || (userType === "user" ? "/" : "/ulema-dashboard"),
        )
        navigate(location.state?.from?.pathname || (userType === "user" ? "/" : "/ulema-dashboard"))
      } else {
        console.error("Login failed:", result.error)
        setError(result.error || "Login failed")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Heading className="w-[35rem]">Login to Warasat</Heading>
      <div className="bg-white/60 p-6 rounded-xl mt-4 mx-auto max-w-md">
        {error && <div className="bg-TCR1/20 text-TCR1 p-3 rounded-md mb-4 text-center font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-center gap-6 mb-2">
            <RadioButton
              id="user-type"
              name="user-type"
              value="user"
              checked={userType === "user"}
              onChange={() => setUserType("user")}
            >
              User
            </RadioButton>

            <RadioButton
              id="ulema-type"
              name="user-type"
              value="ulema"
              checked={userType === "ulema"}
              onChange={() => setUserType("ulema")}
            >
              Ulema
            </RadioButton>
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

          <Button type="submit" className="mt-4 !py-2" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {userType === "user" && (
            <p className="text-center text-TCDG2 mt-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-TCDG1 font-semibold hover:underline">
                Register
              </Link>
            </p>
          )}
        </form>
      </div>
    </>
  )
}

export default Login
