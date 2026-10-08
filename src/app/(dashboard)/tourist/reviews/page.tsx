"use client"

import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TouristReviewsPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="My Reviews"
        description="Reviews you've given to guides"
      />

      <Card>
        <CardContent className="py-12 text-center">
          <Star className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No reviews yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Complete a tour and leave a review for your guide
          </p>
        </CardContent>
      </Card>
    </div>
  )
}