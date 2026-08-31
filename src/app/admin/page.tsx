// src/app/admin/page.tsx
// Dashboard overview — async Server Component connected to the local JSON DB

export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';

// ── Types ─────────────────────────────────────────────────────────────────────

type Booking = {
  id: string;
  userId?: string | null;
  clientName?: string | null;
  phone?: string | null;
  message?: string | null;
  eventType: string;
  date?: string | null;
  guests?: string | null;
  budget?: string | null;
  status: string;
  createdAt: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  Pending:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
};

/** Format a date string for display; returns '—' on empty/invalid */
function formatDate(raw?: string | null): string {
  if (!raw) return '—';
  try {
    return new Date(raw).toLocaleDateString('en-SA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return raw;
  }
}

// ── Static counts (no DB model exists for these yet) ──────────────────────────
// Services page has 5 hardcoded services; gallery page has 9 hardcoded images.
const STATIC_SERVICES_COUNT = 5;
const STATIC_GALLERY_COUNT = 9;

// ── Page (async Server Component) ─────────────────────────────────────────────

export default async function AdminDashboardPage() {
  // ── Fetch all bookings from the JSON file DB ──────────────────────────────
  let allBookings: Booking[] = [];
  try {
    allBookings = await db.booking.findMany();
  } catch {
    // DB file may not exist on first run — treat as empty
    allBookings = [];
  }

  // ── Derive statistics ─────────────────────────────────────────────────────
  const totalBookings = allBookings.length;

  // Revenue: sum numeric budget strings (e.g. "5000", "5,000 SAR", "5000 ريال")
  const totalRevenueSAR = allBookings.reduce((acc, b) => {
    if (!b.budget) return acc;
    const numeric = parseFloat(b.budget.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(numeric) ? 0 : numeric);
  }, 0);

  const confirmedCount = allBookings.filter((b) => b.status === 'Confirmed').length;
  const pendingCount   = allBookings.filter((b) => b.status === 'Pending').length;

  // ── Five most recent bookings (already sorted desc by db.booking.findMany) ─
  const recentBookings = allBookings.slice(0, 5);

  // ── Stat cards config ─────────────────────────────────────────────────────
  const STAT_CARDS = [
    {
      id: 'stat-bookings',
      label: 'Total Bookings',
      value: totalBookings > 0 ? String(totalBookings) : '0',
      sub: `${pendingCount} pending · ${confirmedCount} confirmed`,
      color: 'from-amber-500/20 to-yellow-600/10',
      border: 'border-amber-500/20',
      dot: 'bg-amber-400',
    },
    {
      id: 'stat-revenue',
      label: 'Total Revenue (SAR)',
      value: totalRevenueSAR > 0
        ? totalRevenueSAR.toLocaleString('en-SA')
        : '—',
      sub: totalRevenueSAR > 0 ? 'From confirmed budgets' : 'No budget data yet',
      color: 'from-emerald-500/20 to-teal-600/10',
      border: 'border-emerald-500/20',
      dot: 'bg-emerald-400',
    },
    {
      id: 'stat-services',
      label: 'Active Services',
      value: String(STATIC_SERVICES_COUNT),
      sub: 'Static — manage in Services page',
      color: 'from-sky-500/20 to-blue-600/10',
      border: 'border-sky-500/20',
      dot: 'bg-sky-400',
    },
    {
      id: 'stat-gallery',
      label: 'Gallery Items',
      value: String(STATIC_GALLERY_COUNT),
      sub: 'Static — manage in Gallery page',
      color: 'from-violet-500/20 to-purple-600/10',
      border: 'border-violet-500/20',
      dot: 'bg-violet-400',
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* ── Welcome banner ── */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20
        bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent p-6">
        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-widest text-amber-400/70 uppercase mb-1">
            Welcome back
          </p>
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">
            {totalBookings > 0
              ? `You have ${totalBookings} booking${totalBookings !== 1 ? 's' : ''} — ${pendingCount} awaiting review.`
              : 'No bookings yet. Data will appear here as clients submit requests.'}
          </p>
        </div>
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full
          bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* ── Stat cards ── */}
      <section>
        <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
          Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className={`
                relative overflow-hidden rounded-2xl border ${card.border}
                bg-gradient-to-br ${card.color}
                p-5 backdrop-blur-sm
                transition-transform duration-200 hover:-translate-y-0.5
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">{card.label}</span>
                <span className={`w-2 h-2 rounded-full ${card.dot} animate-pulse`} />
              </div>
              <p className="text-3xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-slate-500 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent bookings table ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Recent Bookings
          </h3>
          <span className="text-xs text-emerald-400/80 border border-emerald-500/25 rounded-full px-3 py-0.5">
            Live · {totalBookings} total
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-[#0f1117]">
          {recentBookings.length === 0 ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.07]
                flex items-center justify-center text-slate-600 text-2xl select-none">
                📋
              </div>
              <p className="text-sm font-medium text-slate-400">No bookings yet</p>
              <p className="text-xs text-slate-600 max-w-xs">
                Once clients submit booking requests, they will appear here in real time.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.07] text-xs text-slate-500 uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">#</th>
                  <th className="text-left px-5 py-3 font-medium">Client · الاسم</th>
                  <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Phone · رقم الجوال</th>
                  <th className="text-left px-5 py-3 font-medium">Event Type</th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Budget</th>
                  <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Date</th>
                  <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Submitted</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentBookings.map((booking, idx) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-white/[0.02] transition-colors duration-150"
                  >
                    <td className="px-5 py-4 text-slate-500 tabular-nums">{idx + 1}</td>
                    {/* Client name */}
                    <td className="px-5 py-4">
                      <span className="text-slate-200 font-medium">
                        {booking.clientName || '—'}
                      </span>
                    </td>
                    {/* Phone — WhatsApp click-to-chat */}
                    <td className="px-5 py-4 hidden sm:table-cell">
                      {booking.phone ? (() => {
                        const cleanPhone = booking.phone!.replace(/\D/g, '');
                        const waMsg = encodeURIComponent(
                          `مرحباً بك ${booking.clientName || 'عزيزي العميل'}، تواصلنا معك بخصوص طلب حجز (${booking.eventType || 'مناسبة'}) من منصة لمسة إيفنس. كيف يمكننا خدمتك؟`
                        );
                        return (
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${waMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="فتح محادثة واتساب"
                            className="group/wa inline-flex items-center gap-1.5 text-slate-400 hover:text-[#25D366] transition-colors duration-200 tabular-nums text-xs font-mono"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3.5 h-3.5 shrink-0 fill-slate-500 group-hover/wa:fill-[#25D366] transition-colors duration-200"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.828L.057 23.5a.5.5 0 0 0 .612.612l5.684-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.893 9.893 0 0 1-5.03-1.375l-.36-.214-3.733.96.987-3.617-.235-.372A9.861 9.861 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z"/>
                            </svg>
                            {booking.phone}
                          </a>
                        );
                      })() : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    {/* Event type + notes snippet */}
                    <td className="px-5 py-4 max-w-[180px]">
                      <span className="text-slate-300 font-medium">
                        {booking.eventType || '—'}
                      </span>
                      {booking.message && (
                        <p
                          className="text-[11px] text-slate-500 mt-0.5 leading-snug truncate"
                          title={booking.message}
                        >
                          {booking.message}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-400 hidden md:table-cell">
                      {booking.budget || '—'}
                    </td>
                    <td className="px-5 py-4 text-slate-400 hidden lg:table-cell tabular-nums">
                      {formatDate(booking.date)}
                    </td>
                    <td className="px-5 py-4 text-slate-500 hidden lg:table-cell text-xs tabular-nums">
                      {formatDate(booking.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`
                          inline-block text-[11px] font-semibold tracking-wide
                          border rounded-full px-2.5 py-0.5
                          ${STATUS_COLORS[booking.status] ?? 'bg-slate-500/15 text-slate-400 border-slate-500/30'}
                        `}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {totalBookings > 5 && (
          <p className="text-xs text-slate-600 mt-2 text-right">
            Showing 5 of {totalBookings} bookings.{' '}
            <a href="/admin/bookings" className="text-amber-400/70 hover:text-amber-400 transition-colors">
              View all →
            </a>
          </p>
        )}
      </section>

      {/* ── Quick-action cards ── */}
      <section>
        <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'qa-booking', label: 'View All Bookings', href: '/admin/bookings' },
            { id: 'qa-service', label: 'Manage Services',   href: '/admin/services' },
            { id: 'qa-gallery', label: 'Gallery',           href: '/admin/gallery'  },
          ].map((action) => (
            <a
              key={action.id}
              id={action.id}
              href={action.href}
              className="
                flex items-center justify-center gap-2 rounded-2xl
                border border-white/[0.08] bg-white/[0.03]
                hover:bg-white/[0.06] hover:border-amber-500/30
                text-sm font-medium text-slate-400 hover:text-amber-400
                py-4 transition-all duration-200
              "
            >
              <span className="text-base">→</span>
              {action.label}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
