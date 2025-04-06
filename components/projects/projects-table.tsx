"use client"

import { useState, useEffect } from "react"
import { useClientOnly } from "@/hooks/use-client-only"
import { Skeleton } from "@/components/ui/skeleton"
import { mockProjects } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowRight, ArrowUpDown, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ProjectsTableProps {
  searchQuery: string
  categoryFilter: string
  riskFilter: string
  verificationFilter: string
  selectedProjects: string[]
  onToggleSelection: (projectId: string) => void
}

export function ProjectsTable({
  searchQuery,
  categoryFilter,
  riskFilter,
  verificationFilter,
  selectedProjects,
  onToggleSelection,
}: ProjectsTableProps) {
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" }>({
    key: "rating",
    direction: "descending",
  })
  const isClient = useClientOnly()

  useEffect(() => {
    // Filter projects based on search query and filters
    let filtered = mockProjects.filter((project) => {
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

    // Sort the filtered projects
    filtered = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredProjects(filtered)
  }, [searchQuery, categoryFilter, riskFilter, verificationFilter, sortConfig])

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  if (!isClient) {
    return (
      <div className="w-full overflow-auto">
        <Skeleton className="h-64 w-full" />
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
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  filteredProjects.length > 0 &&
                  filteredProjects.every((project) => selectedProjects.includes(project.id))
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    onToggleSelection(
                      ...filteredProjects
                        .filter((project) => !selectedProjects.includes(project.id))
                        .map((project) => project.id),
                    )
                  } else {
                    filteredProjects.forEach((project) => {
                      if (selectedProjects.includes(project.id)) {
                        onToggleSelection(project.id)
                      }
                    })
                  }
                }}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("price")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Price
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("priceChange24h")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                24h Change
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("marketCap")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Market Cap
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("riskScore")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Risk Score
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => requestSort("rating")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Rating
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => {
            const isVerified = project.riskLevel === "low" // Mock verification

            return (
              <TableRow key={project.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProjects.includes(project.id)}
                    onCheckedChange={() => onToggleSelection(project.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {project.symbol.substring(0, 1)}
                    </div>
                    <div>
                      <div>{project.name}</div>
                      <div className="text-xs text-muted-foreground">{project.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>${project.price.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={project.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                    {project.priceChange24h >= 0 ? "+" : ""}
                    {project.priceChange24h}%
                  </span>
                </TableCell>
                <TableCell>${(project.marketCap / 1000000000).toFixed(2)}B</TableCell>
                <TableCell>
                  <Badge variant="outline">{project.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.riskLevel === "low"
                        ? "outline"
                        : project.riskLevel === "medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {project.riskScore}/10
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-1 h-4 w-4 text-yellow-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {project.rating.toFixed(1)}
                  </div>
                </TableCell>
                <TableCell>
                  {isVerified ? (
                    <Badge className="bg-green-500 text-white flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline">Unverified</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm">
                    <Link href={`/project/${project.id}`}>
                      View
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

