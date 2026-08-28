# DEPLOYMENT

## Objective
Define the deployment pipeline for LAMSA EVENTS to ensure zero-downtime releases and scalable infrastructure.

## Hosting Platform
- **Frontend & API:** Vercel (Optimized for Next.js App Router, Edge Functions, and Image Optimization).
- **Database:** Supabase (PostgreSQL) hosted in a region close to the primary user base (e.g., Middle East/Europe) for low latency.

## CI/CD Pipeline
1. **Push to Main:** Code is pushed to the `main` branch on GitHub.
2. **Vercel Build:** Vercel automatically triggers a build.
3. **Checks:** 
   - `npm run lint` (ESLint)
   - `tsc --noEmit` (TypeScript check)
   - `npm run build` (Next.js build process)
4. **Deploy:** If checks pass, Vercel deploys the application to the production URL.

## Environment Variables
The following variables must be configured in Vercel before deployment:
- `DATABASE_URL` (Supabase connection string)
- `NEXTAUTH_SECRET` (Generated secure string)
- `NEXTAUTH_URL` (Production URL)
- AI Provider API Keys (e.g., `OPENAI_API_KEY` or `GEMINI_API_KEY`)

## Post-Deployment
- Run database migrations (`npx prisma db push` or `prisma migrate deploy`).
- Verify domain routing and SSL certificates.
- Check live logs for any runtime errors.
