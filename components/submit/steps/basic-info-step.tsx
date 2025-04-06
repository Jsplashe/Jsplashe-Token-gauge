"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ProjectFormData } from "@/components/submit/multi-step-form"

interface BasicInfoStepProps {
  formData: ProjectFormData
  updateFormData: (data: Partial<ProjectFormData>) => void
}

export function BasicInfoStep({ formData, updateFormData }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            placeholder="e.g. Bitcoin"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="symbol">Token Symbol</Label>
          <Input
            id="symbol"
            placeholder="e.g. BTC"
            value={formData.symbol}
            onChange={(e) => updateFormData({ symbol: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })} required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="layer1">Layer 1</SelectItem>
              <SelectItem value="layer2">Layer 2</SelectItem>
              <SelectItem value="defi">DeFi</SelectItem>
              <SelectItem value="nft">NFT</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="dao">DAO</SelectItem>
              <SelectItem value="privacy">Privacy</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the project (max 200 characters)"
          maxLength={200}
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          required
        />
        <p className="text-xs text-muted-foreground text-right">{formData.description.length}/200 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="long-description">Detailed Description</Label>
        <Textarea
          id="long-description"
          placeholder="Detailed description of the project, including its purpose, technology, and unique features"
          className="min-h-[150px]"
          value={formData.longDescription}
          onChange={(e) => updateFormData({ longDescription: e.target.value })}
          required
        />
      </div>
    </div>
  )
}

