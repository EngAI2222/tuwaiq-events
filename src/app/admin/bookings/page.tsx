// src/app/admin/bookings/page.tsx
// Full bookings management table — async Server Component

export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Bookings | Lamsa Admin" };

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
  Pending:   "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

function fmt(raw?: string | null): string {
  if (!raw) return "—";
  try {
    return new Date(raw).toLocaleDateString("en-SA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminBookingsPage() {
  let bookings: Booking[] = [];
  try {
    bookings = await db.booking.findMany();
  } catch {
    bookings = [];
  }

  const totalCount     = bookings.length;
  const pendingCount   = bookings.filter((b) => b.status === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const cancelledCount = bookings.filter((b) => b.status === "Cancelled").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* ── Page header ── */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20
        bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent p-6">
        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-widest text-amber-400/70 uppercase mb-1">
            Data Management
          </p>
          <h2 className="text-2xl font-bold text-white">All Bookings</h2>
          <p className="text-sm text-slate-400 mt-1">
            {totalCount > 0
              ? `${totalCount} booking${totalCount !== 1 ? "s" : ""} · ${pendingCount} pending · ${confirmedCount} confirmed · ${cancelledCount} cancelled`
              : "No bookings have been submitted yet."}
          </p>
        </div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* ── Summary pills ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total",     value: totalCount,     col: "border-slate-500/20   bg-slate-500/10  text-slate-300" },
          { label: "Pending",   value: pendingCount,   col: "border-amber-500/20   bg-amber-500/10  text-amber-400" },
          { label: "Confirmed", value: confirmedCount, col: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
          { label: "Cancelled", value: cancelledCount, col: "border-red-500/20     bg-red-500/10    text-red-400" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border ${s.col} px-5 py-4 text-center backdrop-blur-sm`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Booking Records
          </h3>
          <span className="text-xs text-emerald-400/80 border border-emerald-500/25 rounded-full px-3 py-0.5">
            Live · {totalCount} records
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-[#0f1117]">
          {bookings.length === 0 ? (

            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center gap-3 py-8 sm:py-12 md:py-24 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07]
                flex items-center justify-center text-3xl select-none">
                📋
              </div>
              <p className="text-sm font-medium text-slate-400">No bookings yet</p>
              <p className="text-xs text-slate-600 max-w-xs">
                Client booking requests will appear here as soon as they are submitted through the website.
              </p>
            </div>

          ) : (

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[920px]">
                <thead>
                  <tr className="border-b border-white/[0.07] text-xs text-slate-500 uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">#</th>
                    <th className="text-left px-5 py-3 font-medium">Client · الاسم</th>
                    <th className="text-left px-5 py-3 font-medium">Phone · رقم الجوال</th>
                    <th className="text-left px-5 py-3 font-medium">Event Type</th>
                    <th className="text-left px-5 py-3 font-medium">Event Date</th>
                    <th className="text-left px-5 py-3 font-medium">Guests</th>
                    <th className="text-left px-5 py-3 font-medium">Budget</th>
                    <th className="text-left px-5 py-3 font-medium">Submitted</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-left px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {bookings.map((booking, idx) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-white/[0.02] transition-colors duration-150 group"
                    >
                      {/* # */}
                      <td className="px-5 py-4 text-slate-500 tabular-nums text-xs">
                        {idx + 1}
                      </td>
                      {/* Client name */}
                      <td className="px-5 py-4">
                        <span className="text-slate-200 font-medium">
                          {booking.clientName || "—"}
                        </span>
                        {booking.userId && (
                          <span className="block text-[10px] text-slate-600 mt-0.5 font-mono">
                            uid: {booking.userId.slice(0, 8)}…
                          </span>
                        )}
                      </td>
                      {/* Phone — WhatsApp click-to-chat */}
                      <td className="px-5 py-4">
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
                              {/* WhatsApp icon */}
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
                      {/* Event type + notes */}
                      <td className="px-5 py-4 max-w-[200px]">
                        <span className="text-slate-200 font-medium">
                          {booking.eventType || "—"}
                        </span>
                        {booking.message && (
                          <p
                            className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2"
                            title={booking.message}
                          >
                            {booking.message}
                          </p>
                        )}
                      </td>
                      {/* Event date */}
                      <td className="px-5 py-4 text-slate-400 tabular-nums">
                        {fmt(booking.date)}
                      </td>
                      {/* Guests */}
                      <td className="px-5 py-4 text-slate-400">
                        {booking.guests || "—"}
                      </td>
                      {/* Budget */}
                      <td className="px-5 py-4 text-slate-400">
                        {booking.budget || "—"}
                      </td>
                      {/* Submitted */}
                      <td className="px-5 py-4 text-slate-500 text-xs tabular-nums">
                        {fmt(booking.createdAt)}
                      </td>
                      {/* Status badge */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block text-[11px] font-semibold tracking-wide border rounded-full px-2.5 py-0.5
                            ${STATUS_COLORS[booking.status] ?? "bg-slate-500/15 text-slate-400 border-slate-500/30"}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      {/* Action buttons */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <form action={`/api/admin/bookings/${booking.id}/confirm`} method="POST">
                            <button
                              type="submit"
                              disabled={booking.status === "Confirmed"}
                              title="Approve booking"
                              className="text-[11px] font-semibold px-3 py-1 rounded-lg border
                                border-emerald-500/30 text-emerald-400 bg-emerald-500/10
                                hover:bg-emerald-500/25 hover:border-emerald-400
                                disabled:opacity-30 disabled:cursor-not-allowed
                                transition-all duration-150"
                            >
                              Approve
                            </button>
                          </form>
                          <form action={`/api/admin/bookings/${booking.id}/cancel`} method="POST">
                            <button
                              type="submit"
                              disabled={booking.status === "Cancelled"}
                              title="Reject booking"
                              className="text-[11px] font-semibold px-3 py-1 rounded-lg border
                                border-red-500/30 text-red-400 bg-red-500/10
                                hover:bg-red-500/25 hover:border-red-400
                                disabled:opacity-30 disabled:cursor-not-allowed
                                transition-all duration-150"
                            >
                              Reject
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          )}
        </div>

        {totalCount > 0 && (
          <p className="text-xs text-slate-600 mt-3">
            Showing all {totalCount} record{totalCount !== 1 ? "s" : ""}.
            Actions are disabled until the API routes are wired up.
          </p>
        )}
      </section>

    </div>
  );
}
