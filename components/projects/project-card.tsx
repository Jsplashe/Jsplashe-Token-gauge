"use client"

import Link from "next/link"
import { ArrowRight, ExternalLink, Star, CheckCircle, Flag } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    symbol: string
    description: string
    category: string
    price: number
    priceChange24h: number
    marketCap: number
    volume24h: number
    riskLevel: string
    riskScore: number
    rating: number
  }
  isVerified?: boolean
}

export function ProjectCard({ project, isVerified = false }: ProjectCardProps) {
  // Safe access to project properties with defaults
  const {
    id = "",
    name = "",
    symbol = "",
    description = "",
    category = "",
    price = 0,
    priceChange24h = 0,
    riskLevel = "medium",
    riskScore = 5,
    rating = 0,
  } = project || {}

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={name} />
              <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <CardTitle className="text-lg">{name}</CardTitle>
                {isVerified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified by TokenGauge</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <CardDescription>{symbol}</CardDescription>
            </div>
          </div>
          <Badge variant={riskLevel === "low" ? "outline" : riskLevel === "medium" ? "secondary" : "destructive"}>
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-2xl font-bold">${price.toLocaleString()}</p>
            <p className={`text-xs ${priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}>
              {priceChange24h >= 0 ? "+" : ""}
              {priceChange24h}% (24h)
            </p>
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Risk Score</span>
            <span>{riskScore}/10</span>
          </div>
          <Progress
            value={riskScore * 10}
            className="h-2"
            indicatorClassName={
              riskLevel === "low" ? "bg-green-500" : riskLevel === "medium" ? "bg-yellow-500" : "bg-red-500"
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Badge variant="outline">{category}</Badge>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" title="Flag project">
            <Flag className="h-4 w-4" />
            <span className="sr-only">Flag project</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Visit website</span>
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/project/${id}`}>
              Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

