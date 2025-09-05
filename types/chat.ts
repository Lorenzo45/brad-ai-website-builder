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
  phase: "discovery" | "requirements" | "refinement" | "ready-to-build"
  userIntent: string
  designType?: "landing-page" | "portfolio" | "dashboard" | "e-commerce" | "blog" | "other"
  completenessScore: number // 0-1 scale, how complete the requirements are
}

export interface DesignRequirements {
  subject?: string
  purpose?: string
  targetAudience?: string
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