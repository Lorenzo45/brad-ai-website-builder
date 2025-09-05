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

#### Smart Reply System
- **Quick reply suggestions**: Contextual reply options based on current conversation
- **Dynamic suggestions**: Adaptive quick replies that change based on conversation flow
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

### Immediate Priority (Next Sprint)

- [ ] **Enhanced Message Types**
  - [ ] Add support for code block rendering in messages
  - [ ] Implement image message support for design assets
  - [ ] Add message reactions/feedback system

- [ ] **Improved File Handling**
  - [ ] Support multiple file formats (images, design files, etc.)
  - [ ] File preview within chat interface
  - [ ] Drag-and-drop file upload functionality

### Short Term (1-2 Sprints)

- [ ] **Advanced Design Mode**
  - [ ] Real-time design editing with instant preview updates
  - [ ] Color picker integration for element styling
  - [ ] Typography adjustment tools
  - [ ] Layout modification capabilities (margin, padding, positioning)

- [ ] **Build System Enhancement**
  - [ ] Actual code generation from design specifications
  - [ ] Export functionality for generated code
  - [ ] Integration with popular frameworks (React, Vue, etc.)
  - [ ] Build error handling and debugging tools

- [ ] **Memory System Expansion**
  - [ ] Persistent memory across browser sessions
  - [ ] Project-specific memory contexts
  - [ ] Memory search and retrieval functionality
  - [ ] Memory visualization in chat interface

### Medium Term (3-5 Sprints)

- [ ] **Multi-Project Support**
  - [ ] Project creation and management interface
  - [ ] Project switching capabilities
  - [ ] Project-specific chat histories
  - [ ] Project templates and starter kits

- [ ] **Collaboration Features**
  - [ ] Real-time collaboration on designs
  - [ ] Comment system for design feedback
  - [ ] Version control for design iterations
  - [ ] Share links for design previews

- [ ] **Advanced AI Capabilities**
  - [ ] Image recognition for design reference uploads
  - [ ] Voice input for design requests
  - [ ] Multi-modal AI responses (text + images + code)
  - [ ] Style transfer from reference images

### Long Term (6+ Sprints)

- [ ] **Design System Integration**
  - [ ] Custom design system creation
  - [ ] Component library management
  - [ ] Brand guideline enforcement
  - [ ] Design token management

- [ ] **Advanced Export Options**
  - [ ] Figma plugin integration
  - [ ] Adobe XD export
  - [ ] Production-ready code export
  - [ ] Multiple framework support (React, Vue, Angular, Svelte)

- [ ] **Enterprise Features**
  - [ ] Team workspace management
  - [ ] Advanced permission controls
  - [ ] Audit logs and analytics
  - [ ] Custom AI model training

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
