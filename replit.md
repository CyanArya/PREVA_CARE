# Overview

This is a full-stack web application built with React, TypeScript, and Express.js. The project features a modern frontend using shadcn/ui components with Tailwind CSS, and a backend API with PostgreSQL database integration using Drizzle ORM. The application includes a feature showcase component demonstrating various platform capabilities like analytics, team collaboration, AI automation, security, and integrations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server with hot module replacement
- **wouter** for lightweight client-side routing
- **TanStack Query** for server state management and API data fetching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **React Hook Form** with Zod resolvers for form validation

## Backend Architecture
- **Express.js** server with TypeScript support
- **ESM modules** throughout the application
- **Modular storage interface** with in-memory implementation as default
- **Middleware-based request logging** for API endpoints
- **Static file serving** for production builds

## Data Storage
- **Drizzle ORM** configured for PostgreSQL with type-safe database operations
- **Neon Database** as the PostgreSQL provider
- **Schema-first approach** with shared types between client and server
- **Database migrations** managed through Drizzle Kit
- **Fallback in-memory storage** for development without database setup

## Component System
- **Radix UI primitives** for accessible, unstyled components
- **Class Variance Authority** for component variant management
- **Custom design system** with consistent spacing, colors, and typography
- **Responsive design patterns** with mobile-first approach
- **Dark mode support** through CSS custom properties

## Development Workflow
- **TypeScript** with strict type checking across all environments
- **Path aliases** for clean imports (@/, @shared/, @assets/)
- **Development middleware** for error handling and debugging
- **Replit integration** with cartographer plugin for cloud development

# External Dependencies

## Database Services
- **Neon Database** - Serverless PostgreSQL database hosting
- **Drizzle ORM** - Type-safe database toolkit and query builder

## UI and Styling
- **Radix UI** - Unstyled, accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library with consistent design
- **Embla Carousel** - Touch-friendly carousel component

## Development Tools
- **Vite** - Fast build tool with HMR support
- **TypeScript** - Static type checking
- **ESBuild** - Fast JavaScript bundler for production
- **PostCSS** with Autoprefixer for CSS processing

## Runtime Libraries
- **TanStack Query** - Server state management
- **React Hook Form** - Form state management
- **date-fns** - Date utility library
- **nanoid** - URL-friendly unique ID generator
- **clsx** and **tailwind-merge** - Conditional CSS class utilities

## Deployment Platform
- **Replit** - Cloud development and hosting platform with integrated tooling