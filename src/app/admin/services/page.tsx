"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { storage } from "@/lib/firebase";
import { db } from "@/lib/db";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

// ── Types ──────────────────────────────────────────────────────────────────────

type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageURL: string;
  category: string;
  createdAt: string;
};

const SERVICE_CATEGORIES = [
  "كوش الأفراح",
  "طاولات وضيافة",
  "إضاءة وصوتيات",
  "جلسات ملكية",
  "تنسيق زهور",
  "تصميم بالذكاء الاصطناعي",
  "حفلات زفاف",
  "مؤتمرات وشركات",
  "أخرى",
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(SERVICE_CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch ────────────────────────────────────────────────────────────────────
  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await db.service.findMany();
      setServices(data as Service[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  // ── File preview ─────────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreviewURL(f ? URL.createObjectURL(f) : null);
  };

  // ── Upload + Save ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    setUploadProgress(0);

    let imageURL = "";

    if (file) {
      const storageRef = ref(storage, `services/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snap) => {
            setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
          },
          (err) => { console.error(err); reject(err); },
          async () => {
            imageURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    await db.service.create({
      data: { title, description, price, imageURL, category },
    });

    // Reset form
    setShowForm(false);
    setTitle(""); setDescription(""); setPrice(""); setCategory(SERVICE_CATEGORIES[0]);
    setFile(null); setPreviewURL(null); setUploadProgress(0); setIsUploading(false);
    await fetchServices();
  };

  // ── Delete ────────────────────────────────────────────────────────────────────
  const handleDelete = async (svc: Service) => {
    if (!confirm(`Delete "${svc.title}"?`)) return;
    setDeletingId(svc.id);
    try {
      if (svc.imageURL) {
        try {
          await deleteObject(ref(storage, svc.imageURL));
        } catch (_) { /* external or already deleted */ }
      }
      await db.service.delete({ where: { id: svc.id } });
      setServices((prev) => prev.filter((s) => s.id !== svc.id));
    } finally {
      setDeletingId(null);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* ── Page header ── */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-500/20
        bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-transparent p-6">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-sky-400/70 uppercase mb-1">
              Service Catalogue
            </p>
            <h2 className="text-2xl font-bold text-white">Services Management</h2>
            <p className="text-sm text-slate-400 mt-1">
              {loading ? "Loading…" : `${services.length} service${services.length !== 1 ? "s" : ""} in Firestore`}
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold
              shadow-lg shadow-sky-500/20 transition-all duration-200 shrink-0"
          >
            {showForm ? "✕ Cancel" : "+ Add Service"}
          </button>
        </div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* ── Add service form ── */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-sky-500/20 bg-[#0f1117] p-6 space-y-5"
        >
          <p className="text-sm font-bold text-white">New Service</p>

          {/* Image upload zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative h-40 rounded-xl border-2 border-dashed border-white/10
              hover:border-sky-500/40 bg-white/[0.02] flex flex-col items-center
              justify-center cursor-pointer transition-all duration-200 overflow-hidden"
          >
            {previewURL ? (
              <Image src={previewURL} alt="preview" fill className="object-cover rounded-xl" />
            ) : (
              <>
                <span className="text-4xl mb-2">⚙️</span>
                <p className="text-sm text-slate-400">Click to add a cover image (optional)</p>
              </>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Service Title *</label>
              <input
                type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                required placeholder="e.g. كوش الأفراح"
                className="w-full h-10 px-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                  text-white text-sm placeholder:text-slate-600 focus:outline-none
                  focus:border-sky-500/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Category</label>
              <input
                list="service-categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Select or type a category..."
                className="w-full h-10 px-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                  text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
              />
              <datalist id="service-categories">
                {SERVICE_CATEGORIES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Starting Price</label>
              <input
                type="text" value={price} onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. يبدأ من 5,000 ريال"
                className="w-full h-10 px-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                  text-white text-sm placeholder:text-slate-600 focus:outline-none
                  focus:border-sky-500/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs text-slate-400 font-medium">Description</label>
              <textarea
                value={description} onChange={(e) => setDescription(e.target.value)}
                rows={3} placeholder="Describe this service…"
                className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08]
                  text-white text-sm placeholder:text-slate-600 focus:outline-none
                  focus:border-sky-500/50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Progress bar */}
          {isUploading && file && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Uploading image…</span><span>{uploadProgress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading || !title.trim()}
            className="w-full h-11 rounded-xl bg-sky-600 hover:bg-sky-500 text-white
              font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 shadow-lg shadow-sky-500/20"
          >
            {isUploading ? "Saving…" : "Save Service"}
          </button>
        </form>
      )}

      {/* ── Services table ── */}
      <section>
        <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
          Live Catalogue · {services.length} Services
        </h3>

        {loading ? (
          <div className="py-8 sm:py-12 md:py-24 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="py-8 sm:py-12 md:py-24 text-center text-slate-500 text-sm">
            No services yet. Click &quot;Add Service&quot; to create the first one.
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-[#0f1117]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] text-xs text-slate-500 uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Cover</th>
                  <th className="text-left px-5 py-3 font-medium">Title</th>
                  <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Price</th>
                  <th className="text-left px-5 py-3 font-medium">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-white/[0.02] transition-colors duration-150">
                    <td className="px-5 py-3">
                      {svc.imageURL ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/[0.08]">
                          <Image src={svc.imageURL} alt={svc.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg border border-white/[0.08] bg-white/[0.03]
                          flex items-center justify-center text-slate-600 text-lg">⚙️</div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-slate-200 font-medium leading-tight">{svc.title}</p>
                      {svc.description && (
                        <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{svc.description}</p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-slate-400 hidden md:table-cell">{svc.category}</td>
                    <td className="px-5 py-3 text-slate-400 hidden sm:table-cell">{svc.price || "—"}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleDelete(svc)}
                        disabled={deletingId === svc.id}
                        className="text-[11px] font-semibold px-3 py-1 rounded-lg
                          border border-red-500/20 text-red-400 bg-red-500/5
                          hover:bg-red-500/15 disabled:opacity-50 transition-colors"
                      >
                        {deletingId === svc.id ? "…" : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
}
