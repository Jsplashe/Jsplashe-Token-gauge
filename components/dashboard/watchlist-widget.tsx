"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { mockProjects } from "@/lib/mock-data"

export function WatchlistWidget() {
  const [watchlist, setWatchlist] = useState<any[]>([])

  useEffect(() => {
    // In a real app, we would fetch the user's watchlist from the database
    // For demo purposes, we'll use a subset of mock projects
    const randomProjects = [...mockProjects].sort(() => 0.5 - Math.random()).slice(0, 3)

    setWatchlist(randomProjects)
  }, [])

  if (watchlist.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">You haven't added any projects to your watchlist yet.</p>
            <Button asChild>
              <Link href="/explore">Explore Projects</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>My Watchlist</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/watchlist">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {watchlist.map((project) => (
            <div key={project.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={project.name} />
                  <AvatarFallback>{project.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${project.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {project.priceChange24h >= 0 ? "+" : ""}
                      {project.priceChange24h}%
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{project.rating.toFixed(1)}</span>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/project/${project.id}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

