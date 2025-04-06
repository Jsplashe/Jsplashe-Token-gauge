"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { useClientOnly } from "@/hooks/use-client-only"
import { MultiStepForm } from "@/components/submit/multi-step-form"

export default function SubmitPage() {
  const isClient = useClientOnly()

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="h-10 w-[250px] bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-[350px] bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="h-[600px] bg-gray-200 animate-pulse rounded" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Submit a Project"
        description="Add a new cryptocurrency project to TokenGauge for analysis and community review."
      />

      <MultiStepForm />
    </div>
  )
}

