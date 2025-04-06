"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useClientOnly } from "@/hooks/use-client-only"
import { Skeleton } from "@/components/ui/skeleton"
import { ProjectChart } from "@/components/projects/project-chart"
import { ProjectReviews } from "@/components/projects/project-reviews"
import { ProjectLinks } from "@/components/projects/project-links"
import { ProjectSimilar } from "@/components/projects/project-similar"
import { ArrowLeft, ExternalLink, Heart, Share2, Flag, CheckCircle } from "lucide-react"
import Link from "next/link"
import { mockProjects } from "@/lib/mock-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const isClient = useClientOnly()

  useEffect(() => {
    // In a real app, we would fetch the project data from an API
    // For now, we'll use mock data
    const fetchProject = async () => {
      try {
        if (params && params.id) {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500))

          const foundProject = mockProjects.find((p) => p.id === params.id)
          setProject(foundProject || null)
        }
      } catch (error) {
        console.error("Error finding project:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params])

  if (!isClient || loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-10 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[400px] w-full" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Project Not Found</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/explore">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explore
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Safe access to project properties with defaults
  const {
    name = "",
    symbol = "",
    description = "",
    longDescription = "",
    category = "",
    riskLevel = "medium",
    riskScore = 5,
    price = 0,
    priceChange24h = 0,
    marketCap = 0,
    marketCapChange = 0,
    volume24h = 0,
    volumeChange = 0,
    circulatingSupply = 0,
    maxSupply = 1,
    allTimeHigh = 0,
    technicalRisk = 5,
    tokenomicsScore = 5,
    teamScore = 5,
    communityScore = 5,
    aiSummary = "",
    rating = 0,
  } = project

  // For demo purposes, we'll consider low risk projects as verified
  const isVerified = riskLevel === "low"

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/explore">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Link>
        </Button>
      </div>

      {/* Project Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={name} />
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
              {isVerified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="bg-green-500 text-white flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This project has been verified by TokenGauge</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Badge variant={riskLevel === "low" ? "outline" : riskLevel === "medium" ? "secondary" : "destructive"}>
                {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="outline">{category}</Badge>
              <span className="text-sm">•</span>
              <span className="text-sm">${marketCap.toLocaleString()}</span>
              <span className="text-sm">•</span>
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
                <span className="text-sm">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            Add to Watchlist
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="mr-2 h-4 w-4" />
            Flag Project
          </Button>
          <Button size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Website
          </Button>
        </div>
      </div>

      {/* Project Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Project Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Price Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription>Last 30 days performance and trading volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectChart projectId={project.id} />
            </CardContent>
          </Card>

          {/* Project Tabs */}
          <Card>
            <CardHeader className="pb-0">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="ai-analysis">AI Breakdown</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                  <TabsTrigger value="docs">Documentation</TabsTrigger>
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="overview" className="space-y-4 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-2">Project Description</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    {longDescription ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl."}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Key Metrics</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Market Cap</h4>
                      <p className="text-2xl font-bold">${marketCap.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className={marketCapChange >= 0 ? "text-green-500" : "text-red-500"}>
                          {marketCapChange >= 0 ? "+" : ""}
                          {marketCapChange}%
                        </span>{" "}
                        in the last 24h
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">24h Volume</h4>
                      <p className="text-2xl font-bold">${volume24h.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className={volumeChange >= 0 ? "text-green-500" : "text-red-500"}>
                          {volumeChange >= 0 ? "+" : ""}
                          {volumeChange}%
                        </span>{" "}
                        in the last 24h
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Circulating Supply</h4>
                      <p className="text-2xl font-bold">
                        {circulatingSupply.toLocaleString()} {symbol}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {((circulatingSupply / maxSupply) * 100).toFixed(2)}% of max supply
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">All-Time High</h4>
                      <p className="text-2xl font-bold">${allTimeHigh.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-red-500">
                          {(((price - allTimeHigh) / allTimeHigh) * 100).toFixed(2)}%
                        </span>{" "}
                        from ATH
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-analysis" className="space-y-4 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-4">AI Risk Assessment</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Technical Risk</span>
                        <span className="text-sm">{technicalRisk}/10</span>
                      </div>
                      <Progress value={technicalRisk * 10} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Assessment of code quality, security audits, and technical implementation.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Tokenomics</span>
                        <span className="text-sm">{tokenomicsScore}/10</span>
                      </div>
                      <Progress value={tokenomicsScore * 10} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Evaluation of token distribution, utility, and economic model.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Team Credibility</span>
                        <span className="text-sm">{teamScore}/10</span>
                      </div>
                      <Progress value={teamScore * 10} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Assessment of team experience, track record, and transparency.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Community Strength</span>
                        <span className="text-sm">{communityScore}/10</span>
                      </div>
                      <Progress value={communityScore * 10} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Evaluation of community size, engagement, and growth.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="text-lg font-medium mb-2">AI Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {aiSummary ||
                      "This project demonstrates strong technical fundamentals with a well-audited codebase and experienced development team. The tokenomics model is sustainable with fair distribution, though there are some concerns about the vesting schedule for team tokens. Community engagement is above average with active social channels and regular updates from the team. Overall, this project presents a balanced risk profile with good potential for long-term growth."}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <ProjectReviews projectId={project.id} />
              </TabsContent>

              <TabsContent value="docs" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Access the project's documentation, whitepapers, and technical resources.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Whitepaper</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">
                            The official whitepaper detailing the project's vision, technology, and tokenomics.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Whitepaper
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Technical Documentation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">
                            Technical guides, API references, and developer resources.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Documentation
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Audit Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">
                            Security audits and code reviews by third-party firms.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Audit Reports
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Roadmap</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-2">
                            Project development timeline and future milestones.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Roadmap
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="charts" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Advanced Charts</h3>
                    <Tabs defaultValue="price">
                      <TabsList>
                        <TabsTrigger value="price">Price</TabsTrigger>
                        <TabsTrigger value="volume">Volume</TabsTrigger>
                        <TabsTrigger value="marketcap">Market Cap</TabsTrigger>
                        <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
                      </TabsList>
                      <TabsContent value="price" className="h-[400px] mt-4">
                        <ProjectChart projectId={project.id} />
                      </TabsContent>
                      <TabsContent value="volume" className="h-[400px] mt-4">
                        <ProjectChart projectId={project.id} />
                      </TabsContent>
                      <TabsContent value="marketcap" className="h-[400px] mt-4">
                        <ProjectChart projectId={project.id} />
                      </TabsContent>
                      <TabsContent value="liquidity" className="h-[400px] mt-4">
                        <ProjectChart projectId={project.id} />
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">On-Chain Metrics</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Advanced on-chain metrics and analytics for this project.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Active Addresses</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[200px]">
                          <div className="flex items-center justify-center h-full">
                            <p className="text-sm text-muted-foreground">Chart placeholder</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Transaction Volume</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[200px]">
                          <div className="flex items-center justify-center h-full">
                            <p className="text-sm text-muted-foreground">Chart placeholder</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Current Price */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Current Price</CardDescription>
              <CardTitle className="text-2xl">${price.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className={priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                  {priceChange24h >= 0 ? "+" : ""}
                  {priceChange24h}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">in the last 24h</span>
              </div>
            </CardContent>
          </Card>

          {/* Risk Score */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Risk Score</span>
                <Badge variant={riskLevel === "low" ? "outline" : riskLevel === "medium" ? "secondary" : "destructive"}>
                  {riskScore}/10
                </Badge>
              </div>
              <Progress
                value={riskScore * 10}
                className="h-2"
                indicatorClassName={
                  riskLevel === "low" ? "bg-green-500" : riskLevel === "medium" ? "bg-yellow-500" : "bg-red-500"
                }
              />
              <p className="text-xs text-muted-foreground">
                {riskLevel === "low"
                  ? "This project has a low risk profile based on our analysis."
                  : riskLevel === "medium"
                    ? "This project has a moderate risk profile. Exercise caution."
                    : "This project has a high risk profile. Invest with extreme caution."}
              </p>
            </CardContent>
          </Card>

          {/* Project Links */}
          <ProjectLinks />

          {/* Similar Projects */}
          <ProjectSimilar category={category} currentProjectId={project.id} />
        </div>
      </div>
    </div>
  )
}

