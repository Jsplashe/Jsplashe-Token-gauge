"use client"

import { useClientOnly } from "@/hooks/use-client-only"
import { Skeleton } from "@/components/ui/skeleton"

// Import Recharts components directly
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Export a safe wrapper for all chart components
export function ChartContainer({ children, height = 300 }) {
  const isClient = useClientOnly()

  if (!isClient) {
    return <Skeleton className={`w-full h-[${height}px]`} />
  }

  return <>{children}</>
}

// Export all Recharts components directly
export { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis }

