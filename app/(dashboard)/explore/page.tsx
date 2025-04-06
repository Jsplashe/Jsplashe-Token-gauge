"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectsTable } from "@/components/projects/projects-table"
import { ProjectsGrid } from "@/components/projects/projects-grid"
import { ProjectFilter } from "@/components/projects/project-filter"
import { useClientOnly } from "@/hooks/use-client-only"
import { Button } from "@/components/ui/button"

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const isClient = useClientOnly()

  // Get search params
  const searchQuery = searchParams.get("q") || ""
  const categoryFilter = searchParams.get("category") || "all"
  const riskFilter = searchParams.get("risk") || "all"
  const verificationFilter = searchParams.get("verification") || "all"

  // Initialize view mode from URL
  useEffect(() => {
    const view = searchParams.get("view")
    if (view === "table" || view === "grid") {
      setViewMode(view)
    }
  }, [searchParams])

  // Handle project selection
  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  // Handle compare action
  const handleCompare = () => {
    if (selectedProjects.length < 2) {
      alert("Please select at least 2 projects to compare")
      return
    }

    // In a real app, we would navigate to a comparison page
    alert(`Comparing projects: ${selectedProjects.join(", ")}`)
  }

  // Handle save to watchlist
  const handleSaveToWatchlist = () => {
    if (selectedProjects.length === 0) {
      alert("Please select at least 1 project to save")
      return
    }

    // In a real app, we would save to the user's watchlist
    alert(`Saving projects to watchlist: ${selectedProjects.join(", ")}`)
    setSelectedProjects([])
  }

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="h-10 w-[250px] bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-[350px] bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="w-full md:w-64 h-10 bg-gray-200 animate-pulse rounded" />
          <div className="flex gap-2">
            <div className="w-32 h-10 bg-gray-200 animate-pulse rounded" />
            <div className="w-32 h-10 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Explore Projects"
        description="Discover and analyze cryptocurrency projects with detailed metrics and risk assessments."
      />

      <ProjectFilter onViewChange={setViewMode} viewMode={viewMode} />

      {selectedProjects.length > 0 && (
        <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{selectedProjects.length} projects selected</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedProjects([])} size="sm">
              Clear Selection
            </Button>
            <Button variant="outline" onClick={handleSaveToWatchlist} size="sm">
              Save to Watchlist
            </Button>
            <Button onClick={handleCompare} size="sm" disabled={selectedProjects.length < 2}>
              Compare Projects
            </Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <ProjectsGrid
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              riskFilter={riskFilter}
              verificationFilter={verificationFilter}
              selectedProjects={selectedProjects}
              onToggleSelection={toggleProjectSelection}
            />
          ) : (
            <ProjectsTable
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
              riskFilter={riskFilter}
              verificationFilter={verificationFilter}
              selectedProjects={selectedProjects}
              onToggleSelection={toggleProjectSelection}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

