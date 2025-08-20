# Mum's Space Official Website

## Overview

This is a React-based promotional website for Mum's Space, a women-only community app. The website is built with a modern full-stack architecture using React frontend and Express backend, designed to provide information about the app and facilitate downloads across multiple platforms (iPhone, Android, PC).

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 2025)

### Pre-Launch Production Optimizations
- **SEO Enhancement**: Added comprehensive meta tags, Open Graph, Twitter Cards, structured data (JSON-LD)
- **Security**: Implemented rate limiting for newsletter endpoint (3 requests per 15 minutes)
- **Accessibility**: Added ARIA labels and test-ids to all interactive elements
- **Performance**: Optimized image loading, added robots.txt and sitemap.xml
- **Error Handling**: Created error boundary component for graceful error recovery
- **Build Verification**: Confirmed production build generates correctly (449KB JS, 69KB CSS)

### Founders Program Launch
- **New Section**: Added Founders Club with $59.99 AUD lifetime membership
- **Limited Spots**: 100 founding members with exclusive benefits and Wall of Founders
- **Social Integration**: Facebook follow button, Instagram placeholder removed per user request

### Data Collection Clarification
- **Privacy Policy**: Updated to reflect minimal data collection (names/usernames only via Google auth)
- **User Rights**: Added account deletion options through profile page or support contact

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom color scheme based on soft pink theme (#f6cbcd)
- **UI Components**: Radix UI with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL session store (connect-pg-simple)

### Design System
- **Typography**: Bodoni Moda Google Font
- **Color Scheme**: Soft pink theme with muted tones
- **Component Library**: Custom shadcn/ui components with Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Key Components

### Frontend Components
- **Navigation**: Sticky navigation with mobile hamburger menu
- **HeartBackground**: Decorative heart elements with low opacity
- **Footer**: Site-wide footer with navigation links
- **Home Page**: Single-page application with sections for home, download, about, contact, and policies
- **Form Components**: Contact form with validation and toast notifications

### Backend Components
- **Server**: Express application with middleware for JSON parsing and logging
- **Routes**: Modular route registration system (currently minimal)
- **Storage**: Abstract storage interface with in-memory implementation (designed for PostgreSQL upgrade)
- **Vite Integration**: Development server integration with HMR support

### Database Schema
- **Users Table**: Basic user structure with username/password (foundation for future features)
- **Schema Validation**: Drizzle-Zod integration for type-safe database operations

## Data Flow

1. **Client-Side Routing**: Wouter handles navigation without page refreshes
2. **Form Submission**: React Hook Form → Zod validation → Toast notifications
3. **API Communication**: TanStack Query for server communication (prepared for future endpoints)
4. **Database Operations**: Drizzle ORM → PostgreSQL via Neon serverless connection
5. **Asset Serving**: Vite handles static assets and module bundling

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **Database**: Drizzle ORM, Neon Database serverless connector
- **UI/UX**: Radix UI primitives, Lucide React icons
- **Development**: Vite, TypeScript, PostCSS, Autoprefixer

### Styling and Components
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible components
- **class-variance-authority**: Component variant management
- **clsx/tailwind-merge**: Conditional CSS class handling

### Validation and Forms
- **Zod**: Schema validation
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Zod integration with React Hook Form

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations generated to `./migrations`

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection
- **Development**: Hot module replacement via Vite dev server
- **Production**: Express serves static assets and API routes

### Replit Integration
- **Development Banner**: Automatic Replit branding in development mode
- **Runtime Error Overlay**: Development error handling
- **Cartographer Plugin**: Replit-specific development tools

### Scripts
- `dev`: Development server with tsx and Vite HMR
- `build`: Production build (Vite + esbuild)
- `start`: Production server
- `db:push`: Apply database schema changes via Drizzle

The architecture is designed for easy scaling, with clear separation between presentation and data layers, and preparation for future features like user authentication and community management.