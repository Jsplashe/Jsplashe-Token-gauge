"use client"

import type { ProjectFormData } from "@/components/submit/multi-step-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Globe, Twitter, MessageCircle, Github, FileText } from "lucide-react"

interface ReviewStepProps {
  formData: ProjectFormData
}

export function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Review Your Submission</h3>
        <p className="text-sm text-muted-foreground">
          Please review your project information before submitting. You can go back to previous steps to make changes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Project Name</p>
              <p className="text-sm">{formData.name || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Token Symbol</p>
              <p className="text-sm">{formData.symbol || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Category</p>
              <Badge variant="outline">{formData.category || "Not selected"}</Badge>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium">Short Description</p>
            <p className="text-sm">{formData.description || "Not provided"}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Detailed Description</p>
            <p className="text-sm">{formData.longDescription || "Not provided"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {formData.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {formData.website}
                </a>
              </div>
            )}

            {formData.twitter && (
              <div className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                <a
                  href={formData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {formData.twitter}
                </a>
              </div>
            )}

            {formData.telegram && (
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a
                  href={formData.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {formData.telegram}
                </a>
              </div>
            )}

            {formData.discord && (
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a
                  href={formData.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {formData.discord}
                </a>
              </div>
            )}

            {formData.github && (
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <a
                  href={formData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {formData.github}
                </a>
              </div>
            )}

            {!formData.website && !formData.twitter && !formData.telegram && !formData.discord && !formData.github && (
              <p className="text-sm text-muted-foreground">No links provided</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {formData.whitepaper && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <p className="text-sm font-medium">Whitepaper:</p>
                <a
                  href={formData.whitepaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {formData.whitepaper}
                </a>
              </div>
            )}

            {formData.documentation && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <p className="text-sm font-medium">Documentation:</p>
                <a
                  href={formData.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {formData.documentation}
                </a>
              </div>
            )}

            {formData.roadmap && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <p className="text-sm font-medium">Roadmap:</p>
                <a
                  href={formData.roadmap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {formData.roadmap}
                </a>
              </div>
            )}

            {!formData.whitepaper && !formData.documentation && !formData.roadmap && (
              <p className="text-sm text-muted-foreground">No documentation links provided</p>
            )}
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium">Uploaded Files</p>
            {formData.files && formData.files.length > 0 ? (
              <ul className="list-disc list-inside text-sm">
                {Array.from(formData.files).map((file, index) => (
                  <li key={index}>
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No files uploaded</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

