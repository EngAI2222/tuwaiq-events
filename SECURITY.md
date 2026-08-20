# SECURITY

## Objective
Ensure NEXORA EVENTS handles user data, bookings, and payments securely while protecting the infrastructure from common vulnerabilities.

## 1. Authentication & Authorization
- **Authentication:** Handled via NextAuth.js or Supabase Auth. Passwords are never stored in plaintext (bcrypt hashing via provider).
- **Role-Based Access Control (RBAC):** Middleware checks the `role` property (`ADMIN`, `STAFF`, `CUSTOMER`) before granting access to `/admin` or `/dashboard` routes.
- **Session Management:** Secure HttpOnly cookies for session tokens.

## 2. API Security
- **Input Validation:** All incoming data to API routes is strictly validated using `Zod` schemas before processing.
- **Environment Variables:** All secrets (`DATABASE_URL`, `NEXTAUTH_SECRET`, AI Provider API Keys) are stored in server-side `.env.local` files and are never exposed to the client (no `NEXT_PUBLIC_` prefix for secrets).
- **Rate Limiting:** Protect public endpoints (like AI planner and login) from brute force and DoS attacks.

## 3. Data Protection
- **Prepared Statements:** Prisma ORM automatically uses prepared statements to prevent SQL Injection.
- **Cross-Site Scripting (XSS):** React naturally escapes string variables. `dangerouslySetInnerHTML` is avoided unless explicitly required and sanitized.
- **CSRF Protection:** Next.js and NextAuth.js handle CSRF tokens natively for API requests.
