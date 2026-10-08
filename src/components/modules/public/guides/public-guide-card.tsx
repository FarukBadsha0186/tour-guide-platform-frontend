"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Award, Languages } from "lucide-react"
import type { PublicGuide } from "@/types/public.type"

interface PublicGuideCardProps {
  guide: PublicGuide
}

export function PublicGuideCard({ guide }: PublicGuideCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={guide.user.imageUrl}
              alt={guide.user.name}
            />
            <AvatarFallback className="text-lg">
              {guide.user.name?.charAt(0)?.toUpperCase() || "G"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">
              {guide.user.name}
            </h3>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>
                {guide.rating.toFixed(1)} ({guide.totalReviews} reviews)
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{guide.baseLocation}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                <span>{guide.yearsExperience} years exp</span>
              </div>
            </div>
          </div>
        </div>

        {guide.bio && (
          <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
            {guide.bio}
          </p>
        )}

        {guide.languages.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Languages className="h-3.5 w-3.5" />
              <span>Languages</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {guide.languages.map((lang) => (
                <Badge
                  key={lang}
                  variant="secondary"
                  className="text-xs font-normal"
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Packages</p>
            <p className="font-semibold">{guide._count.packages}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Bookings</p>
            <p className="font-semibold">{guide.totalBookings}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}