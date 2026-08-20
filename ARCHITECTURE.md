# ARCHITECTURE

## System Overview
NEXORA EVENTS is a modern web application built using the Next.js App Router paradigm. It uses React Server Components (RSC) heavily for performance and SEO, and Client Components for interactivity.

## Tech Stack
- **Frontend Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI primitives)
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** NextAuth.js (or Supabase Auth)
- **Forms & Validation:** React Hook Form + Zod

## Directory Structure (Next.js App Router)
```text
src/
├── app/                  # Route handlers, Pages, Layouts
│   ├── (public)/         # Website public pages
│   ├── (auth)/           # Login, Register
│   ├── (dashboard)/      # Customer Dashboard routes
│   ├── (admin)/          # Admin Dashboard routes
│   └── api/              # API Route Handlers
├── components/           # Reusable React components
│   ├── ui/               # Shadcn UI base components
│   ├── shared/           # Shared app components (Navbar, Footer, etc.)
│   └── forms/            # Form components
├── lib/                  # Utility functions, database clients, AI layer
├── types/                # TypeScript type definitions
└── hooks/                # Custom React hooks
```

## Key Abstractions
1. **AI Abstraction Layer:** `src/lib/ai/` handles interaction with the AI models, ensuring no hard-coupling to a single provider.
2. **Data Access Layer:** All database queries are abstracted through Prisma services to prevent direct DB calls inside UI components.
3. **Auth Layer:** Middleware protects routes based on user roles (`ADMIN`, `STAFF`, `CUSTOMER`).
