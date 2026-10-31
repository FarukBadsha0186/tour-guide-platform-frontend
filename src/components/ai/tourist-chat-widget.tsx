

"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { ChatWindow } from "./chat-window"
import { cn } from "@/lib/utils"
import { usePublicAiChat } from "@/hooks/ai.hook"

export function TouristChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
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
    <>
      {/* ===== FLOATING BUTTON (Always bottom-right, never hide) ===== */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
        >
          <MessageCircle className="size-6" />
        </button>
      )}

      {/* ===== CHAT WINDOW ===== */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Chat container */}
          <div
            className={cn(
              "fixed z-50 overflow-hidden",
              "inset-x-0 bottom-0 h-[85vh]",
              "sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[550px] sm:w-[400px]"
            )}
          >
            <ChatWindow
              sendMessage={handleSend}
              isPending={isPending}
              title="AI Travel Assistant"
              subtitle="Ask me about tours, guides, and bookings"
              placeholder="Where do you want to go?"
              suggestedPrompts={[
                "Show me Bandarban tours",
                "How can I book a tour?",
                "What payment methods do you accept?",
              ]}
              onClose={() => setIsOpen(false)}
              className="h-full rounded-t-2xl border-b-0 sm:rounded-2xl sm:border-b"
            />
          </div>
        </>
      )}
    </>
  )
}