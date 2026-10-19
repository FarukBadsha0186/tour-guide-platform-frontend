"use client"

import { ChatWindow } from "@/components/ai/chat-window"
import { usePublicAiChat } from "@/hooks"
import { Bot } from "lucide-react"

export default function TouristAiAssistantPage() {
  const { mutateAsync, isPending } = usePublicAiChat()

  const handleSend = async (message: string) => {
    const response = await mutateAsync({ message })
    return {
      data: {
        reply: response?.data?.reply || "Sorry, I couldn't process that.",
      },
    }
  }

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-6 lg:p-8">
      {/* PAGE HEADER */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <Bot className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            AI Travel Assistant
          </h1>
          <p className="text-sm text-muted-foreground">
            Ask about tours, guides, bookings, and payment
          </p>
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className="h-[calc(100vh-14rem)] min-h-[500px]">
        <ChatWindow
          sendMessage={handleSend}
          isPending={isPending}
          title="Travel Assistant"
          subtitle="Your personal travel guide"
          placeholder="Where do you want to go?"
          suggestedPrompts={[
            "Show me Bandarban tours",
            "How can I book a tour?",
            "What payment methods do you accept?",
            "Cheapest packages dekhao",
          ]}
          className="h-full"
        />
      </div>
    </div>
  )
}