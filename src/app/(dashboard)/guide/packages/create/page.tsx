"use client"

import { useRouter } from "next/navigation"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"

import { Card, CardContent } from "@/components/ui/card"
import { PackageForm } from "@/components/modules/guides/packages/package-form"

export default function CreatePackagePage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Create Package"
        description="Add a new tour package. Admin approval required."
      />

      <Card>
        <CardContent className="pt-6">
          <PackageForm
            onSuccess={() => router.push("/guide/packages")}
            onCancel={() => router.push("/guide/packages")}
          />
        </CardContent>
      </Card>
    </div>
  )
}