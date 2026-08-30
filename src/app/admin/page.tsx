// src/app/admin/page.tsx
// Dashboard overview — placeholder UI shell (no data/auth yet)

const STAT_CARDS = [
  {
    id: 'stat-bookings',
    label: 'Total Bookings',
    value: '—',
    sub: 'Awaiting data',
    color: 'from-amber-500/20 to-yellow-600/10',
    border: 'border-amber-500/20',
    dot: 'bg-amber-400',
  },
  {
    id: 'stat-revenue',
    label: 'Revenue (SAR)',
    value: '—',
    sub: 'Awaiting data',
    color: 'from-emerald-500/20 to-teal-600/10',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  {
    id: 'stat-services',
    label: 'Active Services',
    value: '—',
    sub: 'Awaiting data',
    color: 'from-sky-500/20 to-blue-600/10',
    border: 'border-sky-500/20',
    dot: 'bg-sky-400',
  },
  {
    id: 'stat-gallery',
    label: 'Gallery Items',
    value: '—',
    sub: 'Awaiting data',
    color: 'from-violet-500/20 to-purple-600/10',
    border: 'border-violet-500/20',
    dot: 'bg-violet-400',
  },
];

const RECENT_ROWS = [
  { id: 1, client: '—', service: '—', date: '—', status: 'Pending' },
  { id: 2, client: '—', service: '—', date: '—', status: 'Confirmed' },
  { id: 3, client: '—', service: '—', date: '—', status: 'Pending' },
];

const STATUS_COLORS: Record<string, string> = {
  Pending:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
};

export default function AdminDashboardPage() {
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
            Manage bookings, services, and gallery from one place.
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
          <span className="text-xs text-amber-400/70 border border-amber-500/20 rounded-full px-3 py-0.5">
            Placeholder data
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-[#0f1117]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">#</th>
                <th className="text-left px-5 py-3 font-medium">Client</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Service</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {RECENT_ROWS.map((row) => (
                <tr key={row.id} className="hover:bg-white/[0.02] transition-colors duration-150">
                  <td className="px-5 py-4 text-slate-500">{row.id}</td>
                  <td className="px-5 py-4 text-slate-300">{row.client}</td>
                  <td className="px-5 py-4 text-slate-400 hidden md:table-cell">{row.service}</td>
                  <td className="px-5 py-4 text-slate-400 hidden sm:table-cell">{row.date}</td>
                  <td className="px-5 py-4">
                    <span className={`
                      inline-block text-[11px] font-semibold tracking-wide
                      border rounded-full px-2.5 py-0.5
                      ${STATUS_COLORS[row.status] ?? ''}
                    `}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Quick-action placeholder cards ── */}
      <section>
        <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'qa-booking', label: 'Add Booking',  href: '/admin/bookings' },
            { id: 'qa-service', label: 'Add Service',  href: '/admin/services' },
            { id: 'qa-gallery', label: 'Upload Photo', href: '/admin/gallery'  },
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
              <span className="text-base">+</span>
              {action.label}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
