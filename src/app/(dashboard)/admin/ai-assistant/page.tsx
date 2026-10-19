"use client"

import { useState } from "react"
import { ChatWindow } from "@/components/ai/chat-window"
import { useAdminAiChat } from "@/hooks"
import { Bot } from "lucide-react"

export default function AdminAiAssistantPage() {
  const { mutateAsync, isPending } = useAdminAiChat()
  const [lastWasConfirmation, setLastWasConfirmation] = useState(false)

  const handleSend = async (message: string) => {
    const response = await mutateAsync({ message })
    const reply = response?.data?.reply || "Sorry, I couldn't process that."

    // Detect if AI is asking for confirmation
    const isConfirmation =
      reply.toLowerCase().includes("please confirm") ||
      reply.toLowerCase().includes("confirm korte") ||
      reply.toLowerCase().includes("reply \"yes\"") ||
      reply.toLowerCase().includes("reply yes")

    setLastWasConfirmation(isConfirmation)

    return {
      data: {
        reply,
      },
    }
  }

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-6 lg:p-8">
      {/* ===== PAGE HEADER ===== */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <Bot className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            AI Admin Assistant
          </h1>
          <p className="text-sm text-muted-foreground">
            Query platform stats, approve guides & packages, manage the platform
          </p>
        </div>
      </div>

      {/* ===== CHAT CONTAINER ===== */}
      <div className="h-[calc(100vh-14rem)] min-h-[500px]">
        <ChatWindow
          sendMessage={handleSend}
          isPending={isPending}
          title="Admin AI"
          subtitle="Your platform management copilot"
          placeholder='Try: "Pending guides dekhao" or "Approve guide Faruk"'
          suggestedPrompts={[
            "Pending guides dekhao",
            "Pending packages dekhao",
            "Platform er total revenue koto?",
            "Koyta user ache?",
          ]}
          className="h-full"
        />
      </div>

      {/* ===== QUICK ACTION HINT ===== */}
      {lastWasConfirmation && (
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          💡 <span>Reply</span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
            Yes
          </kbd>
          <span>to confirm or</span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
            No
          </kbd>
          <span>to cancel</span>
        </div>
      )}
    </div>
  )
}