"use client"

import { useState, useEffect } from "react"
import { useClientOnly } from "@/hooks/use-client-only"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockProjects } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function RecentProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const isClient = useClientOnly()

  useEffect(() => {
    // Sort projects by a hypothetical "createdAt" date (we'll use the id for mock purposes)
    const sortedProjects = [...mockProjects].sort((a, b) => a.id.localeCompare(b.id)).slice(0, 5)
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
            <div className="ml-auto">
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={project.name} />
            <AvatarFallback>{project.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{project.name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {project.category}
              </Badge>
              <span className="text-xs text-muted-foreground">Added 2 days ago</span>
            </div>
          </div>
          <div className="ml-auto">
            <Button asChild size="sm" variant="outline">
              <Link href={`/project/${project.id}`}>
                View
                <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
      <div className="pt-2">
        <Button asChild variant="ghost" className="w-full">
          <Link href="/explore">
            View all projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

