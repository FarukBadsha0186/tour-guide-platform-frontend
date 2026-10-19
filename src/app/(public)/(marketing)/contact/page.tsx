"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Message Sent!", {
        description: "We'll get back to you as soon as possible.",
      })
      // Optionally reset form here
      ;(e.target as HTMLFormElement).reset()
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a question about a tour? Need help with a booking? Or just want to say hi? 
          Our team is here to help you 24/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        
        {/* ===== LEFT: CONTACT INFO ===== */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h2>
            <p className="text-muted-foreground mb-8">
              Fill up the form and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-6">
            <ContactInfoItem 
              icon={<Phone className="h-5 w-5 text-primary" />}
              title="Phone"
              details={["+880 1700-000000", "+880 1800-000000"]}
            />
            <ContactInfoItem 
              icon={<Mail className="h-5 w-5 text-secondary" />}
              title="Email"
              details={["support@tourguide.com", "hello@tourguide.com"]}
            />
            <ContactInfoItem 
              icon={<MapPin className="h-5 w-5 text-accent" />}
              title="Office"
              details={["Level 4, Gulshan Avenue", "Dhaka 1212, Bangladesh"]}
            />
          </div>

          <div className="pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-4">
             
            </div>
          </div>
        </div>

        {/* ===== RIGHT: CONTACT FORM ===== */}
        <Card className="border-border shadow-lg bg-card">
          <CardHeader className="border-b border-border pb-6">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Write your message here..." 
                  className="min-h-[120px] resize-none" 
                  required 
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ContactInfoItem({ icon, title, details }: { icon: React.ReactNode, title: string, details: string[] }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-muted/50 rounded-lg shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        {details.map((detail) => (
          <p key={detail} className="text-sm text-muted-foreground">
            {detail}
          </p>
        ))}
      </div>
    </div>
  )
}