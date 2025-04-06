"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ProjectFormData } from "@/components/submit/multi-step-form"
import { FileUpload } from "@/components/submit/file-upload"

interface DocumentationStepProps {
  formData: ProjectFormData
  updateFormData: (data: Partial<ProjectFormData>) => void
}

export function DocumentationStep({ formData, updateFormData }: DocumentationStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="whitepaper">Whitepaper URL</Label>
        <Input
          id="whitepaper"
          type="url"
          placeholder="https://example.com/whitepaper.pdf"
          value={formData.whitepaper}
          onChange={(e) => updateFormData({ whitepaper: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="documentation">Documentation URL</Label>
        <Input
          id="documentation"
          type="url"
          placeholder="https://docs.example.com"
          value={formData.documentation}
          onChange={(e) => updateFormData({ documentation: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="roadmap">Roadmap URL</Label>
        <Input
          id="roadmap"
          type="url"
          placeholder="https://example.com/roadmap"
          value={formData.roadmap}
          onChange={(e) => updateFormData({ roadmap: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Upload Verification Documents</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Upload any documents that can help verify your project, such as audit reports, legal documents, or team
          credentials.
        </p>
        <FileUpload onFilesChange={(files) => updateFormData({ files })} existingFiles={formData.files} />
      </div>
    </div>
  )
}

