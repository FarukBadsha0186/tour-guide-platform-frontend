// src/api/ai.api.ts

import apiClient from "@/lib/apiClient"
import type { IAiChatPayload, IAiChatApiResponse } from "@/types/ai.type"

// Public / Tourist (no auth required, but token optional)
export function publicAiChat(
  payload: IAiChatPayload
): Promise<IAiChatApiResponse> {
  return apiClient("ai/chat", { method: "POST", body: payload })
}

// Guide (auth required - GUIDE role)
export function guideAiChat(
  payload: IAiChatPayload
): Promise<IAiChatApiResponse> {
  return apiClient("ai/guide-chat", { method: "POST", body: payload })
}

// Admin (auth required - ADMIN role)
export function adminAiChat(
  payload: IAiChatPayload
): Promise<IAiChatApiResponse> {
  return apiClient("ai/admin-chat", { method: "POST", body: payload })
}