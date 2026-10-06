import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TouristHomePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Welcome Tourist</h1>
      <p className="text-muted-foreground mb-6">
        Browse tours, book your next adventure.
      </p>

      <Link href="/tourist">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  )
}