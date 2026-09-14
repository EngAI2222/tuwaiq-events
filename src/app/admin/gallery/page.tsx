"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { storage } from "@/lib/firebase";
import { db } from "@/lib/db";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

// ── Types ──────────────────────────────────────────────────────────────────────

type GalleryItem = {
  id: string;
  imageURL: string;
  caption: string;
  category: string;
  createdAt: string;
};

const CATEGORIES = [
  "حفلات زفاف",
  "ليالي الملكة",
  "مؤتمرات وشركات",
  "ديكور وتنسيق",
  "كوش الأفراح",
  "طاولات وضيافة",
  "إضاءة وصوتيات",
  "جلسات ملكية",
  "تنسيق ورود",
  "تصوير كادر تصويري زفاف",
  "تصميم بالذكاء الاصطناعي"
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload form state
  const [showForm, setShowForm] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  // Multi-file state
  const [files, setFiles] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  // Upload progress: per-file index + overall percentage
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null); // which file is currently uploading
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch ────────────────────────────────────────────────────────────────────
  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await db.gallery.findMany();
      setItems(data as GalleryItem[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  // Revoke object URLs on unmount / file change to avoid memory leaks
  useEffect(() => {
    return () => previewURLs.forEach((u) => URL.revokeObjectURL(u));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewURLs]);

  // ── File selection ────────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;
    // Revoke any previous previews
    previewURLs.forEach((u) => URL.revokeObjectURL(u));
    setFiles(selected);
    setPreviewURLs(selected.map((f) => URL.createObjectURL(f)));
  };

  // Remove a single file from the selection
  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewURLs[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewURLs((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Upload (sequential per-file) ──────────────────────────────────────────────
  const uploadSingleFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        "state_changed",
        (snap) => {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          setUploadProgress(pct);
        },
        reject,
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        }
      );
    });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length || !caption.trim()) return;

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        setUploadingIndex(i);
        setUploadProgress(0);
        const imageURL = await uploadSingleFile(files[i]);
        await db.gallery.create({ data: { imageURL, caption, category } });
      }
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      // Reset form
      previewURLs.forEach((u) => URL.revokeObjectURL(u));
      setFiles([]);
      setPreviewURLs([]);
      setCaption("");
      setCategory(CATEGORIES[0]);
      setUploadProgress(0);
      setUploadingIndex(null);
      setIsUploading(false);
      setShowForm(false);
      await fetchItems();
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────────
  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Delete "${item.caption}"?`)) return;
    setDeletingId(item.id);
    try {
      if (item.imageURL) {
        try {
          await deleteObject(ref(storage, item.imageURL));
        } catch (_) { /* ignore if already deleted or external */ }
      }
      await db.gallery.delete({ where: { id: item.id } });
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } finally {
      setDeletingId(null);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* ── Page header ── */}
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/20
        bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-transparent p-6">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-violet-400/70 uppercase mb-1">
              Media Library
            </p>
            <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
            <p className="text-sm text-slate-400 mt-1">
              {loading ? "Loading…" : `${items.length} image${items.length !== 1 ? "s" : ""} in Firestore`}
            </p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold
              shadow-lg shadow-violet-500/20 transition-all duration-200 shrink-0"
          >
            {showForm ? "✕ Cancel" : "+ Upload Photos"}
          </button>
        </div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* ── Upload form ── */}
      {showForm && (
        <form
          onSubmit={handleUpload}
          className="rounded-2xl border border-violet-500/20 bg-[#0f1117] p-6 space-y-5"
        >
          <p className="text-sm font-bold text-white">New Gallery Images</p>

          {/* File drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative min-h-52 rounded-xl border-2 border-dashed border-white/10
              hover:border-violet-500/40 bg-white/[0.02] flex flex-col items-center
              justify-center cursor-pointer transition-all duration-200 overflow-hidden p-4"
          >
            {previewURLs.length > 0 ? (
              /* ── Preview strip ── */
              <div className="w-full flex flex-wrap gap-3 justify-center" onClick={(e) => e.stopPropagation()}>
                {previewURLs.map((url, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                    <Image src={url} alt={`preview-${idx}`} fill className="object-cover" />
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-red-400
                        text-[10px] flex items-center justify-center hover:bg-red-500/40 transition-colors"
                    >
                      ✕
                    </button>
                    {/* Uploading indicator */}
                    {isUploading && uploadingIndex === idx && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{uploadProgress}%</span>
                      </div>
                    )}
                    {/* Done indicator */}
                    {isUploading && uploadingIndex !== null && idx < uploadingIndex && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 text-base">✓</span>
                      </div>
                    )}
                  </div>
                ))}
                {/* Add more button */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-lg border-2 border-dashed border-white/10
                    hover:border-violet-500/40 flex items-center justify-center
                    text-slate-500 hover:text-violet-400 transition-colors cursor-pointer"
                >
                  <span className="text-2xl">+</span>
                </div>
              </div>
            ) : (
              <>
                <span className="text-4xl mb-2">🖼️</span>
                <p className="text-sm text-slate-400">Click to select one or more images</p>
                <p className="text-xs text-slate-600 mt-1">JPG, PNG, WEBP up to 10 MB each · multiple files supported</p>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Selected count badge */}
          {files.length > 0 && (
            <p className="text-xs text-violet-400 font-semibold">
              {files.length} image{files.length !== 1 ? "s" : ""} selected
              {files.length > 1 && " · all will share the same caption & category"}
            </p>
          )}

          {/* Caption + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Caption (Title)</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
                placeholder="e.g. كوشة زفاف ملكية"
                className="w-full h-10 px-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                  text-white text-sm placeholder:text-slate-600 focus:outline-none
                  focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-white/[0.05] border border-white/[0.08]
                  text-white text-sm focus:outline-none focus:border-violet-500/50 transition-colors [&>option]:bg-[#0f1117]"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Overall progress bar (shown while uploading) */}
          {isUploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>
                  Uploading {uploadingIndex !== null ? uploadingIndex + 1 : 0} of {files.length}…
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isUploading || files.length === 0}
            className="w-full h-11 rounded-xl bg-violet-600 hover:bg-violet-500 text-white
              font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 shadow-lg shadow-violet-500/20"
          >
            {isUploading
              ? `Uploading ${(uploadingIndex ?? 0) + 1} / ${files.length}…`
              : `Save ${files.length > 1 ? `${files.length} Images` : "to Gallery"}`}
          </button>
        </form>
      )}

      {/* ── Image grid ── */}
      <section>
        <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
          Live Gallery · {items.length} Items
        </h3>

        {loading ? (
          <div className="py-8 sm:py-12 md:py-24 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-8 sm:py-12 md:py-24 text-center text-slate-500 text-sm">
            No images yet. Click &quot;Upload Photos&quot; to add the first one.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {items.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square rounded-2xl overflow-hidden
                  border border-white/[0.07] hover:border-violet-500/40 bg-[#0f1117]
                  transition-all duration-300"
              >
                <Image
                  src={img.imageURL}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-white text-xs font-semibold leading-tight">{img.caption}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">{img.category}</p>
                </div>
                {/* Delete chip */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleDelete(img)}
                    disabled={deletingId === img.id}
                    title="Delete image"
                    className="flex items-center justify-center w-7 h-7 rounded-lg
                      bg-red-500/20 border border-red-500/30 text-red-400
                      hover:bg-red-500/40 text-xs transition-colors disabled:opacity-50"
                  >
                    {deletingId === img.id ? "…" : "✕"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
