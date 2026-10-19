// src/hooks/ai.hook.ts

import { useMutation } from "@tanstack/react-query"
import { publicAiChat, guideAiChat, adminAiChat } from "@/api/ai.api"

export function usePublicAiChat() {
  return useMutation({
    mutationFn: publicAiChat,
  })
}

export function useGuideAiChat() {
  return useMutation({
    mutationFn: guideAiChat,
  })
}

export function useAdminAiChat() {
  return useMutation({
    mutationFn: adminAiChat,
  })
}