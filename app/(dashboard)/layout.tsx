"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/provider"
import { useClientOnly } from "@/hooks/use-client-only"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { session, isLoading: authLoading } = useSupabase()
  const isClient = useClientOnly()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isClient) {
      if (!session && !authLoading) {
        router.push("/login")
      } else {
        setIsLoading(false)
      }
    }
  }, [session, authLoading, router, isClient])

  // Show loading state while checking authentication
  if (!isClient || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  // If no session, don't render the dashboard (router will redirect)
  if (!session) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6">{children}</main>
    </div>
  )
}

