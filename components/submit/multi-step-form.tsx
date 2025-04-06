"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { BasicInfoStep } from "@/components/submit/steps/basic-info-step"
import { ProjectLinksStep } from "@/components/submit/steps/project-links-step"
import { DocumentationStep } from "@/components/submit/steps/documentation-step"
import { ReviewStep } from "@/components/submit/steps/review-step"

// Define the form data type
export interface ProjectFormData {
  // Basic Info
  name: string
  symbol: string
  category: string
  description: string
  longDescription: string

  // Project Links
  website: string
  twitter: string
  telegram: string
  discord: string
  github: string

  // Documentation
  whitepaper: string
  documentation: string
  roadmap: string

  // Additional fields
  files: File[]
}

// Initial form data
const initialFormData: ProjectFormData = {
  name: "",
  symbol: "",
  category: "",
  description: "",
  longDescription: "",
  website: "",
  twitter: "",
  telegram: "",
  discord: "",
  github: "",
  whitepaper: "",
  documentation: "",
  roadmap: "",
  files: [],
}

export function MultiStepForm() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)

  // Steps for the form
  const steps = [
    { title: "Basic Info", description: "Project name, symbol, and description" },
    { title: "Project Links", description: "Website and social media links" },
    { title: "Documentation", description: "Whitepaper, docs, and verification" },
    { title: "Review & Submit", description: "Review your submission" },
  ]

  // Update form data
  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  // Save draft
  const saveDraft = () => {
    // In a real app, we would save to the database or localStorage
    localStorage.setItem("projectDraft", JSON.stringify(formData))

    toast({
      title: "Draft saved",
      description: "Your project draft has been saved.",
    })
  }

  // Submit form
  const handleSubmit = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear draft
    localStorage.removeItem("projectDraft")

    toast({
      title: "Project submitted",
      description: "Your project has been submitted for review. We'll notify you once it's approved.",
    })

    setIsLoading(false)

    // Reset form
    setFormData(initialFormData)
    setCurrentStep(0)
  }

  // Load draft from localStorage on component mount
  const loadDraft = () => {
    const savedDraft = localStorage.getItem("projectDraft")

    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        setFormData(parsedDraft)

        toast({
          title: "Draft loaded",
          description: "Your saved draft has been loaded.",
        })
      } catch (error) {
        console.error("Error loading draft:", error)
      }
    }
  }

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} />
      case 1:
        return <ProjectLinksStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <DocumentationStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <ReviewStep formData={formData} />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs font-medium ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>{renderStep()}</CardContent>

      <CardFooter className="flex justify-between">
        <div>
          {currentStep > 0 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={saveDraft}>
            Save Draft
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Project"
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

