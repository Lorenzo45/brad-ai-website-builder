import { useState, useRef } from "react"
import type { 
  Message, 
  BradStructuredResponse, 
  SmartReply, 
  DesignRequirements,
  ConversationState 
} from "@/types/chat"

export function useBradChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! 👋 I'm Brad, your personal designer. Sarah from the team introduced us - she mentioned you might need some design work?",
      sender: "brad",
    },
    {
      id: "2",
      text: "I'm basically like having a designer on retainer - always here when you need something built, redesigned, or just want to bounce ideas around.",
      sender: "brad",
    },
    {
      id: "3",
      text: "What's the first thing you'd like to work on together?",
      sender: "brad",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [smartReplies, setSmartReplies] = useState<SmartReply[]>([])
  const [conversationState, setConversationState] = useState<ConversationState>({
    phase: "discovery",
    userIntent: "seeking design assistance"
  })
  const [designRequirements, setDesignRequirements] = useState<DesignRequirements>({})
  const [shouldTransitionToBuild, setShouldTransitionToBuild] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [completenessScore, setCompletenessScore] = useState(0)

  // Calculate completeness score based on non-null design requirements
  const calculateCompletenessScore = (updatedDesignRequirements?: DesignRequirements): number => {
    const allFields = ['designType', 'subject', 'subjectName', 'purpose', 'preferredStyleAndInspiration', 'colorPreferences', 'functionalityNeeds', 'contentTypes']
    
    const requirements = updatedDesignRequirements || designRequirements
    
    let completed = 0
    
    // Check design requirements fields
    allFields.forEach(field => {
      const value = requirements[field as keyof DesignRequirements]
      if (value && (typeof value === 'string' ? value.trim() : Array.isArray(value) ? value.length > 0 : true)) {
        completed++
      }
    })
    
    const totalFields = allFields.length
    const score = completed / totalFields

    return isNaN(score) ? 0 : score
  }

  const getStructuredResponse = async (userMessage: string): Promise<BradStructuredResponse | null> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          conversationHistory: messages,
          currentRequirements: designRequirements
        }),
      })

      const result = await res.json()
      
      if (!res.ok || !result.success) {
        console.error("API error:", result.error)
        return null
      }

      return result.data
    } catch (error) {
      console.error("Network error:", error)
      return null
    }
  }

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
    }

    addMessage(userMessage)
    setIsTyping(true)
    setShowQuickReplies(false)
    setSmartReplies([])

    const structuredResponse = await getStructuredResponse(messageText)
    
    if (structuredResponse) {
      // Update conversation state and requirements
      const updatedRequirements = {
        ...designRequirements,
        ...structuredResponse.designRequirements
      }
      
      setConversationState(structuredResponse.conversationState)
      setDesignRequirements(updatedRequirements)
      setSmartReplies(structuredResponse.smartReplies)
      setShouldTransitionToBuild(structuredResponse.shouldTransitionToBuild)
      setCompletenessScore(calculateCompletenessScore(updatedRequirements))

      const bradResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: structuredResponse.response,
        sender: "brad",
      }
      
      addMessage(bradResponse)
    } else {
      // Fallback message if structured response fails
      const bradResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble processing that right now. Can you try rephrasing your message?",
        sender: "brad",
      }
      
      addMessage(bradResponse)
    }
    
    setIsTyping(false)
    setShowQuickReplies(true)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `📎 Shared: ${file.name}`,
        sender: "user",
      }
      addMessage(fileMessage)

      setTimeout(() => {
        const bradResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Perfect! I can see your file. This gives me great context for what you're looking for. Let me take a look and we can build something amazing together! 🎨",
          sender: "brad",
        }
        addMessage(bradResponse)
      }, 2000)
    }
  }

  const getQuickReplies = (): string[] => {
    // If we have smart replies from the structured response, use those
    if (smartReplies.length > 0) {
      return smartReplies
        .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance descending
        .slice(0, 5) // Take top 5
        .map(reply => reply.text)
    }

    // Fallback to legacy quick replies if no smart replies
    const lastBradMessage = messages.filter((m) => m.sender === "brad").slice(-1)[0]
    if (!lastBradMessage) return []

    if (lastBradMessage.text.includes("first thing")) {
      return ["Landing page", "Portfolio site", "E-Commerce", "Blog"]
    }
    return []
  }

  return {
    messages,
    isTyping,
    showQuickReplies,
    smartReplies,
    conversationState,
    designRequirements,
    shouldTransitionToBuild,
    completenessScore,
    fileInputRef,
    sendMessage,
    handleFileUpload,
    getQuickReplies,
    addMessage,
  }
}