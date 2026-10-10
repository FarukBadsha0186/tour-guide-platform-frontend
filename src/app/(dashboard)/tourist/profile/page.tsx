"use client"

import { useState } from "react"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { ProfileView } from "@/components/modules/tourist/profile/profile-view"
import { ProfileForm } from "@/components/modules/tourist/profile/profile-form"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useGetMe } from "@/hooks"
import { RefreshCw } from "lucide-react"

export default function TouristProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const { data, isLoading, isError, refetch } = useGetMe()

  const user = data?.data

  // Build profile object from user + tourist
  const profile = user
    ? {
        id: user.tourist?.id || "",
        name: user.tourist?.name || user.name,
        email: user.tourist?.email || user.email,
        userId: user.id,
        contactNumber: user.tourist?.contactNumber || "",
        address: user.tourist?.address || "",
        nationality: user.tourist?.nationality || "",
        dateOfBirth: user.tourist?.dateOfBirth || null,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          imageUrl: user.imageUrl,
        },
      }
    : null

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load profile
          </p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="My Profile"
        description={
          isEditing
            ? "Update your personal information"
            : "View your profile information"
        }
      />

      <Card>
        <CardContent className="pt-6">
          {isEditing ? (
            <ProfileForm
              profile={profile as any}
              onCancel={() => setIsEditing(false)}
              onSuccess={() => setIsEditing(false)}
            />
          ) : (
            <ProfileView
              profile={profile as any}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}