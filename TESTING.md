# TESTING

## Objective
Ensure the platform is reliable, robust, and free of regressions before deployment.

## 1. Static Analysis
- **TypeScript:** Strict type-checking ensures data integrity and catches errors at compile time (`npm run build`).
- **ESLint & Prettier:** Enforces code style and catches common JavaScript/React anti-patterns.

## 2. Unit & Integration Testing
- **Framework:** Jest + React Testing Library (if required).
- **Focus Areas:**
  - Utility functions (e.g., date formatting, currency calculation).
  - UI Components (rendering, state changes).
  - Form validations (testing Zod schemas with various inputs).

## 3. End-to-End (E2E) Testing
- **Framework:** Playwright or Cypress.
- **Critical Paths to Test:**
  - User Registration & Login flow.
  - Submitting an AI Event Planner request.
  - Completing a Booking form.
  - Admin approving a quote.

## 4. Manual QA Checklist
- **Responsive Layout:** Check at 320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, 1920px.
- **RTL Integrity:** Verify no horizontal overflow, correct padding/margin inversion, and proper font rendering.
- **Performance:** Lighthouse score optimization (Target > 90 for Performance, Accessibility, Best Practices, SEO).
