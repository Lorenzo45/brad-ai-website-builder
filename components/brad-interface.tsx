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
    shouldTransitionToBuild,
    fileInputRef,
    sendMessage,
    handleFileUpload,
    getQuickReplies,
    addMessage,
  } = useBradChat()
  
  const [isBuildMode, setIsBuildMode] = useState(false)
  const [buildProgress, setBuildProgress] = useState(0)
  const [showWebsitePreview, setShowWebsitePreview] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isDesignMode, setIsDesignMode] = useState(false)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [designPrompt, setDesignPrompt] = useState("")
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  const handleElementClick = (elementType: string, elementId: string) => {
    if (isDesignMode) {
      setSelectedElement(`${elementType}-${elementId}`)
    }
  }

  const getPromptPlaceholder = () => {
    if (!hoveredElement) return "Click an element to modify it..."

    const prompts = {
      nav: "Change the navigation style, colors, or layout...",
      hero: "Modify the hero section text, spacing, or background...",
      button: "I don't like this button, make it more rounded...",
      footer: "Update the footer design, links, or styling...",
      sidebar: "Change the sidebar navigation or colors...",
      stats: "Modify the stats cards layout or styling...",
      features: "Update the features section design...",
      work: "Change the work portfolio grid or styling...",
    }

    const elementType = hoveredElement.split("-")[0]
    return prompts[elementType as keyof typeof prompts] || "Describe how you'd like to change this element..."
  }

  const handleDesignChange = () => {
    if (!designPrompt.trim() || !selectedElement) return

    const designMessage: Message = {
      id: Date.now().toString(),
      text: `🎨 Design change for ${selectedElement.replace("-", " ")}: ${designPrompt}`,
      sender: "user",
    }

    addMessage(designMessage)
    setDesignPrompt("")
    setSelectedElement(null)

    setTimeout(() => {
      const bradResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Perfect! I've updated the ${selectedElement?.replace("-", " ")} based on your feedback. The changes are looking fresh! ✨`,
        sender: "brad",
      }
      addMessage(bradResponse)
    }, 1500)
  }




  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startBuildingProcess = () => {
    setIsBuildMode(true)
    setBuildProgress(0)
    setShowWebsitePreview(false)

    const buildSteps = [
      { progress: 20, message: "Alright, firing up my design brain... *cracks knuckles* 🧠", delay: 1000 },
      {
        progress: 40,
        message: "Setting up the foundation - I'm thinking clean structure with some spicy animations ✨",
        delay: 2000,
      },
      { progress: 60, message: "Adding the visual magic... this color palette is *chef's kiss* 🎨", delay: 2500 },
      { progress: 80, message: "Fine-tuning the interactions - users are gonna love this flow! 🚀", delay: 2000 },
      {
        progress: 100,
        message: "Boom! 💥 Check out what we've got cooking on the right. What do you think?",
        delay: 1500,
      },
    ]

    buildSteps.forEach((step, index) => {
      setTimeout(
        () => {
          setBuildProgress(step.progress)
          const buildMessage: Message = {
            id: `build-${Date.now()}-${index}`,
            text: step.message,
            sender: "brad",
            isBuildUpdate: true,
          }
          addMessage(buildMessage)

          if (step.progress === 100) {
            setTimeout(() => setShowWebsitePreview(true), 1000)
          }
        },
        buildSteps.slice(0, index + 1).reduce((acc, curr) => acc + curr.delay, 0),
      )
    })
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || prompt
    if (!textToSend.trim()) return

    await sendMessage(textToSend)
    setPrompt("")

    // TODO: Add this back in
    // if (response.shouldStartBuilding) {
    //   setTimeout(() => startBuildingProcess(keywords), 1000)
    // }
  }





  const renderWebsitePreview = () => {
    const baseClasses = "w-full h-full bg-white overflow-hidden overflow-y-auto"
    const elementClasses = isDesignMode
      ? "cursor-pointer hover:ring-2 hover:ring-cyan-500 hover:ring-opacity-75 transition-all duration-200"
      : ""

    // Landing page
    return (
      <div className={baseClasses}>
        <nav
          className={`bg-white px-8 py-6 flex items-center justify-between ${elementClasses} ${selectedElement === "nav-header" ? "ring-2 ring-cyan-500" : ""}`}
          onClick={() => handleElementClick("nav", "header")}
          onMouseEnter={() => setHoveredElement("nav-header")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div className="font-medium text-lg text-black">Brand</div>
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-black transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Contact
            </a>
          </div>
        </nav>

        <div
          className={`bg-white px-8 py-32 text-center ${elementClasses} ${selectedElement === "hero-section" ? "ring-2 ring-cyan-500" : ""}`}
          onClick={() => handleElementClick("hero", "section")}
          onMouseEnter={() => setHoveredElement("hero-section")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <h1 className="text-5xl font-light text-black mb-6 max-w-3xl mx-auto leading-tight">
            Simple solutions for complex problems
          </h1>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Clean, minimal, and effective tools for the modern workflow
          </p>
          <button
            className={`bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors ${elementClasses} ${selectedElement === "button-cta" ? "ring-2 ring-cyan-500" : ""}`}
            onClick={(e) => {
              e.stopPropagation()
              handleElementClick("button", "cta")
            }}
            onMouseEnter={() => setHoveredElement("button-cta")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            Get Started
          </button>
        </div>

        <div
          className={`bg-white px-8 py-24 border-t border-gray-100 ${elementClasses} ${selectedElement === "features-section" ? "ring-2 ring-cyan-500" : ""}`}
          onClick={() => handleElementClick("features", "section")}
          onMouseEnter={() => setHoveredElement("features-section")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-black mb-16 text-center">Features</h2>
            <div className="grid grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-black mb-2">Simple</h3>
                <p className="text-gray-600 text-sm">Clean and intuitive interface</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-black mb-2">Fast</h3>
                <p className="text-gray-600 text-sm">Lightning quick performance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-black mb-2">Reliable</h3>
                <p className="text-gray-600 text-sm">Built to last and scale</p>
              </div>
            </div>
          </div>
        </div>

        <footer
          className={`bg-white border-t border-gray-100 px-8 py-12 text-center ${elementClasses} ${selectedElement === "footer-section" ? "ring-2 ring-cyan-500" : ""}`}
          onClick={() => handleElementClick("footer", "section")}
          onMouseEnter={() => setHoveredElement("footer-section")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <p className="text-gray-500 text-sm">© 2025 Brand. All rights reserved.</p>
        </footer>
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
                  ? `Building your project • ${buildProgress}% complete` 
                  : shouldTransitionToBuild
                  ? "Ready to build • All requirements gathered"
                  : `${conversationState.phase === 'discovery' ? 'Learning about your project' : 
                      conversationState.phase === 'requirements' ? 'Gathering specifications' : 
                      conversationState.phase === 'refinement' ? 'Refining details' : 
                      'Ready to start building'} • ${Math.round(conversationState.completenessScore * 100)}% complete`
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

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="relative group">
                <div
                  className={`max-w-[70%] min-w-[120px] ${
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
                  <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.text}</p>
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
        {isDesignMode && isBuildMode && showWebsitePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#0a0a0a] z-50 flex flex-col"
          >
            {/* Design mode header */}
            <div className="bg-[#111111] border-b border-[#222222] p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-medium">Design Mode</h3>
                <div className="text-xs text-gray-400">Click elements to modify them</div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsDesignMode(false)
                  setSelectedElement(null)
                  setHoveredElement(null)
                }}
                className="bg-cyan-500 text-black border-cyan-500 hover:bg-cyan-600 hover:text-black"
              >
                Exit Design Mode
              </Button>
            </div>

            {/* Canvas with dotted background */}
            <div className="flex-1 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle, #666 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                  backgroundPosition: "12px 12px",
                }}
              />
              <div className="relative z-10 h-full overflow-y-auto">{renderWebsitePreview()}</div>
            </div>

            {/* Design prompt input - always visible at bottom */}
            <motion.div className="bg-[#111111] border-t border-[#222222] p-4 flex-shrink-0" layout>
              {selectedElement ? (
                <div className="w-full">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs text-cyan-400">Selected:</span>
                    <span className="text-xs text-white capitalize">{selectedElement.replace("-", " ")}</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={designPrompt}
                      onChange={(e) => setDesignPrompt(e.target.value)}
                      placeholder={getPromptPlaceholder()}
                      className="bg-[#1a1a1a] border-[#333] text-gray-300 placeholder:text-gray-500 text-sm focus-visible:ring-1 focus-visible:ring-cyan-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleDesignChange()
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={handleDesignChange}
                      disabled={!designPrompt.trim()}
                      className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 flex-shrink-0"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full text-center">
                  <p className="text-gray-400 text-sm">
                    {hoveredElement ? getPromptPlaceholder() : "Hover over elements to see modification options"}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBuildMode && !isDesignMode && (
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
                {showWebsitePreview && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsDesignMode(true)}
                    className="bg-[#1a1a1a] border-[#333] text-gray-300 hover:text-white hover:border-cyan-500 hover:bg-[#2a2a2a] text-xs"
                  >
                    Design Mode
                  </Button>
                )}
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
                      <p className="text-gray-400 mb-4">Brad is crafting something amazing for you...</p>

                      <div className="w-full bg-[#1a1a1a] rounded-full h-2 mb-4">
                        <motion.div
                          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${buildProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      <div className="text-sm text-cyan-400">{buildProgress}% Complete</div>
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
