// // export default function GuideAvailabilityPage() {
// //   return <div className="p-6">Availability — coming soon</div>
// // }


// "use client"

// import { useState } from "react"
// import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Spinner } from "@/components/ui/spinner"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { useGuideAvailability, useGuidePackages } from "@/hooks"
// import type { AvailabilitySlot } from "@/types/guide.type"
// import { Plus, RefreshCw } from "lucide-react"
// import { AvailabilityTable } from "@/components/modules/guides/availability/availability-table"
// import { AvailabilityForm } from "@/components/modules/guides/availability/availability-form"

// export default function GuideAvailabilityPage() {
//   const [selectedPackageId, setSelectedPackageId] = useState<string>("")
//   const [isFormOpen, setIsFormOpen] = useState(false)

//   const { data: packagesData, isLoading: isLoadingPackages } =
//     useGuidePackages({ limit: 100, status: "APPROVED" })

//   const packages = packagesData?.data?.data || []

//   const {
//     data: availabilityData,
//     isLoading: isLoadingAvailability,
//     isError,
//     refetch,
//   } = useGuideAvailability({
//     packageId: selectedPackageId || undefined,
//     limit: 100,
//   })

//   const slots = availabilityData?.data || []

//   const handleAddSlots = () => {
//     if (!selectedPackageId) return
//     setIsFormOpen(true)
//   }

//   const handleEditSlot = (slot: AvailabilitySlot) => {
//     // Edit functionality — later
//     console.log("Edit slot:", slot)
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <AdminPageHeader
//         title="Availability"
//         description="Manage your available dates and time slots for bookings"
//         action={
//           <Button
//             onClick={handleAddSlots}
//             disabled={!selectedPackageId}
//           >
//             <Plus className="mr-2 h-4 w-4" />
//             Add Slots
//           </Button>
//         }
//       />

//       {/* Package Selector */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Select Package</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Select
//             value={selectedPackageId}
//             onValueChange={(value) => setSelectedPackageId(value ?? "")}
//             disabled={isLoadingPackages}
//           >
//             <SelectTrigger className="w-full sm:max-w-md">
//               <SelectValue placeholder="Choose a package to manage availability" />
//             </SelectTrigger>
//             <SelectContent>
//               {packages.length === 0 ? (
//                 <div className="p-2 text-sm text-muted-foreground text-center">
//                   No approved packages yet
//                 </div>
//               ) : (
//                 packages.map((pkg) => (
//                   <SelectItem key={pkg.id} value={pkg.id}>
//                     {pkg.title}
//                   </SelectItem>
//                 ))
//               )}
//             </SelectContent>
//           </Select>

//           {packages.length === 0 && !isLoadingPackages && (
//             <p className="text-sm text-muted-foreground mt-2">
//               You need approved packages first. Create a package and wait for
//               admin approval.
//             </p>
//           )}
//         </CardContent>
//       </Card>

//       {/* Availability List */}
//       {!selectedPackageId ? (
//         <div className="text-center py-12 border rounded-lg bg-muted/20">
//           <p className="text-muted-foreground">
//             Select a package above to view availability
//           </p>
//         </div>
//       ) : isLoadingAvailability ? (
//         <div className="flex justify-center items-center py-20">
//           <Spinner className="h-8 w-8" />
//         </div>
//       ) : isError ? (
//         <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
//           <p className="text-destructive font-medium">
//             Failed to load availability
//           </p>
//           <Button
//             onClick={() => refetch()}
//             variant="outline"
//             className="mt-4"
//           >
//             <RefreshCw className="mr-2 h-4 w-4" />
//             Retry
//           </Button>
//         </div>
//       ) : (
//         <AvailabilityTable slots={slots} onEdit={handleEditSlot} />
//       )}

//       {/* Add Slots Dialog */}
//       <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
//         <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Add Availability Slots</DialogTitle>
//             <DialogDescription>
//               Pick multiple dates and set the time range. Tourists will be able
//               to book these slots.
//             </DialogDescription>
//           </DialogHeader>

//           <AvailabilityForm
//             defaultPackageId={selectedPackageId}
//             onSuccess={() => setIsFormOpen(false)}
//             onCancel={() => setIsFormOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { AdminPageHeader } from "@/components/modules/admin/common/admin-page-header"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useGuideAvailability, useGuidePackages } from "@/hooks"
import type { AvailabilitySlot } from "@/types/guide.type"
import { Plus, RefreshCw } from "lucide-react"
import { AvailabilityTable } from "@/components/modules/guides/availability/availability-table"
import { AvailabilityForm } from "@/components/modules/guides/availability/availability-form"
import { AvailabilityEditDialog } from "@/components/modules/guides/availability/availability-edit-dialog"

export default function GuideAvailabilityPage() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editSlot, setEditSlot] = useState<AvailabilitySlot | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const { data: packagesData, isLoading: isLoadingPackages } =
    useGuidePackages({ limit: 100, status: "APPROVED" })

  const packages = packagesData?.data?.data || []

  const {
    data: availabilityData,
    isLoading: isLoadingAvailability,
    isError,
    refetch,
  } = useGuideAvailability({
    packageId: selectedPackageId || undefined,
    limit: 100,
  })

  const slots = availabilityData?.data || []

  const handleAddSlots = () => {
    if (!selectedPackageId) return
    setIsFormOpen(true)
  }

  const handleEditSlot = (slot: AvailabilitySlot) => {
    setEditSlot(slot)
    setIsEditOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Availability"
        description="Manage your available dates and time slots for bookings"
        action={
          <Button onClick={handleAddSlots} disabled={!selectedPackageId}>
            <Plus className="mr-2 h-4 w-4" />
            Add Slots
          </Button>
        }
      />

      {/* Package Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select Package</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedPackageId}
            onValueChange={(value) => setSelectedPackageId(value ?? "")}
            disabled={isLoadingPackages}
          >
            <SelectTrigger className="w-full sm:max-w-md">
              <SelectValue placeholder="Choose a package to manage availability" />
            </SelectTrigger>
            <SelectContent>
              {packages.length === 0 ? (
                <div className="p-2 text-sm text-muted-foreground text-center">
                  No approved packages yet
                </div>
              ) : (
                packages.map((pkg) => (
                  <SelectItem key={pkg.id} value={pkg.id}>
                    {pkg.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {packages.length === 0 && !isLoadingPackages && (
            <p className="text-sm text-muted-foreground mt-2">
              You need approved packages first. Create a package and wait for
              admin approval.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Availability List */}
      {!selectedPackageId ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            Select a package above to view availability
          </p>
        </div>
      ) : isLoadingAvailability ? (
        <div className="flex justify-center items-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load availability
          </p>
          <Button onClick={() => refetch()} variant="outline" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : (
        <AvailabilityTable slots={slots} onEdit={handleEditSlot} />
      )}

      {/* Add Slots Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Availability Slots</DialogTitle>
            <DialogDescription>
              Pick multiple dates and set the time range.
            </DialogDescription>
          </DialogHeader>

          <AvailabilityForm
            defaultPackageId={selectedPackageId}
            onSuccess={() => setIsFormOpen(false)}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <AvailabilityEditDialog
        slot={editSlot}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </div>
  )
}