# PRODUCT.md

This document serves as the primary source of truth for Brad.ai - defining what the product currently does and the roadmap for future development.

## Product Description

Brad.ai is an AI-powered design interface that simulates a personal AI designer experience. The application provides an interactive chat-based workflow for creating and iterating on Webflow websites with real-time feedback and live previews.

### Current Features

#### Core Chat Interface
- **Real-time messaging**: Interactive chat with Brad AI using OpenAI's GPT-4o model
- **Typing indicators**: Visual feedback showing when Brad is processing responses
- **Message history**: Persistent conversation tracking throughout the session
- **File upload**: Support for uploading files via paperclip attachment button

#### AI Integration
- **OpenAI API integration**: Backend API route (`/api/chat`) that processes user messages and gathers design requirements
- **HTML Generation API**: Backend route (`/api/generate-html`) that uses GPT-5-nano to generate complete HTML websites
- **Contextual responses**: Brad provides design assistance and guidance based on user input
- **Requirements gathering**: AI collects and structures design requirements through natural conversation

#### Real Website Generation System
- **Build readiness detection**: Automatically detects when enough requirements have been gathered to build a website
- **GPT-5-nano HTML generation**: Uses advanced AI model to create complete, responsive HTML websites
- **Real-time progress tracking**: Visual progress indicators during actual website generation
- **Live HTML preview**: Generated websites are displayed in iframe for immediate preview

#### Live Preview System
- **Side-by-side preview**: Split-screen interface showing chat and generated website preview
- **Generated HTML rendering**: Real websites created by AI displayed via iframe
- **Responsive design**: All generated websites include mobile-first responsive design
- **Empty state handling**: Clear visual feedback when no website has been generated yet

#### Memory System
- **Project memory**: Context-aware responses based on conversation history
- **Memory references**: Special message types that reference previous design decisions
- **Contextual continuity**: Maintains design context across conversation sessions

#### Smart Questioning & Quick Reply System
- **OpenAI structured responses**: Uses OpenAI's gpt-4o-2024-08-06 model with structured output schemas
- **Natural question flow**: Brad asks questions naturally within his conversational responses (one question at a time)
- **Smart reply generation**: AI generates 3-5 contextual reply options to help users respond quickly
- **Reply categorization**: Replies are categorized by type (direct-answer, elaboration, alternative, clarification) with color-coded visual indicators
- **Dynamic suggestions**: Adaptive quick replies that change based on conversation flow and context
- **Contextual suggestions**: Reply options are specific to Brad's questions (e.g., for "What's this website about?": "Myself", "My business", "A group")
- **Conversation state tracking**: System tracks conversation phases (discovery, requirements, confirmation, ready-to-build) and completion percentage
- **One-click responses**: Fast interaction patterns for common design requests

#### UI/UX Features
- **Dark theme**: Modern dark mode interface with custom color scheme
- **Framer Motion animations**: Smooth transitions and micro-interactions
- **shadcn/ui components**: Professional UI component library integration
- **Lucide React icons**: Consistent iconography throughout the interface
- **Geist font family**: Modern typography with Sans and Mono variants

#### Technical Infrastructure
- **Next.js 15 App Router**: Modern React framework with latest features
- **TypeScript**: Full type safety across the application
- **Tailwind CSS v4**: Utility-first styling with latest features
- **React 19**: Latest React features and optimizations
- **Custom hooks architecture**: Reusable logic via `useBradChat` hook

## Design Requirements

The system tracks the following design requirements through conversational interactions to build comprehensive user specifications:

### Core Requirements
- **subject**: The website subject (e.g., company name, personal brand, organization name, or main topic)
- **subjectName**: The specific name or title (e.g., "Acme Corp", "John's Portfolio", "TechStart Blog")
- **purpose**: The primary purpose or goal of the website
- **preferredStyleAndInspiration**: Combined field capturing style preferences, design inspiration, and visual direction

### Content & Functionality
- **colorPreferences**: Array of preferred colors, color schemes, or color-related requirements
- **functionalityNeeds**: Array of required features, functionality, and interactive elements
- **contentTypes**: Array of content types needed (text, images, videos, forms, etc.)

### Technical Approach
- **Universal device support**: All designs support desktop, mobile, and tablet devices by default (no device priorities)
- **Requirements gathering**: Collected through natural conversation flow during discovery and requirements phases
- **Structured tracking**: Requirements stored and tracked via OpenAI's structured response system

These requirements are progressively gathered through Brad's conversational interface and used to inform design decisions and eventual Webflow website generation.

## Product Roadmap

### High Priority - Conversational Agent Core

- **Agent Spec Management**
  - Tool-based spec reading and writing system
  - Internal todo/checklist management for the agent
  - Spec validation and completeness checking
  - Progress tracking of requirements gathering

### Medium Priority - Visual Design Tools

- **Color System**
  - Color preview functionality in chat messages
  - Interactive color picker component
  - AI-generated color palette suggestions
  - Color harmony and accessibility checking

- **Enhanced Messaging**
  - Code block rendering with syntax highlighting
  - Rich message formatting for design specs
  - Message threading for complex requirements

### Lower Priority - Webflow Generation

- **Spec-to-Webflow Generation**
  - Generate Webflow sites based on completed user specifications
  - Live preview updates with generated Webflow designs
  - Webflow export functionality
  - Webflow component library integration

- **Preview Enhancements**
  - Real-time Webflow preview updates
  - Mobile responsive preview modes
  - Basic Webflow interaction simulation

### Future Considerations

- **Advanced AI Integration**
  - Image reference analysis for design inspiration
  - Multi-modal responses (text + visual mockups)
  - Style transfer capabilities

- **Collaboration**
  - Spec sharing and collaboration
  - Version control for design specifications
  - Export to Webflow and other design tools

## Development Workflow

When implementing features from this roadmap:

1. **Feature Planning**: Update the roadmap with detailed specifications before coding
2. **Implementation**: Build the feature according to the specifications
3. **Documentation Update**: Update both Product Description and roadmap upon completion
4. **Review Process**: All new features should be reviewed against this document

## Maintenance Notes

- Keep this document updated with every feature implementation
- Review and adjust roadmap priorities based on user feedback
- Archive completed features to maintain document clarity
