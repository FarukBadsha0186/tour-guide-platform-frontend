"use client"

import { useState, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, X, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { IChatMessage } from "@/types/ai.type"

interface ChatWindowProps {
  sendMessage: (message: string) => Promise<{ data: { reply: string } }>
  isPending: boolean
  title?: string
  subtitle?: string
  placeholder?: string
  suggestedPrompts?: string[]
  onClose?: () => void
  className?: string
}

export function ChatWindow({
  sendMessage,
  isPending,
  title = "AI Assistant",
  subtitle = "Ask me anything about tours, guides, and bookings",
  placeholder = "Type your message...",
  suggestedPrompts = [],
  onClose,
  className,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom on new message
// Auto-scroll to bottom on new message
useEffect(() => {
  // Reference messages & isPending so Biome sees them as actual dependencies
  if (messages.length === 0 && !isPending) return

  scrollRef.current?.scrollTo({
    top: scrollRef.current.scrollHeight,
    behavior: "smooth",
  })
}, [messages, isPending])
  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async (text?: string) => {
    const messageText = (text ?? input).trim()
    if (!messageText || isPending) return

    // Add user message
    const userMsg: IChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
      createdAt: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    try {
      const response = await sendMessage(messageText)
      const reply = response?.data?.reply || "Sorry, I couldn't process that."

      const aiMsg: IChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: reply,
        createdAt: Date.now(),
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch (error: any) {
      toast.error("AI Error", {
        description:
          error?.data?.message || error?.message || "Failed to get response",
      })
      const errorMsg: IChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again in a moment.",
        createdAt: Date.now(),
      }
      setMessages((prev) => [...prev, errorMsg])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card border border-border rounded-2xl shadow-2xl overflow-hidden",
        className
      )}
    >
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
            <Bot className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
              {subtitle}
            </p>
          </div>
        </div>
        {onClose && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-8 rounded-full"
            aria-label="Close chat"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* ===== MESSAGES ===== */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-background"
      >
        {/* Empty state with suggested prompts */}
        {messages.length === 0 && !isPending && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Sparkles className="size-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              How can I help you today?
            </p>
            <p className="text-xs text-muted-foreground mb-4 max-w-[250px]">
              {subtitle}
            </p>
            {suggestedPrompts.length > 0 && (
              <div className="flex flex-col gap-2 w-full max-w-[280px]">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left text-xs px-3 py-2 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === "assistant" && (
              <Avatar className="size-7 shrink-0 mt-0.5">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="size-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              )}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:text-primary">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
            {msg.role === "user" && (
              <Avatar className="size-7 shrink-0 mt-0.5">
                <AvatarFallback className="bg-secondary/20 text-secondary">
                  <User className="size-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isPending && (
          <div className="flex gap-2 justify-start">
            <Avatar className="size-7 shrink-0 mt-0.5">
              <AvatarFallback className="bg-primary/10 text-primary">
                <Bot className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="size-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                <span
                  className="size-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="size-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== INPUT ===== */}
      <div className="p-3 border-t border-border bg-card shrink-0">
        <div className="flex items-end gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={isPending}
            className="resize-none min-h-[40px] max-h-[120px] bg-background border-border"
          />
          <Button
            type="button"
            size="icon"
            onClick={() => handleSend()}
            disabled={!input.trim() || isPending}
            className="bg-primary hover:bg-primary/90 shrink-0"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-[9px]">Enter</kbd> to send,{" "}
          <kbd className="px-1 py-0.5 bg-muted rounded text-[9px]">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  )
}