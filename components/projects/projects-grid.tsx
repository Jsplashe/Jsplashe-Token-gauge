"use client"

import { useState, useEffect } from "react"
import { useClientOnly } from "@/hooks/use-client-only"
import { Skeleton } from "@/components/ui/skeleton"
import { mockProjects } from "@/lib/mock-data"
import { ProjectCard } from "@/components/projects/project-card"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface ProjectsGridProps {
  searchQuery: string
  categoryFilter: string
  riskFilter: string
  verificationFilter: string
  selectedProjects: string[]
  onToggleSelection: (projectId: string) => void
}

export function ProjectsGrid({
  searchQuery,
  categoryFilter,
  riskFilter,
  verificationFilter,
  selectedProjects,
  onToggleSelection,
}: ProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const isClient = useClientOnly()

  useEffect(() => {
    // Filter projects based on search query and filters
    const filtered = mockProjects.filter((project) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.symbol.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

      // Risk filter
      const matchesRisk = riskFilter === "all" || project.riskLevel === riskFilter

      // Verification filter (mock implementation)
      const isVerified = project.riskLevel === "low" // For demo, we'll consider low risk as verified
      const matchesVerification =
        verificationFilter === "all" ||
        (verificationFilter === "verified" && isVerified) ||
        (verificationFilter === "unverified" && !isVerified)

      return matchesSearch && matchesCategory && matchesRisk && matchesVerification
    })

    setFilteredProjects(filtered)
  }, [searchQuery, categoryFilter, riskFilter, verificationFilter])

  if (!isClient) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    )
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No projects found</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <Button variant="outline">Clear filters</Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((project) => (
        <div key={project.id} className="relative">
          <div className="absolute top-2 left-2 z-10">
            <Checkbox
              checked={selectedProjects.includes(project.id)}
              onCheckedChange={() => onToggleSelection(project.id)}
              className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
          </div>
          <ProjectCard
            project={project}
            isVerified={project.riskLevel === "low"} // Mock verification status
          />
        </div>
      ))}
    </div>
  )
}

