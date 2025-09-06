# Brad.ai

> **Webflow Take-Home Test** - Chat-based interface for website creation using OpenAI

## Overview

Brad.ai is a conversational interface for creating websites through chat. Users describe their needs to an AI assistant named Brad, who asks clarifying questions and generates HTML websites based on the gathered requirements.

This project was built as a take-home test for Webflow.

## Features

- **Chat Interface** - Real-time messaging with typing indicators and message history
- **Requirements Gathering** - AI asks questions and structures design specifications through conversation
- **Quick Replies** - Generated response options to speed up user interaction
- **Website Generation** - Creates complete HTML websites using OpenAI models
- **Live Preview** - Side-by-side chat and preview interface with generated websites
- **Memory System** - Maintains conversation context and project details

## Technical Implementation

### Stack
- Next.js 15 with TypeScript and React 19
- Tailwind CSS v4 with shadcn/ui components
- OpenAI API for chat and HTML generation
- Custom React hooks for state management

### AI Integration
The application uses OpenAI's structured output capabilities to:
- Gather and organize design requirements through conversation
- Generate contextual quick reply options
- Determine when enough information has been collected to build a website
- Create responsive HTML websites

The chat system tracks conversation state and requirements completion, automatically transitioning from discovery to website generation when ready.

## Running Locally

Create `.env.local` with `OPENAI_API_KEY=xxx` then:

```bash
npm install
npm run dev
```

## Key Files

- `PRODUCT.md` - Product spec and roadmap (used for spec-driven development)
- `components/brad-interface.tsx` - Main interface
- `app/api/chat/route.ts` - OpenAI chat integration
- `app/api/generate-html/route.ts` - Website generation
- `types/chat.ts` - AI response schemas