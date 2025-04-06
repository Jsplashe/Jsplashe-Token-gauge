"use client"

import { useState, useEffect } from "react"
import { useClientOnly } from "@/hooks/use-client-only"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockProjects } from "@/lib/mock-data"
import Link from "next/link"
import { Star } from "lucide-react"

export function TrendingProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const isClient = useClientOnly()

  useEffect(() => {
    // Sort projects by rating for "trending" mock data
    const sortedProjects = [...mockProjects].sort((a, b) => b.rating - a.rating).slice(0, 5)
    setProjects(sortedProjects)
  }, [])

  if (!isClient) {
    return (
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
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/project/${project.id}`}
          className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-muted"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={project.name} />
            <AvatarFallback>{project.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{project.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${project.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {project.priceChange24h >= 0 ? "+" : ""}
                {project.priceChange24h}%
              </span>
              <span className="text-xs text-muted-foreground truncate">${project.price.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{project.rating.toFixed(1)}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

