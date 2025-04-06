"use client"

import type { ReactNode } from "react"
import { useClientOnly } from "@/hooks/use-client-only"

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Component that only renders its children on the client
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isClient = useClientOnly()

  if (!isClient) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

