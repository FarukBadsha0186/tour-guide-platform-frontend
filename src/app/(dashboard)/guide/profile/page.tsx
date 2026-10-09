// export default function GuideProfilePage() {
//   return <div className="p-6">Profile — coming soon</div>
// }

"use client"

import { useState } from "react"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"

import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useGuideProfile } from "@/hooks"
import { RefreshCw } from "lucide-react"
import { ProfileForm } from "@/components/modules/guides/profile/profile-form"
import { ProfileView } from "@/components/modules/guides/profile/profile-view"

export default function GuideProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const { data, isLoading, isError, refetch } = useGuideProfile()

  const profile = data?.data

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
            ? "Update your professional information"
            : "View and manage your profile"
        }
      />

      <Card>
        <CardContent className="pt-6">
          {isEditing ? (
            // <ProfileForm
            //   profile={profile}
            //   onCancel={() => setIsEditing(false)}
            //   onSuccess={() => setIsEditing(false)}
            // />
            <ProfileForm
        profile={profile}
            onCancel={() => setIsEditing(false)}
  //          onSuccess={async () => {
  //      await refetch()
  //   setIsEditing(false)
  // }}
  onSuccess={async () => {
  console.log("✅ 3. handleSuccess called")
  await refetch()
  console.log("✅ 4. Refetch done")
  setIsEditing(false)
  console.log("✅ 5. isEditing set to false")
}}
/>
          ) 
          
          
          : (
            <ProfileView
              profile={profile}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}