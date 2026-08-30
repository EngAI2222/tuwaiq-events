'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

// ── Icons (inline SVG — no extra deps needed) ──────────────────────────────
function IconDashboard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconBookings() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconServices() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  );
}
function IconGallery() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
function IconChevron() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IconLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ── Nav config ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { href: '/admin',          label: 'Dashboard',  Icon: IconDashboard },
  { href: '/admin/bookings', label: 'Bookings',   Icon: IconBookings  },
  { href: '/admin/services', label: 'Services',   Icon: IconServices  },
  { href: '/admin/gallery',  label: 'Gallery',    Icon: IconGallery   },
] as const;

// ── Sidebar ────────────────────────────────────────────────────────────────
function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <aside
      style={{ width: collapsed ? '72px' : '240px' }}
      className="
        relative flex flex-col h-screen shrink-0 overflow-hidden
        bg-[#0f1117] border-r border-white/[0.06]
        transition-[width] duration-300 ease-in-out
      "
    >
      {/* ── Logo / brand ── */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-white/[0.06] shrink-0">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl
          bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1117] shrink-0 shadow-lg shadow-amber-500/20">
          <IconLogo />
        </span>
        {!collapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-sm font-bold text-white leading-tight">Lamsa Evens</p>
            <p className="text-[10px] text-amber-400/80 tracking-widest uppercase">Admin Panel</p>
          </div>
        )}
      </div>

      {/* ── Nav links ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`
                group relative flex items-center gap-3 rounded-xl px-3 py-2.5
                text-sm font-medium transition-all duration-200
                ${active
                  ? 'bg-amber-500/10 text-amber-400 shadow-sm shadow-amber-500/10'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
                }
              `}
            >
              {/* Active indicator bar */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-amber-400" />
              )}
              <span className={`shrink-0 transition-colors duration-200 ${active ? 'text-amber-400' : 'text-slate-500 group-hover:text-white'}`}>
                <Icon />
              </span>
              {!collapsed && (
                <span className="truncate">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Collapse toggle ── */}
      <button
        id="sidebar-collapse-btn"
        onClick={onToggle}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="
          flex items-center justify-center h-10 w-10 mx-auto mb-4 rounded-xl
          bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]
          text-slate-400 hover:text-white
          transition-all duration-200 shrink-0
        "
      >
        <span
          className="transition-transform duration-300"
          style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <IconChevron />
        </span>
      </button>
    </aside>
  );
}

// ── Top header bar ─────────────────────────────────────────────────────────
function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const pageTitle =
    NAV_ITEMS.find((item) =>
      item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
    )?.label ?? 'Admin';

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-white/[0.06] bg-[#0f1117]/80 backdrop-blur-sm shrink-0">
      <div>
        <h1 className="text-base font-semibold text-white">{pageTitle}</h1>
        <p className="text-xs text-slate-500 mt-0.5">Lamsa Evens · Admin Portal</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 hidden sm:block">Admin</span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600
          flex items-center justify-center text-[#0f1117] text-xs font-bold shadow-md shadow-amber-500/20">
          A
        </div>
        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          disabled={loggingOut}
          title="Sign out"
          className="
            flex items-center justify-center w-8 h-8 rounded-xl
            bg-white/[0.04] hover:bg-red-500/10 border border-white/[0.08] hover:border-red-500/30
            text-slate-500 hover:text-red-400
            transition-all duration-200 disabled:opacity-50
          "
        >
          <IconLogout />
        </button>
      </div>
    </header>
  );
}

// ── Root admin layout ──────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // Force LTR for the admin panel regardless of global RTL setting
    <div dir="ltr" className="flex h-screen bg-[#080a0f] text-white overflow-hidden font-sans">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
