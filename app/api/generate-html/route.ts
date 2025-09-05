import { NextResponse } from "next/server"
import OpenAI from "openai"
import type { DesignRequirements } from "@/types/chat"

interface GenerateHTMLRequest {
  designRequirements: DesignRequirements
}

// interface GenerateHTMLResponse {
//   success: boolean
//   html?: string
//   error?: string
// }

function buildHTMLGenerationPrompt(requirements: DesignRequirements): string {
  const requirementsText = JSON.stringify(requirements, null, 2)
  
  return `You are an expert web developer and designer. Generate a complete, modern HTML webpage based on the following design requirements:

${requirementsText}

REQUIREMENTS:
- Generate a complete HTML document with embedded CSS
- Use modern, clean design principles
- Include responsive design (mobile-first approach)
- Use semantic HTML5 elements
- Create an attractive, professional design
- Include appropriate typography, spacing, and colors
- Add subtle animations and hover effects
- Make it production-ready

STRUCTURE:
- Include proper DOCTYPE, html, head, and body tags
- Add appropriate meta tags for responsive design
- Embed all CSS in a <style> tag in the head
- Create a cohesive design that matches the requirements
- Use appropriate sections like header/nav, hero, features, footer etc.

DESIGN GUIDELINES:
- Use a modern color palette that reflects the user's preferences
- Implement clean typography with good hierarchy
- Add proper spacing and visual rhythm
- Include interactive elements where appropriate
- Make it visually appealing and user-friendly
- Ensure accessibility best practices

Return only the complete HTML code without any explanations or markdown formatting.`
}

export async function POST(req: Request) {
  try {
    const body: GenerateHTMLRequest = await req.json()
    const { designRequirements } = body

    if (!designRequirements || typeof designRequirements !== "object") {
      return NextResponse.json({ error: "Invalid design requirements" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 })
    }

    const openai = new OpenAI({ apiKey })

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        {
          role: "system",
          content: "You are an expert web developer and designer who creates beautiful, modern HTML webpages."
        },
        {
          role: "user",
          content: buildHTMLGenerationPrompt(designRequirements)
        }
      ]
    })

    const htmlContent = completion.choices[0]?.message?.content
    if (!htmlContent) {
      throw new Error("No HTML generated from OpenAI")
    }

    // Clean up the response in case it contains markdown formatting
    const cleanHTML = htmlContent
      .replace(/```html\n/g, '')
      .replace(/```/g, '')
      .trim()

    console.log("Generated HTML length:", cleanHTML.length)

    return NextResponse.json({ 
      success: true, 
      html: cleanHTML 
    })

  } catch (error) {
    console.error("/api/generate-html error", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Server error" 
    }, { status: 500 })
  }
}