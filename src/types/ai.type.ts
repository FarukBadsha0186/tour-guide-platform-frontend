// src/types/ai.type.ts

export interface IChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: number
}

export interface IAiChatPayload {
  message: string
}

// Matches backend response: { success, statusCode, message, data: { success, reply } }
export interface IAiChatApiResponse {
  success: boolean
  statusCode: number
  message: string
  data: {
    success: boolean
    reply: string
    meta?: {
      intent?: string
      matched?: Record<string, boolean>
    }
  }
}

// For Admin action confirmation (future use)
export interface IAdminPendingAction {
  action: string
  targetId: string
  targetName: string
  reason?: string | null
}