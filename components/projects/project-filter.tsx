"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Search, X } from "lucide-react"

interface ProjectFilterProps {
  onViewChange: (view: "grid" | "table") => void
  viewMode: "grid" | "table"
}

export function ProjectFilter({ onViewChange, viewMode }: ProjectFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")

  // Initialize filters from URL params
  useEffect(() => {
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category") || "all"
    const risk = searchParams.get("risk") || "all"
    const verification = searchParams.get("verification") || "all"
    const view = searchParams.get("view") || "grid"

    setSearchQuery(query)
    setCategoryFilter(category)
    setRiskFilter(risk)
    setVerificationFilter(verification)
    onViewChange(view as "grid" | "table")
  }, [searchParams, onViewChange])

  // Update URL with filter params
  const updateFilters = () => {
    const params = new URLSearchParams()

    if (searchQuery) params.set("q", searchQuery)
    if (categoryFilter !== "all") params.set("category", categoryFilter)
    if (riskFilter !== "all") params.set("risk", riskFilter)
    if (verificationFilter !== "all") params.set("verification", verificationFilter)
    params.set("view", viewMode)

    router.push(`/explore?${params.toString()}`)
  }

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters()
  }

  // Handle filter changes
  const handleFilterChange = (filter: string, value: string) => {
    switch (filter) {
      case "category":
        setCategoryFilter(value)
        break
      case "risk":
        setRiskFilter(value)
        break
      case "verification":
        setVerificationFilter(value)
        break
    }

    // Update URL after a short delay
    setTimeout(updateFilters, 100)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setRiskFilter("all")
    setVerificationFilter("all")

    router.push("/explore")
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <form onSubmit={handleSearch} className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search projects..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className="flex gap-2">
        <Select value={categoryFilter} onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="defi">DeFi</SelectItem>
            <SelectItem value="nft">NFT</SelectItem>
            <SelectItem value="layer1">Layer 1</SelectItem>
            <SelectItem value="layer2">Layer 2</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
          </SelectContent>
        </Select>
        <Select value={riskFilter} onValueChange={(value) => handleFilterChange("risk", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
          </SelectContent>
        </Select>
        <Select value={verificationFilter} onValueChange={(value) => handleFilterChange("verification", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Verification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="verified">Verified Only</SelectItem>
            <SelectItem value="unverified">Unverified Only</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={clearFilters} title="Clear filters">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("grid")}
          className="rounded-r-none"
          title="Grid view"
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "table" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("table")}
          className="rounded-l-none"
          title="Table view"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

