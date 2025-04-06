"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ProjectFormData } from "@/components/submit/multi-step-form"
import { Globe, Twitter, MessageCircle, Github } from "lucide-react"

interface ProjectLinksStepProps {
  formData: ProjectFormData
  updateFormData: (data: Partial<ProjectFormData>) => void
}

export function ProjectLinksStep({ formData, updateFormData }: ProjectLinksStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="website" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Website URL
        </Label>
        <Input
          id="website"
          type="url"
          placeholder="https://example.com"
          value={formData.website}
          onChange={(e) => updateFormData({ website: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="twitter" className="flex items-center gap-2">
          <Twitter className="h-4 w-4" />
          Twitter URL
        </Label>
        <Input
          id="twitter"
          type="url"
          placeholder="https://twitter.com/username"
          value={formData.twitter}
          onChange={(e) => updateFormData({ twitter: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telegram" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Telegram URL
        </Label>
        <Input
          id="telegram"
          type="url"
          placeholder="https://t.me/groupname"
          value={formData.telegram}
          onChange={(e) => updateFormData({ telegram: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="discord" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Discord URL
        </Label>
        <Input
          id="discord"
          type="url"
          placeholder="https://discord.gg/invite"
          value={formData.discord}
          onChange={(e) => updateFormData({ discord: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github" className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          GitHub Repository
        </Label>
        <Input
          id="github"
          type="url"
          placeholder="https://github.com/username/repo"
          value={formData.github}
          onChange={(e) => updateFormData({ github: e.target.value })}
        />
      </div>
    </div>
  )
}

