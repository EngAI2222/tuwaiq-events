'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// ── Inline SVG icons (zero extra deps) ────────────────────────────────────
function IconLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}
function IconEye({ off }: { off?: boolean }) {
  return off ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ── Inner form (uses useSearchParams — must be inside Suspense) ────────────
function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') ?? '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(from);
        router.refresh();
      } else {
        setError(data.message ?? 'Login failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        space-y-5 transition-all duration-700 ease-out
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="admin-email" className="block text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Email Address
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="admin@lamsa-events.com"
          dir="ltr"
          className="
            w-full rounded-xl border border-white/[0.08] bg-white/[0.04]
            px-4 py-3 text-sm text-white placeholder-slate-600
            outline-none ring-0
            focus:border-amber-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-500/20
            transition-all duration-200
          "
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="admin-password" className="block text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="••••••••••••"
            dir="ltr"
            className="
              w-full rounded-xl border border-white/[0.08] bg-white/[0.04]
              px-4 py-3 pr-11 text-sm text-white placeholder-slate-600
              outline-none ring-0
              focus:border-amber-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-amber-500/20
              transition-all duration-200
            "
          />
          <button
            type="button"
            id="toggle-password-visibility"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <IconEye off={showPassword} />
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        id="admin-login-submit"
        type="submit"
        disabled={isLoading}
        className="
          relative w-full overflow-hidden rounded-xl
          bg-gradient-to-r from-amber-500 to-yellow-500
          py-3.5 text-sm font-bold text-[#0f1117] tracking-wide
          shadow-lg shadow-amber-500/25
          hover:shadow-amber-500/40 hover:from-amber-400 hover:to-yellow-400
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200
          flex items-center justify-center gap-2
        "
      >
        {isLoading ? (
          <>
            <span className="animate-spin"><IconSpinner /></span>
            Authenticating…
          </>
        ) : (
          'Sign in to Admin Panel'
        )}
      </button>
    </form>
  );
}

// ── Page shell ─────────────────────────────────────────────────────────────
export default function AdminLoginPage() {
  return (
    <div
      dir="ltr"
      className="min-h-screen bg-[#080a0f] flex items-center justify-center p-4 font-sans"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-yellow-600/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-800/5 blur-[100px]" />
      </div>

      {/* Card */}
      <div className="
        relative w-full max-w-md
        rounded-3xl border border-white/[0.07]
        bg-[#0f1117]/90 backdrop-blur-xl
        shadow-2xl shadow-black/60 p-8
      ">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="
            mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl
            bg-gradient-to-br from-amber-400 to-yellow-600
            text-[#0f1117] shadow-lg shadow-amber-500/30
          ">
            <IconLogo />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-slate-500">Lamsa Evens · Secure Access</p>

          {/* Decorative divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[10px] tracking-[0.2em] text-slate-600 uppercase">authenticate</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Form (wrapped in Suspense for useSearchParams) */}
        <Suspense fallback={<div className="h-52 animate-pulse rounded-xl bg-white/[0.03]" />}>
          <AdminLoginForm />
        </Suspense>

        {/* Footer note */}
        <p className="mt-6 text-center text-[11px] text-slate-600">
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}
