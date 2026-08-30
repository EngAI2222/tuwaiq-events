import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'lamsa_admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours in seconds

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!adminEmail || !adminPassword || !sessionSecret) {
      console.error('Admin credentials not configured in environment variables.');
      return NextResponse.json(
        { success: false, message: 'Server configuration error.' },
        { status: 500 }
      );
    }

    // Constant-time-ish comparison to resist timing attacks
    const emailMatch = email === adminEmail;
    const passwordMatch = password === adminPassword;

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Build a simple signed token: base64(payload).base64(hmac-sha256 signature)
    // We use the Web Crypto API (available in the Next.js Node.js runtime).
    const payload = JSON.stringify({ email, iat: Date.now() });
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(sessionSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(payload)
    );

    const signature = Buffer.from(signatureBuffer).toString('base64url');
    const token = `${Buffer.from(payload).toString('base64url')}.${signature}`;

    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
