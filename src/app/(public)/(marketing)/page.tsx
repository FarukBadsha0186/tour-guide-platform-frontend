// export default function Page() {

//      return (
//         <div>HOM PAGE</div>
//      )
    
// }

import { Hero } from "@/components/modules/public/home/hero"
import { FeaturedPackages } from "@/components/modules/public/home/featured-packages"
import { WhyChooseUs } from "@/components/modules/public/home/why-choose-us"
import { FeaturedGuides } from "@/components/modules/public/home/featured-guides"
import { CTASection } from "@/components/modules/public/home/cta-section"

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedPackages />
      <WhyChooseUs />
      <FeaturedGuides />
      <CTASection />
    </div>
  )
}