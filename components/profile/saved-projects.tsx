"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockProjects } from "@/lib/mock-data"
import Link from "next/link"
import { ArrowRight, Star, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function SavedProjects() {
  const { toast } = useToast()
  const [savedProjects, setSavedProjects] = useState<any[]>([])

  useEffect(() => {
    // In a real app, we would fetch the user's saved projects from the database
    // For demo purposes, we'll use a subset of mock projects
    const randomProjects = [...mockProjects].sort(() => 0.5 - Math.random()).slice(0, 5)

    setSavedProjects(randomProjects)
  }, [])

  const removeFromWatchlist = (projectId: string) => {
    setSavedProjects((prev) => prev.filter((project) => project.id !== projectId))

    toast({
      title: "Project removed",
      description: "Project has been removed from your watchlist.",
    })
  }

  if (savedProjects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">You haven't saved any projects yet.</p>
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
      <CardHeader>
        <CardTitle>Saved Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={project.name} />
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
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{project.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => removeFromWatchlist(project.id)}>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/project/${project.id}`}>
                    View
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

