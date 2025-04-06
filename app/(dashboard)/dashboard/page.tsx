"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSupabase } from "@/lib/supabase/provider"
import { useClientOnly } from "@/hooks/use-client-only"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardChart } from "@/components/dashboard/dashboard-chart"
import { WatchlistWidget } from "@/components/dashboard/watchlist-widget"
import { TrendingWidget } from "@/components/dashboard/trending-widget"
import { LeaderboardWidget } from "@/components/dashboard/leaderboard-widget"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const { session } = useSupabase()
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isClient = useClientOnly()

  useEffect(() => {
    if (session?.user) {
      // In a real app, we would fetch the user profile from the database
      setUserName(session.user.email?.split("@")[0] || "User")
      setIsLoading(false)
    }
  }, [session])

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <Skeleton className="h-6 w-[180px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <Skeleton className="h-6 w-[180px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Welcome${userName ? ` back, ${userName}` : ""}`}
        description="Monitor and analyze crypto projects with AI-powered insights."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Market Cap</CardDescription>
            <CardTitle className="text-2xl">$1.24T</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 font-medium">+2.5%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>24h Volume</CardDescription>
            <CardTitle className="text-2xl">$48.8B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="text-red-500 font-medium">-3.2%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>BTC Dominance</CardDescription>
            <CardTitle className="text-2xl">52.4%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-500 font-medium">+0.8%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Fear & Greed Index</CardDescription>
            <CardTitle className="text-2xl">65</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <Badge className="bg-green-500 text-white">Greed</Badge>
              <span className="ml-1">Bullish sentiment</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="price">
              <TabsList className="mb-4">
                <TabsTrigger value="price">Price</TabsTrigger>
                <TabsTrigger value="volume">Volume</TabsTrigger>
                <TabsTrigger value="marketcap">Market Cap</TabsTrigger>
              </TabsList>
              <TabsContent value="price" className="h-[300px]">
                <DashboardChart type="price" />
              </TabsContent>
              <TabsContent value="volume" className="h-[300px]">
                <DashboardChart type="volume" />
              </TabsContent>
              <TabsContent value="marketcap" className="h-[300px]">
                <DashboardChart type="marketcap" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <TrendingWidget />
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WatchlistWidget />
        <Card className="lg:col-span-2">
          <LeaderboardWidget />
        </Card>
      </div>
    </div>
  )
}

