"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { router, usePathname } from "expo-router"
import type { RootState } from "../store/store"

export function useAuthCheck() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const pathname = usePathname()

  useEffect(() => {
    const inAuthGroup = pathname.startsWith("/(auth)")

    if (!isAuthenticated && !inAuthGroup && pathname !== "/") {
      // Redirect to login if not authenticated and not in auth group
      router.replace("/login")
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home if authenticated and in auth group
      router.replace("/")
    }
  }, [isAuthenticated, pathname])

  return isAuthenticated
}
