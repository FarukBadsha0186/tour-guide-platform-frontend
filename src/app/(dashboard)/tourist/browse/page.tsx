

import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"
import { PackagesContent } from "@/components/modules/tourist/packages/packages-content"

export default function TouristBrowsePage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Browse Tours"
        description="Explore tours and book your next adventure"
      />

      <PackagesContent detailBasePath="/tourist/browse" />
    </div>
  )
}