"use client"

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useGuidePackage } from "@/hooks"
import { RefreshCw } from "lucide-react"
import { PackageForm } from "@/components/modules/guides/packages/package-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditPackagePage({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)

  const { data, isLoading, isError, refetch } = useGuidePackage(id)

  const pkg = data?.data

  // Redirect if package is not PENDING (only pending packages editable)
  useEffect(() => {
    if (pkg && pkg.status !== "PENDING") {
      router.replace("/guide/packages")
    }
  }, [pkg, router])

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (isError || !pkg) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load package
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (pkg.status !== "PENDING") {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center">
          <p className="text-yellow-800 font-medium">
            Only pending packages can be edited.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Edit Package"
        description="Update your pending package. Admin approval still required."
      />

      <Card>
        <CardContent className="pt-6">
          <PackageForm
            pkg={pkg}
            onSuccess={() => router.push("/guide/packages")}
            onCancel={() => router.push("/guide/packages")}
          />
        </CardContent>
      </Card>
    </div>
  )
}