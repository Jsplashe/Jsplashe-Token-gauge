"use client"

import { useEffect, useState } from "react"
import { useClientOnly } from "@/hooks/use-client-only"
import { Skeleton } from "@/components/ui/skeleton"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface DashboardChartProps {
  type: "price" | "volume" | "marketcap"
}

export function DashboardChart({ type }: DashboardChartProps) {
  const [data, setData] = useState<any[]>([])
  const isClient = useClientOnly()

  useEffect(() => {
    // Generate mock data
    const generateData = () => {
      const result = []
      const today = new Date()
      const baseValue = type === "price" ? 50000 : type === "volume" ? 30000000000 : 1000000000000
      let currentValue = baseValue

      for (let i = 30; i >= 0; i--) {
        const date = new Date()
        date.setDate(today.getDate() - i)

        // Random walk with slight upward trend
        const change = (Math.random() - 0.45) * (baseValue * 0.03)
        currentValue += change

        // Ensure value doesn't go negative
        currentValue = Math.max(currentValue, baseValue * 0.5)

        result.push({
          date: date.toISOString(),
          value: currentValue,
        })
      }

      return result
    }

    setData(generateData())
  }, [type])

  if (!isClient) {
    return <Skeleton className="h-[300px] w-full" />
  }

  const formatValue = (value: number) => {
    if (type === "price") {
      return `$${value.toLocaleString()}`
    } else if (type === "volume") {
      return `$${(value / 1000000000).toFixed(2)}B`
    } else {
      return `$${(value / 1000000000).toFixed(2)}B`
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }

  if (type === "volume") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={formatDate} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => formatValue(value)}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                        <span className="font-bold text-xs">{formatDate(payload[0].payload.date)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Volume</span>
                        <span className="font-bold text-xs">{formatValue(payload[0].value)}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={formatDate} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => formatValue(value)}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-xs">{formatDate(payload[0].payload.date)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {type === "price" ? "Price" : "Market Cap"}
                      </span>
                      <span className="font-bold text-xs">{formatValue(payload[0].value)}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fill="url(#colorValue)"
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

