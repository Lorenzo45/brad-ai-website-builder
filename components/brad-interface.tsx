"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useBradChat } from "@/hooks/useBradChat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp, MoreVertical, Phone, Video, Paperclip, Brain, Code, Monitor, Lightbulb } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Message } from "@/types/chat"


export function BradInterface() {
  const [prompt, setPrompt] = useState("")
  const {
    messages,
    isTyping,
    showQuickReplies,
    smartReplies,
    conversationState,
    designRequirements,
    shouldTransitionToBuild,
    fileInputRef,
    completenessScore,
    sendMessage,
    handleFileUpload,
    getQuickReplies,
    addMessage,
  } = useBradChat()
  
  const [isBuildMode, setIsBuildMode] = useState(false)
  const [buildProgress, setBuildProgress] = useState(0)
  const [showWebsitePreview, setShowWebsitePreview] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [generatedHTML, setGeneratedHTML] = useState<string | null>(null)
  const [isGeneratingHTML, setIsGeneratingHTML] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  const generateHTML = async () => {
    setIsGeneratingHTML(true)
    
    // Start the 90-second progress animation
    setBuildProgress(0)
    const progressInterval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + (100 / 900) // 900 intervals over 90 seconds (100ms each)
      })
    }, 100)
    
    try {
      const response = await fetch("/api/generate-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designRequirements }),
      })

      const result = await response.json()
      
      if (result.success && result.html) {
        // Clear the interval and set to 100%
        clearInterval(progressInterval)
        setBuildProgress(100)
        
        setGeneratedHTML(result.html)
        
        // Show success message and reveal preview
        const successMessage: Message = {
          id: `build-success-${Date.now()}`,
          text: "Boom! 💥 Your website is ready! Check it out on the right - what do you think?",
          sender: "brad",
          isBuildUpdate: true,
        }
        addMessage(successMessage)
        
        setTimeout(() => setShowWebsitePreview(true), 500)
      } else {
        console.error("HTML generation failed:", result.error)
        clearInterval(progressInterval)
        setBuildProgress(0)
        
        const errorMessage: Message = {
          id: `build-error-${Date.now()}`,
          text: "Oops! I ran into an issue generating your website. Can you try describing your project again?",
          sender: "brad",
          isBuildUpdate: true,
        }
        addMessage(errorMessage)
        
        setIsBuildMode(false)
      }
    } catch (error) {
      console.error("Network error during HTML generation:", error)
      clearInterval(progressInterval)
      setBuildProgress(0)
      
      const errorMessage: Message = {
        id: `build-error-${Date.now()}`,
        text: "Sorry, I'm having trouble connecting to generate your website. Please try again in a moment.",
        sender: "brad",
        isBuildUpdate: true,
      }
      addMessage(errorMessage)
      
      setIsBuildMode(false)
    } finally {
      setIsGeneratingHTML(false)
    }
  }

  const startBuildingProcess = () => {
    setIsBuildMode(true)
    setBuildProgress(0)
    setShowWebsitePreview(false)
    setGeneratedHTML(null) // Reset any previous HTML

    // Show initial build message
    const buildMessage: Message = {
      id: `build-${Date.now()}`,
      text: "Perfect! I have all the details I need. Let me start building your website now... ✨",
      sender: "brad",
      isBuildUpdate: true,
    }
    addMessage(buildMessage)

    // Start HTML generation immediately
    generateHTML()
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || prompt
    if (!textToSend.trim()) return

    setPrompt("") // Clear immediately when user sends message
    await sendMessage(textToSend)
  }

  // Trigger build when requirements are ready
  useEffect(() => {
    if (shouldTransitionToBuild && !isBuildMode) {
      startBuildingProcess()
    }
  }, [shouldTransitionToBuild, isBuildMode]) // startBuildingProcess is stable, no need to include





  const renderWebsitePreview = () => {
    // If we have generated HTML, render it
    if (generatedHTML) {
      return (
        <div className="w-full h-full bg-white overflow-hidden overflow-y-auto">
          <iframe
            srcDoc={generatedHTML}
            className="w-full h-full border-0"
            title="Generated Website Preview"
            sandbox="allow-scripts"
          />
        </div>
      )
    }

    // Show empty state when no HTML is generated
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Monitor className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm">Website preview will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex relative">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileUpload}
      />

      <motion.div className="flex flex-col w-full h-screen" layout transition={{ duration: 0.5, ease: "easeInOut" }}>
        <div className="bg-[#111111] border-b border-[#222222] p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 opacity-80"></div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111111]"></div>
            </div>
            <div>
              <h2 className="text-white font-medium flex items-center gap-2">
                Brad.ai
                {isBuildMode && <Code className="w-3 h-3 text-cyan-400" />}
              </h2>
              <p className="text-xs text-gray-400">
                {isBuildMode 
                  ? `Building your project` 
                  : shouldTransitionToBuild
                  ? "Ready to build • All requirements gathered"
                  : `${conversationState.phase === 'discovery' ? 'Learning about your project' : 
                      conversationState.phase === 'requirements' ? 'Gathering specifications' : 
                      conversationState.phase === 'refinement' ? 'Refining details' : 
                      'Ready to start building'} • ${Math.round(completenessScore * 100)}% complete`
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
              <Video className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 pl-4 pr-2 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="relative group">
                <div
                  className={`${
                    message.sender === "user" ? "max-w-[85%] ml-auto" : "max-w-[70%]"
                  } min-w-[120px] ${
                    message.sender === "user"
                      ? "bg-amber-500 text-black"
                      : message.isBuildUpdate
                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-100"
                        : "bg-[#1a1a1a] text-gray-200"
                  } rounded-2xl px-4 py-2 relative ${message.isMemoryReference ? "border border-amber-400/30" : ""}`}
                >
                  {message.isMemoryReference && (
                    <div className="flex items-center gap-1 mb-1">
                      <Brain className="w-3 h-3 text-amber-400" />
                      <span className="text-xs text-amber-400">Remembering previous work</span>
                    </div>
                  )}
                  {message.isBuildUpdate && (
                    <div className="flex items-center gap-1 mb-1">
                      <Code className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs text-cyan-400">Building update</span>
                    </div>
                  )}
                  <p className={`text-sm leading-relaxed break-words whitespace-pre-wrap ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}>{message.text}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {showQuickReplies && !isTyping && getQuickReplies().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="px-2"
              >
                {/* Smart Reply Options or Fallback Quick Replies */}
                {smartReplies.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <Lightbulb className="w-3 h-3 text-amber-400" />
                      <span className="text-xs text-amber-400 font-medium">
                        Quick replies:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getQuickReplies().map((reply, index) => {
                        const replyObj = smartReplies.find(r => r.text === reply)
                        const getCategoryColor = (category?: string) => {
                          switch (category) {
                            case "direct-answer": return "border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10"
                            case "elaboration": return "border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10"
                            case "alternative": return "border-green-500/30 bg-green-500/5 hover:bg-green-500/10"
                            case "clarification": return "border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10"
                            default: return "bg-[#1a1a1a] border-[#333] hover:bg-[#2a2a2a]"
                          }
                        }
                        
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendMessage(reply)}
                            className={`${getCategoryColor(replyObj?.category)} text-gray-300 hover:text-white text-sm px-4 py-2 h-auto min-w-fit whitespace-nowrap`}
                          >
                            {reply}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Fallback when no smart replies */}
                {smartReplies.length === 0 && (
                  <div className="flex flex-wrap gap-2">
                    {getQuickReplies().map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(reply)}
                        className="bg-[#1a1a1a] border-[#333] text-gray-300 hover:bg-[#2a2a2a] hover:text-white text-sm px-6 py-2 h-auto min-w-fit whitespace-nowrap"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="bg-[#1a1a1a] rounded-2xl px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">Brad is typing...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-[#111111] border-t border-[#222222] flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              className="w-12 h-12 text-gray-400 hover:text-white hover:bg-[#2a2a2a] flex-shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            <div className="flex-1 bg-[#1a1a1a] border border-[#333333] rounded-2xl px-4 py-3 min-h-[48px] flex items-center">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Message Brad..."
                className="bg-transparent border-0 text-gray-300 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
            </div>
            <Button
              size="icon"
              onClick={() => handleSendMessage()}
              disabled={!prompt.trim() || isTyping}
              className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 text-black flex-shrink-0"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isBuildMode && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "50%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-[#0f0f0f] border-l border-[#222222] flex flex-col h-screen"
          >
            <div className="bg-[#111111] border-b border-[#222222] p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-medium">Live Preview</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-400">{showWebsitePreview ? "Ready" : "Building..."}</div>
                <div
                  className={`w-2 h-2 rounded-full ${showWebsitePreview ? "bg-green-400" : "bg-cyan-400 animate-pulse"}`}
                ></div>
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              {showWebsitePreview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 relative overflow-hidden"
                >
                  <div className="relative z-10 h-full overflow-y-auto">{renderWebsitePreview()}</div>
                </motion.div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-6">
                  <div className="w-full max-w-md">
                    <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 rounded-lg p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Building Your Vision</h3>
                      <p className="text-gray-400 mb-4">
                        {isGeneratingHTML ? "Generating custom HTML based on your requirements..." : "Brad is crafting something amazing for you..."}
                      </p>

                      <div className="w-full bg-[#1a1a1a] rounded-full h-2 mb-4">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${buildProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      <div className="text-sm text-cyan-400">
                        {isGeneratingHTML ? "Generating HTML..." : "Building..."}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
