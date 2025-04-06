"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { useClientOnly } from "@/hooks/use-client-only"
import { useSupabase } from "@/lib/supabase/provider"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { SavedProjects } from "@/components/profile/saved-projects"
import { UserReviews } from "@/components/profile/user-reviews"
import { SubmittedProjects } from "@/components/profile/submitted-projects"
import { Loader2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { session, signOut } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    bio: "",
    website: "",
    avatar_url: "",
  })
  const isClient = useClientOnly()

  useEffect(() => {
    if (session?.user) {
      // In a real app, we would fetch the user profile from the database
      setProfile({
        full_name: session.user.email?.split("@")[0] || "",
        username: session.user.email?.split("@")[0]?.toLowerCase() || "",
        bio: "Crypto enthusiast and blockchain developer. Interested in DeFi, NFTs, and emerging technologies.",
        website: "https://example.com",
        avatar_url: "",
      })
    }
  }, [session])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user) return

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was a problem updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await signOut()
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was a problem signing out.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader title="Your Profile" description="Manage your account settings and view your activity." />

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="saved">Saved Projects</TabsTrigger>
          <TabsTrigger value="submissions">My Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar_url || `/placeholder.svg?height=80&width=80`} />
                    <AvatarFallback>
                      {profile.full_name
                        ? profile.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : session?.user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">
                      {profile.full_name || session?.user?.email?.split("@")[0] || "User"}
                    </h3>
                    <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us a bit about yourself"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="destructive" onClick={handleLogout} disabled={isLoading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account security and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Email Address</h3>
                <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                <Button variant="outline" size="sm">
                  Change Email
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">••••••••••••</p>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
                <Button variant="outline" size="sm">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          <SavedProjects />
        </TabsContent>
        <TabsContent value="submissions" className="mt-6">
          <div className="grid gap-6">
            <SubmittedProjects />
            <UserReviews />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

