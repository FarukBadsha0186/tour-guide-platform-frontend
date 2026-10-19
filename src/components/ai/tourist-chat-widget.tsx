// "use client"

// import { useState, useEffect } from "react"
// import { MessageCircle } from "lucide-react"
// import { ChatWindow } from "./chat-window"

// import { cn } from "@/lib/utils"
// import { usePublicAiChat } from "@/hooks/ai.hook"

// export function TouristChatWidget() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [footerVisible, setFooterVisible] = useState(false)
//   const { mutateAsync, isPending } = usePublicAiChat()

//   // Detect footer visibility using IntersectionObserver
//   useEffect(() => {
//     const footer = document.querySelector("footer")
//     if (!footer) return

//     const observer = new IntersectionObserver(
//       ([entry]) => setFooterVisible(entry.isIntersecting),
//       { threshold: 0.1 }
//     )
//     observer.observe(footer)

//     return () => observer.disconnect()
//   }, [])

//   const handleSend = async (message: string) => {
//     const response = await mutateAsync({ message })
//     return {
//       data: {
//         reply: response?.data?.reply || "Sorry, I couldn't process that.",
//       },
//     }
//   }

//   const hideButton = footerVisible && !isOpen

//   return (
//     <>
//       {/* ===== FLOATING BUTTON ===== */}
//       {!isOpen && (
//         <button
//           type="button"
//           onClick={() => setIsOpen(true)}
//           aria-label="Open AI Assistant"
//           className={cn(
//             "fixed bottom-4 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:bottom-6 sm:right-6",
//             hideButton && "translate-y-24 opacity-0 pointer-events-none"
//           )}
//         >
//           <MessageCircle className="size-6" />
//         </button>
//       )}

//       {/* ===== CHAT WINDOW ===== */}
//       {isOpen && (
//         <>
//           {/* Mobile backdrop */}
//           <div
//             className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
//             onClick={() => setIsOpen(false)}
//             aria-hidden="true"
//           />

//           {/* Chat container */}
//           <div
//             className={cn(
//               "fixed z-50 overflow-hidden",
//               // Mobile: full-width bottom sheet
//               "inset-x-0 bottom-0 h-[85vh]",
//               // Desktop: floating card
//               "sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[550px] sm:w-[400px]"
//             )}
//           >
//             <ChatWindow
//               sendMessage={handleSend}
//               isPending={isPending}
//               title="AI Travel Assistant"
//               subtitle="Ask me about tours, guides, and bookings"
//               placeholder="Where do you want to go?"
//               suggestedPrompts={[
//                 "Show me Bandarban tours",
//                 "How can I book a tour?",
//                 "What payment methods do you accept?",
//               ]}
//               onClose={() => setIsOpen(false)}
//               className="h-full rounded-t-2xl border-b-0 sm:rounded-2xl sm:border-b"
//             />
//           </div>
//         </>
//       )}
//     </>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { ChatWindow } from "./chat-window"

import { cn } from "@/lib/utils"
import { usePublicAiChat } from "@/hooks/ai.hook"

export function TouristChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [footerOffset, setFooterOffset] = useState(0)
  const { mutateAsync, isPending } = usePublicAiChat()

  // ✅ Smart positioning: push button UP when footer enters view
  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    const computeOffset = () => {
      const rect = footer.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const buttonMargin = 24

      if (rect.top < viewportHeight) {
        // Footer is visible - how much is visible from bottom
        const spaceBelowFooterTop = viewportHeight - rect.top
        const offset = Math.max(0, spaceBelowFooterTop - buttonMargin)
        setFooterOffset(offset)
      } else {
        setFooterOffset(0)
      }
    }

    window.addEventListener("scroll", computeOffset, { passive: true })
    window.addEventListener("resize", computeOffset)
    computeOffset()

    return () => {
      window.removeEventListener("scroll", computeOffset)
      window.removeEventListener("resize", computeOffset)
    }
  }, [])

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
      {/* ===== FLOATING BUTTON (Always visible, slides up on footer) ===== */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          style={{ bottom: `${footerOffset + 24}px` }}
          className="fixed right-4 sm:right-6 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
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