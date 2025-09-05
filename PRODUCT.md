# PRODUCT.md

This document serves as the primary source of truth for Brad.ai - defining what the product currently does and the roadmap for future development.

## Product Description

Brad.ai is an AI-powered design interface that simulates a personal AI designer experience. The application provides an interactive chat-based workflow for creating and iterating on web designs with real-time feedback and live previews.

### Current Features

#### Core Chat Interface
- **Real-time messaging**: Interactive chat with Brad AI using OpenAI's GPT-5-nano model
- **Typing indicators**: Visual feedback showing when Brad is processing responses
- **Message history**: Persistent conversation tracking throughout the session
- **File upload**: Support for uploading files via paperclip attachment button

#### AI Integration
- **OpenAI API integration**: Backend API route (`/api/chat`) that processes user messages
- **Contextual responses**: Brad provides design assistance and guidance based on user input
- **Low-effort reasoning**: Configured for quick, concise responses optimized for design workflows

#### Build Simulation System
- **Build mode activation**: Toggle between chat and build modes
- **Animated progress indicators**: Visual progress bars simulating design generation
- **Build status updates**: Real-time feedback during simulated build processes

#### Live Preview System
- **Side-by-side preview**: Split-screen interface showing chat and preview panes
- **Website preview toggle**: Ability to show/hide generated design previews
- **Responsive preview**: Mobile-first responsive design preview capabilities

#### Design Mode (Interactive Editing)
- **Click-to-modify**: Interactive element selection within preview pane
- **Element highlighting**: Visual feedback when hovering over editable elements
- **Design prompt input**: Dedicated input for making specific design modifications
- **Element selection state**: Track and manage selected elements for editing

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
- **Conversation state tracking**: System tracks conversation phases (discovery, requirements, refinement, ready-to-build) and completion percentage
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

## Product Roadmap

### High Priority - Conversational Agent Core

- [x] **Smart Questioning & Quick Reply System**
  - [x] Implement OpenAI's structured response framework
  - [x] Natural question flow with Brad asking questions in conversational responses
  - [x] Generate contextual smart reply options to help users respond quickly
  - [x] Reply categorization with visual indicators (direct-answer, elaboration, alternative, clarification)
  - [x] Context-aware suggestions based on current conversation state
  - [x] Progressive disclosure and conversation state tracking

- [ ] **Agent Spec Management**
  - [ ] Tool-based spec reading and writing system
  - [ ] Internal todo/checklist management for the agent
  - [ ] Spec validation and completeness checking
  - [ ] Progress tracking of requirements gathering

- [ ] **Build Readiness Detection**
  - [ ] Analyze spec completeness to determine when ready to build
  - [ ] Proactively suggest moving to build phase when appropriate
  - [ ] Confirmation workflow before transitioning to code generation

### Medium Priority - Visual Design Tools

- [ ] **Color System**
  - [ ] Color preview functionality in chat messages
  - [ ] Interactive color picker component
  - [ ] AI-generated color palette suggestions
  - [ ] Color harmony and accessibility checking

- [ ] **Enhanced Messaging**
  - [ ] Code block rendering with syntax highlighting
  - [ ] Rich message formatting for design specs
  - [ ] Message threading for complex requirements

### Lower Priority - Code Generation

- [ ] **Spec-to-Code Generation**
  - [ ] Generate functional code based on completed user spec
  - [ ] Live preview updates with generated code
  - [ ] Code export functionality
  - [ ] Basic framework support (React focus initially)

- [ ] **Preview Enhancements**
  - [ ] Real-time code preview updates
  - [ ] Mobile responsive preview modes
  - [ ] Basic interaction simulation

### Future Considerations

- [ ] **Advanced AI Integration**
  - [ ] Image reference analysis for design inspiration
  - [ ] Multi-modal responses (text + visual mockups)
  - [ ] Style transfer capabilities

- [ ] **Collaboration**
  - [ ] Spec sharing and collaboration
  - [ ] Version control for design specifications
  - [ ] Export to common design tools

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
