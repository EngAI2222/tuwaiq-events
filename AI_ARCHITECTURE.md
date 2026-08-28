# AI ARCHITECTURE

## Objective
To provide an abstracted, flexible AI layer that powers the "AI Event Planner" and "AI Chatbot" features without hard-coupling the application to a single provider (like OpenAI or Gemini).

## Core Design Principles
1. **Abstraction:** All AI calls go through a unified interface (`src/lib/ai/provider.ts`).
2. **Security:** API keys are strictly Server-Side. The client only communicates with our Next.js Route Handlers (`/api/ai/plan` and `/api/ai/chat`).
3. **Structured Output:** The AI Event Planner must return structured JSON (using Zod schemas or function calling) so the frontend can reliably render the proposed plan.

## The Abstraction Layer

```typescript
// Example interface definition
export interface AIProvider {
  generatePlan(prompt: string, context: EventContext): Promise<EventPlan>;
  chatResponse(history: Message[], currentMessage: string): Promise<string>;
}

// Implementations
export class GeminiProvider implements AIProvider { ... }
export class OpenAIProvider implements AIProvider { ... }
```

## Features

### 1. AI Event Planner
- **Input:** User fills out a form (Event Type, Date, City, Guests, Budget, Venue, Colors, Theme, Luxury Level, Services).
- **Process:** The frontend sends this data to `/api/ai/plan`. The route handler formats a strict prompt, injects current service data/prices from the DB to prevent hallucinations, and calls the AI provider.
- **Output:** A structured JSON object containing: Theme, Color Palette, Decoration, Lighting, Tables, Seating, Flowers, Hospitality, Services, Package, Budget Estimate, and Timeline.

### 2. AI Chatbot
- **Input:** User chat messages.
- **Process:** The chatbot maintains conversation history. It is injected with system prompts detailing LAMSA EVENTS services and packages.
- **Guardrails:** The AI is instructed NOT to invent prices. It must refer the user to the "Request Quote" form or pull exact numbers from the provided context.
