"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for contributor leaderboard
const contributors = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 42,
    badge: "Top Analyst",
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 38,
    badge: "Risk Expert",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 31,
    badge: "Tech Reviewer",
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 27,
    badge: "Community Leader",
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 24,
    badge: "Rising Star",
  },
]

export function LeaderboardWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributor Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contributors.map((contributor, index) => (
            <div key={contributor.id} className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold">
                {index + 1}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={contributor.avatar} alt={contributor.name} />
                <AvatarFallback>{contributor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{contributor.name}</div>
                <div className="text-sm text-muted-foreground">{contributor.contributions} contributions</div>
              </div>
              <Badge variant="secondary">{contributor.badge}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

