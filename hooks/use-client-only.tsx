"use client"

import { useState, useEffect } from "react"

/**
 * Hook to safely handle client-side only code
 * @returns {boolean} Whether the component is mounted on the client
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

