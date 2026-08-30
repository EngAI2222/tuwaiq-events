// src/app/admin/bookings/page.tsx
// Full bookings management table — async Server Component

import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Bookings | Lamsa Admin" };

// ── Types ─────────────────────────────────────────────────────────────────────

type Booking = {
  id: string;
  userId?: string | null;
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
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
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
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="border-b border-white/[0.07] text-xs text-slate-500 uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-medium">#</th>
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
                      {/* Event type */}
                      <td className="px-5 py-4">
                        <span className="text-slate-200 font-medium">
                          {booking.eventType || "—"}
                        </span>
                        {booking.userId && (
                          <span className="block text-[10px] text-slate-600 mt-0.5 font-mono">
                            uid: {booking.userId.slice(0, 8)}…
                          </span>
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
