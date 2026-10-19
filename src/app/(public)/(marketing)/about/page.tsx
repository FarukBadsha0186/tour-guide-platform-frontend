import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Users, ShieldCheck, MapPin, Heart, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-20 md:py-32 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm mb-6 border border-primary/20">
            <Compass className="h-4 w-4" />
            <span>Our Story</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground max-w-3xl mx-auto">
            Connecting Travelers with the <span className="text-primary">Soul of Bangladesh</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We believe that the best way to experience a new place is through the eyes of a local. 
            Tour Guide was built to bridge the gap between curious travelers and passionate local experts.
          </p>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why We Started
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Bangladesh is a country of immense beauty, from the misty hills of Bandarban to the 
                longest sea beach at Cox's Bazar. However, finding a trustworthy, knowledgeable guide 
                was always a challenge.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We created this platform to empower local guides and give travelers a seamless, 
                secure, and authentic way to explore our beautiful country. Every guide on our platform 
                is verified, ensuring your safety and peace of mind.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-3xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Verified Guides</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <p className="text-3xl font-bold text-foreground">10k+</p>
                  <p className="text-sm text-muted-foreground">Happy Travelers</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border shadow-xl">
              <img 
                src="/explorebangladesh.jpg" 
                alt="Explore Bangladesh" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-medium text-lg italic">
                  "The world is a book, and those who do not travel read only one page."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Drives Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values shape everything we do, from how we verify guides to how we handle your bookings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<ShieldCheck className="h-8 w-8 text-primary" />}
              title="Trust & Safety"
              description="Every guide is strictly vetted and verified by our admin team. Your safety is our top priority."
            />
            <ValueCard 
              icon={<Users className="h-8 w-8 text-secondary" />}
              title="Empowering Locals"
              description="We help local experts turn their passion into a sustainable livelihood by connecting them directly with travelers."
            />
            <ValueCard 
              icon={<Heart className="h-8 w-8 text-accent" />}
              title="Authentic Experiences"
              description="No generic tourist traps. We focus on real, off-the-beaten-path experiences guided by locals."
            />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Explore with Us?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of travelers who have discovered the true beauty of Bangladesh with our expert local guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages">
              <Button size="lg" className="w-full sm:w-auto">Browse Tours</Button>
            </Link>
            <Link href="/guides">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Meet Our Guides</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 p-3 bg-muted/50 rounded-xl w-fit">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}