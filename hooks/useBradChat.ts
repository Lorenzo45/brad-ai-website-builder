import { useState, useRef } from "react"

interface Message {
  id: string
  text: string
  sender: "user" | "brad"
  isMemoryReference?: boolean
  isBuildUpdate?: boolean
}

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getLLMResponse = async (userMessage: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        return err.error || "Server error"
      }

      const data = await res.json()
      console.log("response", data.text)
      return data.text || "No response"
    } catch (_) {
      return "Network error"
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

    const responseText = await getLLMResponse(messageText)
    const bradResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: "brad",
    }
    
    addMessage(bradResponse)
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
    const lastBradMessage = messages.filter((m) => m.sender === "brad").slice(-1)[0]
    if (!lastBradMessage) return []

    if (lastBradMessage.text.includes("first thing")) {
      return ["Landing page", "Portfolio site", "Mobile app", "Dashboard"]
    }
    if (lastBradMessage.text.includes("tell me more")) {
      return ["Show examples", "I need help with colors", "Mobile-first design", "Something modern"]
    }
    return ["Sounds great!", "Tell me more", "Show me examples", "Let's do it"]
  }

  return {
    messages,
    isTyping,
    showQuickReplies,
    fileInputRef,
    sendMessage,
    handleFileUpload,
    getQuickReplies,
    addMessage,
  }
}