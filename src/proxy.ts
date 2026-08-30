import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'lamsa_admin_session';
const ADMIN_LOGIN_PATH = '/admin/login';

/**
 * Verifies the HMAC-SHA256 signed session cookie that was issued
 * by POST /api/admin/login. No external dependencies — pure Web Crypto.
 */
async function isValidSession(token: string): Promise<boolean> {
  try {
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;
    if (!sessionSecret) return false;

    const [payloadB64, signatureB64] = token.split('.');
    if (!payloadB64 || !signatureB64) return false;

    const encoder = new TextEncoder();
    const payload = Buffer.from(payloadB64, 'base64url').toString('utf8');

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(sessionSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signatureBytes = Buffer.from(signatureB64, 'base64url');

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(payload)
    );

    if (!valid) return false;

    // Optional: check token age (8 hours)
    const { iat } = JSON.parse(payload) as { iat: number };
    const eightHoursMs = 8 * 60 * 60 * 1000;
    if (Date.now() - iat > eightHoursMs) return false;

    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard the /admin subtree; let /admin/login through
  if (!pathname.startsWith('/admin') || pathname.startsWith(ADMIN_LOGIN_PATH)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (token && (await isValidSession(token))) {
    // Valid session — let the request through
    return NextResponse.next();
  }

  // No valid session — redirect to admin login
  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
  loginUrl.searchParams.set('from', pathname); // preserve intended destination
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
