"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  ExternalLink,
  Flag,
  Globe,
  Heart,
  Info,
  LogOut,
  MessageSquare,
  Settings,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
  Twitter,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { mockProjects, mockReviews } from "@/lib/mock-data"
import { useClientOnly } from "@/hooks/use-client-only"
import { ClientOnly } from "@/components/client-only"

// Lazy load the ProjectChart component to avoid SSR issues
import dynamic from "next/dynamic"
const ProjectChart = dynamic(() => import("@/components/project-chart").then((mod) => mod.ProjectChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />,
})

export default function ProjectPage() {
  const params = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const isClient = useClientOnly()

  useEffect(() => {
    try {
      // In a real app, we would fetch the project data from an API
      // For now, we'll use mock data
      if (params && params.id) {
        const foundProject = mockProjects.find((p) => p.id === params.id)
        setProject(foundProject || null)
      }
    } catch (error) {
      console.error("Error finding project:", error)
    } finally {
      setLoading(false)
    }
  }, [params])

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TokenGauge</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </header>
        <main className="flex-1 py-6">
          <div className="container px-4">
            <div className="mb-6">
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
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
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <BarChart3 className="mx-auto h-10 w-10 text-primary animate-pulse" />
          <h2 className="mt-4 text-lg font-medium">Loading project data...</h2>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Info className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-medium">Project not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="mt-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Safe access to project properties
  const {
    name = "",
    riskLevel = "medium",
    category = "",
    marketCap = 0,
    rating = 0,
    price = 0,
    priceChange24h = 0,
    volume24h = 0,
    volumeChange = 0,
    circulatingSupply = 0,
    maxSupply = 1,
    allTimeHigh = 0,
    marketCapChange = 0,
    description = "",
    longDescription = "",
    technicalRisk = 5,
    tokenomicsScore = 5,
    teamScore = 5,
    communityScore = 5,
    aiSummary = "",
    symbol = "",
    id = "",
    riskScore = 5,
    team = [],
  } = project || {}

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TokenGauge</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="text-sm text-center py-4 text-muted-foreground">No new notifications</div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6">
        <div className="container px-4">
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={name} />
                <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
                  <Badge
                    variant={riskLevel === "low" ? "outline" : riskLevel === "medium" ? "secondary" : "destructive"}
                  >
                    {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Badge variant="outline">{category}</Badge>
                  <span className="text-sm">•</span>
                  <span className="text-sm">${marketCap.toLocaleString()}</span>
                  <span className="text-sm">•</span>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
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
                  <ClientOnly fallback={<Skeleton className="h-[300px] w-full" />}>
                    <ProjectChart projectId={id} />
                  </ClientOnly>
                </CardContent>
              </Card>

              {/* Project Tabs */}
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{description}</p>
                      <p className="text-sm text-muted-foreground mt-4">
                        {longDescription ||
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl."}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="analysis" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Risk Assessment</CardTitle>
                      <CardDescription>Powered by TokenGauge's AI analysis engine</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium mb-2">AI Summary</h4>
                        <p className="text-sm text-muted-foreground">
                          {aiSummary ||
                            "This project demonstrates strong technical fundamentals with a well-audited codebase and experienced development team. The tokenomics model is sustainable with fair distribution, though there are some concerns about the vesting schedule for team tokens. Community engagement is above average with active social channels and regular updates from the team. Overall, this project presents a balanced risk profile with good potential for long-term growth."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Community Reviews</CardTitle>
                        <CardDescription>Reviews and ratings from the TokenGauge community</CardDescription>
                      </div>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Write Review
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockReviews
                        .filter((review) => review.projectId === id)
                        .map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{review.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{review.author}</p>
                                  <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm">{review.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                <span className="text-xs">{review.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsDown className="mr-1 h-3 w-3" />
                                <span className="text-xs">{review.dislikes}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Flag className="mr-1 h-3 w-3" />
                                <span className="text-xs">Report</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="team" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team & Advisors</CardTitle>
                      <CardDescription>Key people behind the project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        {team && team.length > 0 ? (
                          team.map((member, index) => (
                            <div key={index} className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{member.name?.substring(0, 2).toUpperCase() || "TM"}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{member.name || "Team Member"}</p>
                                <p className="text-xs text-muted-foreground">{member.role || "Role"}</p>
                                <p className="text-xs mt-1">{member.bio || "No bio available"}</p>
                                {member.linkedin && (
                                  <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline flex items-center mt-1"
                                  >
                                    LinkedIn
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                  </a>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-muted-foreground">CEO & Founder</p>
                                <p className="text-xs mt-1">
                                  Former CTO at Blockchain Inc. with 10+ years of experience in distributed systems.
                                </p>
                                <a href="#" className="text-xs text-primary hover:underline flex items-center mt-1">
                                  LinkedIn
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>AS</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">Alice Smith</p>
                                <p className="text-xs text-muted-foreground">CTO</p>
                                <p className="text-xs mt-1">
                                  PhD in Cryptography from MIT. Previously led security at a major exchange.
                                </p>
                                <a href="#" className="text-xs text-primary hover:underline flex items-center mt-1">
                                  LinkedIn
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>RJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">Robert Johnson</p>
                                <p className="text-xs text-muted-foreground">Head of Business Development</p>
                                <p className="text-xs mt-1">
                                  15+ years in fintech with experience at PayPal and Stripe.
                                </p>
                                <a href="#" className="text-xs text-primary hover:underline flex items-center mt-1">
                                  LinkedIn
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>EW</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">Emma Wilson</p>
                                <p className="text-xs text-muted-foreground">Lead Developer</p>
                                <p className="text-xs mt-1">
                                  Core contributor to several open-source blockchain projects.
                                </p>
                                <a href="#" className="text-xs text-primary hover:underline flex items-center mt-1">
                                  LinkedIn
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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
                    <Badge
                      variant={riskLevel === "low" ? "outline" : riskLevel === "medium" ? "secondary" : "destructive"}
                    >
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
              <Card>
                <CardHeader>
                  <CardTitle>Project Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Website</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Twitter className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Twitter</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
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
                        className="mr-2 h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                      </svg>
                      <span className="text-sm">Telegram</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
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
                        className="mr-2 h-4 w-4 text-muted-foreground"
                      >
                        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                      </svg>
                      <span className="text-sm">GitHub</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ClientOnly>
                    {mockProjects
                      .filter((p) => p.category === category && p.id !== id)
                      .slice(0, 3)
                      .map((similarProject) => (
                        <div key={similarProject.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{similarProject.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{similarProject.name}</p>
                              <div className="flex items-center">
                                <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{similarProject.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/project/${similarProject.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                  </ClientOnly>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

