"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import { mockProjects } from "@/lib/mock-data"

export function TrendingWidget() {
  const [trendingProjects, setTrendingProjects] = useState<any[]>([])

  useEffect(() => {
    // In a real app, we would fetch trending projects from the database
    // For demo purposes, we'll sort mock projects by rating
    const sorted = [...mockProjects].sort((a, b) => b.rating - a.rating).slice(0, 5)

    setTrendingProjects(sorted)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Trending Projects</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/explore">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold">
                  {index + 1}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={project.name} />
                  <AvatarFallback>{project.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                    <span className={`text-xs ${project.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {project.priceChange24h >= 0 ? "+" : ""}
                      {project.priceChange24h}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

