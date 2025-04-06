"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ArrowRight, Edit, Star, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { mockProjects } from "@/lib/mock-data"

// Mock data for user reviews
const mockUserReviews = [
  {
    id: "review1",
    projectId: "bitcoin",
    rating: 4.5,
    content: "A solid project with strong fundamentals. The team has consistently delivered on their roadmap.",
    date: "2025-03-15",
  },
  {
    id: "review2",
    projectId: "ethereum",
    rating: 5,
    content: "The transition to PoS has been a game-changer. The ecosystem continues to grow and innovate.",
    date: "2025-03-10",
  },
  {
    id: "review3",
    projectId: "solana",
    rating: 3.5,
    content: "Fast and cheap transactions, but reliability issues are concerning. The team is working to address them.",
    date: "2025-03-05",
  },
]

export function UserReviews() {
  const { toast } = useToast()
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    // In a real app, we would fetch the user's reviews from the database
    // For demo purposes, we'll enrich the mock reviews with project data
    const enrichedReviews = mockUserReviews.map((review) => {
      const project = mockProjects.find((p) => p.id === review.projectId)
      return {
        ...review,
        project,
      }
    })

    setReviews(enrichedReviews)
  }, [])

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId))

    toast({
      title: "Review deleted",
      description: "Your review has been deleted successfully.",
    })
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">You haven't written any reviews yet.</p>
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
        <CardTitle>My Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={review.project?.name || "Project"} />
                    <AvatarFallback>{(review.project?.name || "P").substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.project?.name || "Unknown Project"}</div>
                    <div className="text-xs text-muted-foreground">Reviewed on {review.date}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(review.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : i < review.rating
                            ? "fill-yellow-400 text-yellow-400 opacity-50"
                            : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm mb-3">{review.content}</p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => deleteReview(review.id)}>
                  <Trash2 className="mr-2 h-3 w-3" />
                  Delete
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-3 w-3" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/project/${review.projectId}`}>
                    View Project
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

