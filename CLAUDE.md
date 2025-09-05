# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "Brad.ai" - an AI design interface that simulates a personal AI designer. The project uses React 19, TypeScript, and Tailwind CSS v4, built as part of v0.app explorations for AI-powered design workflows.

**📋 IMPORTANT**: See `PRODUCT.md` for the complete product description and roadmap. This is the primary source of truth for what the application currently does and planned future features.

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
- `app/api/`: API routes for backend functionality
- `hooks/`: Custom React hooks for shared logic

### State Management

The application uses React hooks for state management:
- Message history with real-time typing indicators
- Build progress simulation
- Design mode for interactive element editing
- Project memory system for contextual responses
- Quick reply suggestions

## Development Commands

```bash
# Lint code
npm run lint

# Build the application
npm run build
```

Note: Don't start the development server, the user has already done this

## Development Workflow

### Feature Implementation Process

When implementing new features:

1. **Planning Phase**: First update `PRODUCT.md` roadmap with detailed specifications
2. **Review Process**: Allow user to review and approve the updated roadmap
3. **Implementation**: Build the feature according to the approved specifications
4. **Documentation Update**: Update both `PRODUCT.md` Product Description and roadmap sections upon completion

### Key Features

Refer to `PRODUCT.md` for the complete list of current features and detailed descriptions.

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
