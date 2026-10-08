// "use client"

// import Link from "next/link"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Clock, MapPin, Star, Users } from "lucide-react"
// import type { TouristPackage } from "@/types/tourist.type"

// interface PackageCardProps {
//   pkg: TouristPackage
// }

// export function PackageCard({ pkg }: PackageCardProps) {
//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
//       {/* Guide Header */}
//       <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-4 border-b">
//         <div className="flex items-center gap-3">
//           <Avatar className="h-10 w-10 ring-2 ring-white">
//             <AvatarImage
//               src={pkg.guide.user.imageUrl}
//               alt={pkg.guide.user.name}
//             />
//             <AvatarFallback>
//               {pkg.guide.user.name?.charAt(0)?.toUpperCase() || "G"}
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium truncate">
//               {pkg.guide.user.name}
//             </p>
//             <div className="flex items-center gap-2 text-xs text-muted-foreground">
//               <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//               <span>
//                 {pkg.guide.rating.toFixed(1)} ({pkg.guide.totalReviews})
//               </span>
//               <span>•</span>
//               <span>{pkg.guide.yearsExperience}y exp</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <CardContent className="pt-4 flex-1 flex flex-col">
//         <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
//           {pkg.title}
//         </h3>
//         <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
//           {pkg.description}
//         </p>

//         <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
//           <div className="flex items-center gap-1">
//             <Clock className="h-3.5 w-3.5" />
//             <span>{pkg.durationHours}h</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Users className="h-3.5 w-3.5" />
//             <span>
//               {pkg.minGroupSize}-{pkg.maxGroupSize}
//             </span>
//           </div>
//           {pkg.meetingPoint && (
//             <div className="flex items-center gap-1 min-w-0">
//               <MapPin className="h-3.5 w-3.5 shrink-0" />
//               <span className="truncate">{pkg.meetingPoint}</span>
//             </div>
//           )}
//         </div>

//         {/* Languages */}
//         {pkg.guide.languages.length > 0 && (
//           <div className="flex flex-wrap gap-1 mb-3">
//             {pkg.guide.languages.slice(0, 2).map((lang) => (
//               <Badge
//                 key={lang}
//                 variant="secondary"
//                 className="text-xs font-normal"
//               >
//                 {lang}
//               </Badge>
//             ))}
//           </div>
//         )}
//       </CardContent>

//       {/* Footer */}
//       <CardFooter className="border-t pt-4 flex items-center justify-between">
//         <div>
//           <p className="text-xs text-muted-foreground">From</p>
//           <p className="text-lg font-bold text-emerald-600">
//             ৳ {pkg.pricePerPerson}
//           </p>
//         </div>
//         <Link href={`/packages/${pkg.id}`}>
//           <Button size="sm">View Details</Button>
//         </Link>
//       </CardFooter>
//     </Card>
//   )
// }

"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, Users } from "lucide-react"
import type { TouristPackage } from "@/types/tourist.type"

interface PackageCardProps {
  pkg: TouristPackage
  detailBasePath?: string
}

export function PackageCard({
  pkg,
  detailBasePath = "/packages",
}: PackageCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
      {/* Guide Header */}
      <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-white">
            <AvatarImage
              src={pkg.guide.user.imageUrl}
              alt={pkg.guide.user.name}
            />
            <AvatarFallback>
              {pkg.guide.user.name?.charAt(0)?.toUpperCase() || "G"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {pkg.guide.user.name}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>
                {pkg.guide.rating.toFixed(1)} ({pkg.guide.totalReviews})
              </span>
              <span>•</span>
              <span>{pkg.guide.yearsExperience}y exp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="pt-4 flex-1 flex flex-col">
        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
          {pkg.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {pkg.description}
        </p>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{pkg.durationHours}h</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>
              {pkg.minGroupSize}-{pkg.maxGroupSize}
            </span>
          </div>
          {pkg.meetingPoint && (
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{pkg.meetingPoint}</span>
            </div>
          )}
        </div>

        {/* Languages */}
        {pkg.guide.languages.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {pkg.guide.languages.slice(0, 2).map((lang) => (
              <Badge
                key={lang}
                variant="secondary"
                className="text-xs font-normal"
              >
                {lang}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="border-t pt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">From</p>
          <p className="text-lg font-bold text-emerald-600">
            ৳ {pkg.pricePerPerson}
          </p>
        </div>
        <Link href={`${detailBasePath}/${pkg.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}