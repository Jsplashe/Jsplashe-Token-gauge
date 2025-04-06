"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit, Eye } from "lucide-react"

// Mock data for submitted projects
const mockSubmissions = [
  {
    id: "submission1",
    name: "DeFi Protocol X",
    category: "defi",
    submittedDate: "2025-03-15",
    status: "approved",
    verificationStatus: "verified",
  },
  {
    id: "submission2",
    name: "NFT Marketplace Y",
    category: "nft",
    submittedDate: "2025-03-10",
    status: "pending",
    verificationStatus: "pending",
  },
  {
    id: "submission3",
    name: "GameFi Platform Z",
    category: "gaming",
    submittedDate: "2025-03-05",
    status: "rejected",
    verificationStatus: "rejected",
    rejectionReason: "Insufficient documentation provided",
  },
  {
    id: "submission4",
    name: "Layer 2 Solution",
    category: "layer2",
    submittedDate: "2025-02-28",
    status: "draft",
    verificationStatus: "not_submitted",
  },
]

export function SubmittedProjects() {
  const [submissions, setSubmissions] = useState<any[]>([])

  useEffect(() => {
    // In a real app, we would fetch the user's submissions from the database
    setSubmissions(mockSubmissions)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Approved</Badge>
      case "pending":
        return <Badge variant="secondary">Pending Review</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500 text-white">Verified</Badge>
      case "pending":
        return <Badge variant="secondary">Pending Verification</Badge>
      case "rejected":
        return <Badge variant="destructive">Verification Failed</Badge>
      case "not_submitted":
        return <Badge variant="outline">Not Submitted</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (submissions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">You haven't submitted any projects yet.</p>
            <Button asChild>
              <Link href="/submit">Submit a Project</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 last:border-0 last:pb-0 gap-4"
            >
              <div>
                <div className="font-medium">{submission.name}</div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {submission.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Submitted on {submission.submittedDate}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-col gap-1 items-end">
                  <div>{getStatusBadge(submission.status)}</div>
                  <div>{getVerificationBadge(submission.verificationStatus)}</div>
                </div>
                <div className="flex items-center gap-2">
                  {submission.status === "draft" ? (
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/submit">
                        <Edit className="mr-2 h-3 w-3" />
                        Edit Draft
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/project/${submission.id}`}>
                        <Eye className="mr-2 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

