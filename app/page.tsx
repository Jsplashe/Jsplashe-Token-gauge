"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase/provider"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const { session, isLoading } = useSupabase()

  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    } else if (!isLoading) {
      router.push("/login")
    }
  }, [router, session, isLoading])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Redirecting...</span>
    </div>
  )
}

