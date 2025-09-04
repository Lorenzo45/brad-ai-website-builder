import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 })
    }

    const openai = new OpenAI({ apiKey })

    const response = await openai.responses.create({
      model: "gpt-5",
      input: message,
      instructions: "You are Brad, a friendly and helpful AI web design assistant. Your job is to assist users in designing websites based on their preferences and needs.",
      reasoning: {
        effort: "low"
      },
      text: {
        verbosity: "low"
      }
    })

    console.log("response", response)

    return NextResponse.json({ text: response.output_text })
  } catch (error) {
    console.error("/api/chat error", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}


