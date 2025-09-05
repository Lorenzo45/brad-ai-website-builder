import { NextResponse } from "next/server"
import OpenAI from "openai"
import type { ChatAPIRequest, BradStructuredResponse, DesignRequirements, Message } from "@/types/chat"

// Define the structured output schema for OpenAI
const bradResponseSchema = {
  type: "object" as const,
  properties: {
    response: { type: "string" },
    smartReplies: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: { type: "string" },
          category: { 
            type: "string",
            enum: ["direct-answer", "elaboration", "alternative", "clarification"]
          },
          relevanceScore: { type: "number", minimum: 0, maximum: 1 }
        },
        required: ["text", "category", "relevanceScore"],
        additionalProperties: false
      }
    },
    conversationState: {
      type: "object",
      properties: {
        phase: { 
          type: "string",
          enum: ["discovery", "requirements", "refinement", "ready-to-build"]
        },
        userIntent: { type: "string" },
        designType: {
          type: "string",
          enum: ["landing-page", "portfolio", "dashboard", "e-commerce", "blog", "other"]
        },
        completenessScore: { type: "number", minimum: 0, maximum: 1 }
      },
      required: ["phase", "userIntent", "designType", "completenessScore"],
      additionalProperties: false
    },
    designRequirements: {
      type: "object",
      properties: {
        subject: { type: ["string", "null"] },
        purpose: { type: ["string", "null"] },
        targetAudience: { type: ["string", "null"] },
        preferredStyleAndInspiration: { type: ["string", "null"] },
        colorPreferences: { type: ["array", "null"], items: { type: "string" } },
        functionalityNeeds: { type: ["array", "null"], items: { type: "string" } },
        contentTypes: { type: ["array", "null"], items: { type: "string" } }
      },
      required: ["subject", "purpose", "targetAudience", "preferredStyleAndInspiration", "colorPreferences", "functionalityNeeds", "contentTypes"],
      additionalProperties: false
    },
    suggestedActions: { type: "array", items: { type: "string" } },
    confidenceScore: { type: "number", minimum: 0, maximum: 1 },
    shouldTransitionToBuild: { type: "boolean" }
  },
  required: [
    "response", 
    "smartReplies", 
    "conversationState", 
    "designRequirements",
    "suggestedActions", 
    "confidenceScore",
    "shouldTransitionToBuild"
  ],
  additionalProperties: false
}

function buildSystemPrompt(conversationHistory: Message[], currentRequirements?: DesignRequirements): string {
  const historyContext = conversationHistory.slice(-5).map(msg => 
    `${msg.sender}: ${msg.text}`
  ).join('\n')

  const requirementsContext = currentRequirements ? 
    `Current requirements gathered: ${JSON.stringify(currentRequirements, null, 2)}` : 
    'No requirements gathered yet.'

  return `You are Brad, a friendly and expert AI Webflow design assistant. Your role is to help users design Webflow websites by asking smart, contextual questions to understand their needs.

CONVERSATION CONTEXT:
${historyContext}

CURRENT REQUIREMENTS:
${requirementsContext}

YOUR OBJECTIVES:
1. Gather design requirements for a Webflow website from the user by asking questions
2. Start by asking about the website subject (company name, personal brand, organization, or main topic)
3. Provide an optional 1-2 word response (e.g. "Sounds good!") - primarily ask questions (one question at a time)
4. Generate 3-5 convenient smart reply options that help users respond quickly
5. Track design requirements and conversation state
6. Reference previous messages when relevant
7. Determine when enough information is gathered to suggest building a Webflow site
8. Keep the conversation focused on Webflow design needs

SMART REPLY STRATEGY:
- Generate quick, convenient response options for any questions you ask in your response
- Include direct answers, elaborations, alternatives, and clarification options
- Make replies specific to the context (e.g., if asking about website purpose: "Myself", "My business", "A group")
- Prioritize the most common/likely user responses
- Keep replies concise and actionable

CONVERSATION PHASES:
- discovery: Learning about user's project and basic needs
- requirements: Gathering detailed specifications
- refinement: Confirming details and filling gaps
- ready-to-build: Requirements are complete enough to start building a Webflow site

Keep responses brief and focused on completing the Webflow design process.`
}

export async function POST(req: Request) {
  try {
    const body: ChatAPIRequest = await req.json()
    const { message, conversationHistory = [], currentRequirements } = body

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 })
    }

    const openai = new OpenAI({ apiKey })

    // Build messages array with system prompt and conversation history
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: buildSystemPrompt(conversationHistory, currentRequirements)
      }
    ]

    // Add recent conversation history
    conversationHistory.slice(-5).forEach(msg => {
      messages.push({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      })
    })

    // Add the current user message
    messages.push({
      role: "user",
      content: message
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "brad_response",
          schema: bradResponseSchema,
          strict: true
        }
      },
      temperature: 0.7,
      max_tokens: 1500
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      throw new Error("No response from OpenAI")
    }

    const structuredResponse: BradStructuredResponse = JSON.parse(responseText)
    
    console.log("Structured response:", structuredResponse)

    return NextResponse.json({ 
      success: true, 
      data: structuredResponse 
    })

  } catch (error) {
    console.error("/api/chat error", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Server error" 
    }, { status: 500 })
  }
}


