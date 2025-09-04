# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "Brad.ai" - an AI design interface that simulates a personal AI designer. The project uses React 19, TypeScript, and Tailwind CSS v4, built as part of v0.app explorations for AI-powered design workflows.

## Architecture

- **Frontend**: Next.js 15 with TypeScript and React 19
- **UI Framework**: shadcn/ui components with Tailwind CSS v4
- **Animations**: Framer Motion for smooth transitions and interactions
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Mono
- **Theme**: Dark mode UI with custom color scheme

### Key Components

- `components/brad-interface.tsx`: Main interface component containing the entire chat/design experience
- `components/ui/`: shadcn/ui components (Button, Input, etc.)
- `components/theme-provider.tsx`: Theme management
- `app/layout.tsx`: Root layout with font configuration
- `app/page.tsx`: Main page rendering the Brad interface

### State Management

The application uses React hooks for state management:
- Message history with real-time typing indicators
- Build progress simulation
- Design mode for interactive element editing
- Project memory system for contextual responses
- Quick reply suggestions

## Development Commands

```bash
# Development server
pnpm dev

# Build the application
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Key Features

1. **Chat Interface**: Real-time messaging with Brad AI
2. **Build Simulation**: Animated progress indicators for design generation
3. **Live Preview**: Side-by-side preview pane for generated designs
4. **Design Mode**: Interactive element editing with click-to-modify
5. **Memory System**: Context-aware responses based on conversation history
6. **Quick Replies**: Smart reply suggestions based on conversation context

## Configuration Notes

- ESLint and TypeScript errors are ignored during builds (see `next.config.mjs`)
- Images are unoptimized for deployment compatibility
- Uses shadcn/ui "new-york" style variant
- Tailwind CSS v4 with PostCSS configuration

## Design Patterns

- All components use TypeScript with proper type definitions
- Framer Motion used for page transitions and animations
- Custom hook patterns for state management
- Responsive design with mobile-first approach
- Dark theme implementation with custom CSS variables

## Deployment

The project is configured for automatic deployment to Vercel and stays in sync with v0.app changes. The build process ignores TypeScript and ESLint errors to maintain deployment compatibility with the v0.app workflow.