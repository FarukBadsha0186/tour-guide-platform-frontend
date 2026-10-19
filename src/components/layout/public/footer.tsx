// import { ReactNode } from "react";

// export default function Footer() {


//     return (
      
//        <div className="w-full, h-16 flex justify-center items-center">
//         <h1>TOUR GUIDE SYSTEM</h1>
//        </div>
//     )
// }

import Link from "next/link"
import { FaFacebook, FaFacebookF, FaInstagram, FaInstagramSquare, FaTwitter, FaTwitterSquare } from "react-icons/fa"
import { Mail, Phone, MapPin, Compass } from "lucide-react"
const footerLinks = {
  explore: [
    { name: "Packages", url: "/packages" },
    { name: "Guides", url: "/guides" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ],
  support: [
    { name: "Help Center", url: "/help" },
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
    { name: "FAQs", url: "/faq" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com" },
  { name: "Instagram", icon: FaInstagramSquare, url: "https://instagram.com" },
  { name: "Twitter", icon: FaTwitterSquare, url: "https://twitter.com" },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Compass className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">
                Tour Guide
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover Bangladesh through local eyes. Book authentic tours with
              verified guides who bring every destination to life.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href="mailto:support@tourguide.com"
                  className="transition-colors hover:text-primary"
                >
                  support@tourguide.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href="tel:+8801700000000"
                  className="transition-colors hover:text-primary"
                >
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tour Guide Platform. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  )
}