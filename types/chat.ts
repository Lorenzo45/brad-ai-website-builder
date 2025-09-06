// TypeScript interfaces for OpenAI structured responses in the smart questioning system

export interface Message {
  id: string
  text: string
  sender: "user" | "brad"
  isMemoryReference?: boolean
  isBuildUpdate?: boolean
}

export interface SmartReply {
  text: string
  category: "direct-answer" | "elaboration" | "alternative" | "clarification"
  relevanceScore: number // 0-1 scale, higher = more relevant
}

export interface ConversationState {
  phase: "discovery" | "requirements" | "confirmation" | "ready-to-build"
  userIntent: string
}

export interface DesignRequirements {
  designType?: "landing-page" | "portfolio" | "dashboard" | "e-commerce" | "blog" | "other"
  subject?: string
  subjectName?: string
  purpose?: string
  preferredStyleAndInspiration?: string
  colorPreferences?: string[]
  functionalityNeeds?: string[]
  contentTypes?: string[]
}

export interface BradStructuredResponse {
  response: string
  smartReplies: SmartReply[]
  conversationState: ConversationState
  designRequirements: DesignRequirements
  suggestedActions: string[]
  confidenceScore: number // 0-1 scale
  shouldTransitionToBuild: boolean
}

export interface ChatAPIRequest {
  message: string
  conversationHistory: Message[]
  currentRequirements?: DesignRequirements
}

export interface ChatAPIResponse {
  success: boolean
  data?: BradStructuredResponse
  error?: string
}