// src/app/admin/services/page.tsx
// Coming Soon — Services Management placeholder

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services | Lamsa Admin" };

// ── Hardcoded service catalogue (matches the public services page) ─────────────

const STATIC_SERVICES = [
  {
    id: "weddings",
    name: "كوش الأفراح",
    subtitle: "Luxury Wedding Stages",
    price: "from 5,000 SAR",
    dot: "bg-rose-400",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  },
  {
    id: "dining",
    name: "طاولات عشاء وضيافة",
    subtitle: "VIP Dining & Hospitality",
    price: "from 150 SAR / table",
    dot: "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  {
    id: "vip-seating",
    name: "جلوس ملكي و VIP",
    subtitle: "Royal & VIP Seating",
    price: "On Request",
    dot: "bg-purple-400",
    badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  },
  {
    id: "av-systems",
    name: "أنظمة صوت وإضاءة",
    subtitle: "Advanced AV Systems",
    price: "from 1,000 SAR",
    dot: "bg-sky-400",
    badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  {
    id: "ai-design",
    name: "تصميم بالذكاء الاصطناعي",
    subtitle: "AI-Powered Event Design",
    price: "Free for clients",
    dot: "bg-[#D4AF37]",
    badge: "bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30",
  },
];

export default function AdminServicesPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* ── Page header ── */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-500/20
        bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-transparent p-6">
        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-widest text-sky-400/70 uppercase mb-1">
            Service Catalogue
          </p>
          <h2 className="text-2xl font-bold text-white">Services Management</h2>
          <p className="text-sm text-slate-400 mt-1">
            Showing {STATIC_SERVICES.length} static services · Full CMS editor coming soon.
          </p>
        </div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* ── Coming Soon Banner ── */}
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] py-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20
          flex items-center justify-center text-4xl select-none">
          ⚙️
        </div>
        <div>
          <p className="text-lg font-bold text-white">Services CMS — Coming Soon</p>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
            The full service editor (add, edit, delete, reorder) is under development.
            Below you can preview the current static catalogue.
          </p>
        </div>
        <span className="text-xs text-sky-400/70 border border-sky-500/20 rounded-full px-4 py-1">
          Read-Only Preview
        </span>
      </div>

      {/* ── Static catalogue preview table ── */}
      <section>
        <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
          Current Catalogue
        </h3>
        <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-[#0f1117]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">#</th>
                <th className="text-left px-5 py-3 font-medium">Service (AR)</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Subtitle (EN)</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Starting Price</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium text-slate-700">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {STATIC_SERVICES.map((svc, i) => (
                <tr key={svc.id} className="hover:bg-white/[0.02] transition-colors duration-150">
                  <td className="px-5 py-4 text-slate-500 text-xs tabular-nums">{i + 1}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${svc.dot} shrink-0`} />
                      <span className="text-slate-200 font-medium">{svc.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-400 hidden md:table-cell">{svc.subtitle}</td>
                  <td className="px-5 py-4 text-slate-400 hidden sm:table-cell">{svc.price}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block text-[11px] font-semibold tracking-wide border rounded-full px-2.5 py-0.5 ${svc.badge}`}>
                      Active
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      disabled
                      title="Coming soon"
                      className="text-[11px] font-semibold px-3 py-1 rounded-lg border
                        border-white/[0.08] text-slate-700 bg-white/[0.03]
                        cursor-not-allowed opacity-50"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
