"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Mock user type
type User = {
  id: string
  email: string
}

// Mock session type
type Session = {
  user: User
}

// Auth context type
type AuthContextType = {
  session: Session | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session in localStorage on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const storedSession = localStorage.getItem("mockSession")
        if (storedSession) {
          setSession(JSON.parse(storedSession))
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Only run in browser environment
    if (typeof window !== "undefined") {
      checkSession()
    } else {
      setIsLoading(false)
    }
  }, [])

  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create mock session
    const mockUser = { id: "123", email }
    const mockSession = { user: mockUser }

    // Store in localStorage
    localStorage.setItem("mockSession", JSON.stringify(mockSession))

    // Update state
    setSession(mockSession)
    setIsLoading(false)
  }

  // Mock sign out function
  const signOut = async () => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Clear from localStorage
    localStorage.removeItem("mockSession")

    // Update state
    setSession(null)
    setIsLoading(false)
  }

  // Create context value
  const value = {
    session,
    signIn,
    signOut,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useSupabase = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}

