// "use client"

// import { useState } from "react"
// import { Star, MessageSquare, Quote } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Card, CardContent } from "@/components/ui/card"
// import { useGuideReviews, usePackageReviews } from "@/hooks"
// import { format } from "date-fns"

// interface ReviewsSectionProps {
//   guideId: string
// }
// interface ReviewsSectionProps {
//   packageId?: string
 
// }
// export function ReviewsSection({ guideId }: ReviewsSectionProps) {

    
//   const [page, setPage] = useState(1)

  
//   // ✅ Use packageId if provided, else fallback to guideId
//   const packageReviews = usePackageReviews(packageId || "", {
//     page,
//     limit: 5,
//   })
//   const guideReviews = useGuideReviews(guideId || "", {
//     page,
//     limit: 5,
//   })
  
//   const { data, isLoading } = packageId ? packageReviews : guideReviews
//   if (isLoading) {
//     return (
//       <div className="space-y-3">
//         <Skeleton className="h-32 w-full rounded-xl" />
//         <Skeleton className="h-24 w-full rounded-xl" />
//       </div>
//     )
//   }

//   const reviews = data?.data?.reviews || []
//   const stats = data?.data?.stats
//   const guide = data?.data?.guide
//   const meta = data?.meta

//   // Empty state
//   if (!reviews.length) {
//     return (
//       <Card className="border-border bg-card">
//         <CardContent className="py-12 text-center">
//           <div className="size-14 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
//             <MessageSquare className="size-6 text-muted-foreground" />
//           </div>
//           <p className="text-base font-medium text-foreground mb-1">
//             No reviews yet
//           </p>
//           <p className="text-sm text-muted-foreground">
//             Be the first to book and share your experience!
//           </p>
//         </CardContent>
//       </Card>
//     )
//   }

//   const totalReviews = stats?.totalReviews || 0
//   const averageRating = stats?.averageRating || 0
//   const distribution = stats?.distribution || {}

//   return (
//     <div className="space-y-6">
//       {/* ===== RATING SUMMARY ===== */}
//       <Card className="border-border bg-card">
//         <CardContent className="p-6">
//           <div className="grid gap-6 md:grid-cols-[auto_1fr] items-center">
//             {/* Big rating number */}
//             <div className="text-center md:text-left md:border-r md:border-border md:pr-6">
//               <div className="text-5xl font-bold text-foreground">
//                 {averageRating.toFixed(1)}
//               </div>
//               <div className="flex justify-center md:justify-start gap-0.5 mt-2">
//   {[1, 2, 3, 4, 5].map((starNum) => (
//     <Star
//       key={`avg-star-${starNum}`}
//       className={`size-4 ${
//         starNum <= Math.round(averageRating)
//           ? "fill-secondary text-secondary"
//           : "fill-muted text-muted"
//       }`}
//     />
//   ))}
// </div>
//               <p className="text-xs text-muted-foreground mt-2">
//                 {totalReviews} review{totalReviews !== 1 ? "s" : ""}
//               </p>
//             </div>

//             {/* Distribution bars */}
//             <div className="space-y-1.5">
//               {[5, 4, 3, 2, 1].map((star) => {
//                 const count = distribution[star] || 0
//                 const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0
//                 return (
//                   <div
//                     key={`dist-${star}`}
//                     className="flex items-center gap-3 text-sm"
//                   >
//                     <span className="text-muted-foreground w-8 text-right">
//                       {star}★
//                     </span>
//                     <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-secondary rounded-full transition-all"
//                         style={{ width: `${pct}%` }}
//                       />
//                     </div>
//                     <span className="text-muted-foreground w-8 text-xs">
//                       {count}
//                     </span>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* ===== REVIEWS LIST ===== */}
//       <div className="space-y-3">
//         {reviews.map((review: any) => (
//           <Card
//             key={review.id}
//             className="border-border bg-card hover:shadow-sm transition-shadow"
//           >
//             <CardContent className="p-5">
//               <div className="flex items-start gap-3">
//                 <Avatar className="size-10 shrink-0">
//                   <AvatarImage
//                     src={review.tourist?.imageUrl}
//                     alt={review.tourist?.name}
//                   />
//                   <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
//                     {review.tourist?.name?.charAt(0)?.toUpperCase() || "U"}
//                   </AvatarFallback>
//                 </Avatar>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
//                     <p className="text-sm font-semibold text-foreground">
//                       {review.tourist?.name || "Anonymous"}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {format(new Date(review.createdAt), "MMM dd, yyyy")}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-0.5 mb-2">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star
//                         key={`r-${review.id}-${i}`}
//                         className={`size-3.5 ${
//                           i < review.rating
//                             ? "fill-secondary text-secondary"
//                             : "fill-muted text-muted"
//                         }`}
//                       />
//                     ))}
//                   </div>

//                   {review.comment && (
//                     <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                       {review.comment}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* ===== PAGINATION ===== */}
//       {meta && meta.totalPages > 1 && (
//         <div className="flex items-center justify-center gap-2">
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//           >
//             Previous
//           </Button>
//           <span className="text-sm text-muted-foreground">
//             Page {meta.page} of {meta.totalPages}
//           </span>
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() =>
//               setPage((p) => Math.min(meta.totalPages, p + 1))
//             }
//             disabled={page === meta.totalPages}
//           >
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Star, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { usePackageReviews, useGuideReviews } from "@/hooks"
import { format } from "date-fns"

// ✅ Ei interface e BOTH packageId ar guideId add korun
interface ReviewsSectionProps {
  packageId?: string
  guideId?: string
}

export function ReviewsSection({ packageId, guideId }: ReviewsSectionProps) {
  const [page, setPage] = useState(1)

  // ✅ Prioritize packageId, fallback to guideId
  const shouldUsePackage = !!packageId
  const activeId = packageId || guideId || ""

  const packageResult = usePackageReviews(packageId || "", {
    page,
    limit: 5,
  })

  const guideResult = useGuideReviews(
    !shouldUsePackage ? guideId || "" : "",
    {
      page,
      limit: 5,
    }
  )

  const { data, isLoading } = shouldUsePackage ? packageResult : guideResult

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    )
  }

  const reviews = data?.data?.reviews || []
  const stats = data?.data?.stats
  const meta = data?.meta

  // Empty state
  if (!reviews.length) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="py-12 text-center">
          <div className="size-14 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="size-6 text-muted-foreground" />
          </div>
          <p className="text-base font-medium text-foreground mb-1">
            No reviews yet
          </p>
          <p className="text-sm text-muted-foreground">
            Be the first to book and share your experience!
          </p>
        </CardContent>
      </Card>
    )
  }

  const totalReviews = stats?.totalReviews || 0
  const averageRating = stats?.averageRating || 0
  const distribution = stats?.distribution || {}

  return (
    <div className="space-y-6">
      {/* ===== RATING SUMMARY ===== */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] items-center">
            {/* Big rating number */}
            <div className="text-center md:text-left md:border-r md:border-border md:pr-6">
              <div className="text-5xl font-bold text-foreground">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center md:justify-start gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((starNum) => (
                  <Star
                    key={`avg-star-${starNum}`}
                    className={`size-4 ${
                      starNum <= Math.round(averageRating)
                        ? "fill-secondary text-secondary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {totalReviews} review{totalReviews !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Distribution bars */}
            <div className="space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[star] || 0
                const pct =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0
                return (
                  <div
                    key={`dist-${star}`}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="text-muted-foreground w-8 text-right">
                      {star}★
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-8 text-xs">
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== REVIEWS LIST ===== */}
      <div className="space-y-3">
        {reviews.map((review: any) => (
          <Card
            key={review.id}
            className="border-border bg-card hover:shadow-sm transition-shadow"
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={review.tourist?.imageUrl}
                    alt={review.tourist?.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {review.tourist?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">
                      {review.tourist?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(review.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>

                  <div className="flex items-center gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <Star
                        key={`r-${review.id}-${starNum}`}
                        className={`size-3.5 ${
                          starNum <= review.rating
                            ? "fill-secondary text-secondary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>

                  {review.comment && (
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {review.comment}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===== PAGINATION ===== */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}