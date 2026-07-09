import { useEffect, useRef, useState } from "react";
import { Loader2, UploadCloud, X, ImagePlus } from "lucide-react";
import { api } from "../api";

const emptyForm = { name: "", note: "", price: "", image: "" };

export default function ProductForm({ editingProduct, onSaved, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        note: editingProduct.note || "",
        price: editingProduct.price ?? "",
        image: editingProduct.image || "",
      });
      setPreview(editingProduct.image ? api.imageUrl(editingProduct.image) : "");
    } else {
      setForm(emptyForm);
      setPreview("");
    }
  }, [editingProduct]);

  const handleField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const uploadFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("শুধুমাত্র ছবি ফাইল আপলোড করুন");
      return;
    }
    setError("");
    setUploading(true);
    // instant local preview while upload happens
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    try {
      const { url } = await api.uploadImage(file);
      setForm((prev) => ({ ...prev, image: url }));
      setPreview(api.imageUrl(url));
    } catch (err) {
      setError(err.message || "ছবি আপলোড ব্যর্থ হয়েছে");
      setPreview(form.image ? api.imageUrl(form.image) : "");
    } finally {
      setUploading(false);
    }
  };

  const handleFile = (e) => uploadFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    uploadFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("পণ্যের নাম আবশ্যক");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        note: form.note.trim(),
        price: Number(form.price) || 0,
        image: form.image,
      };
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
      } else {
        await api.createProduct(payload);
      }
      setForm(emptyForm);
      setPreview("");
      onSaved();
    } catch (err) {
      setError(err.message || "সংরক্ষণ ব্যর্থ হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-4 shadow-sm sm:p-5"
    >
      <h3 className="mb-4 text-base font-bold text-vine-dark">
        {editingProduct ? "পণ্য সম্পাদনা করুন" : "নতুন পণ্য যোগ করুন"}
      </h3>

      {/* Image upload */}
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-ink">ছবি</label>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition ${dragActive
            ? "border-vine bg-vine/5"
            : "border-vine-light/40 bg-cream/40 hover:bg-cream/70"
            } ${preview ? "aspect-video" : "aspect-[16/9] sm:aspect-[16/7]"}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />

          {preview ? (
            <>
              <img
                src={preview}
                alt="preview"
                className={`h-full w-full object-cover transition ${uploading ? "opacity-50" : ""}`}
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Loader2 className="h-7 w-7 animate-spin text-white" />
                </div>
              )}
              {!uploading && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition hover:bg-black/30 hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink">
                      <UploadCloud className="h-3.5 w-3.5" /> ছবি পরিবর্তন করুন
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview("");
                      setForm((prev) => ({ ...prev, image: "" }));
                    }}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
                    aria-label="ছবি সরান"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              )}
            </>
          ) : uploading ? (
            <div className="flex flex-col items-center gap-2 text-ink/60">
              <Loader2 className="h-7 w-7 animate-spin text-vine" />
              <span className="text-sm font-medium">আপলোড হচ্ছে...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 text-center text-ink/50">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-vine/10 text-vine">
                <ImagePlus className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-ink/70">
                ছবি টেনে ছেড়ে দিন বা ক্লিক করে বাছাই করুন
              </p>
              <p className="text-xs text-ink/40">PNG, JPG (সর্বোচ্চ কয়েক MB)</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-ink">পণ্যের নাম *</label>
          <input
            type="text"
            value={form.name}
            onChange={handleField("name")}
            className="w-full rounded-lg border border-vine-light/30 px-3 py-2 text-sm outline-none"
            placeholder="যেমনঃ বাইকুনুর আঙুর চারা"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-ink">সংক্ষিপ্ত বিবরণ</label>
          <input
            type="text"
            value={form.note}
            onChange={handleField("note")}
            className="w-full rounded-lg border border-vine-light/30 px-3 py-2 text-sm outline-none"
            placeholder="যেমনঃ মিষ্টি, বীজবিহীন জাত"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">দাম (৳) *</label>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={handleField("price")}
            className="w-full rounded-lg border border-vine-light/30 px-3 py-2 text-sm outline-none"
            placeholder="350"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="p-btn-green text-sm disabled:opacity-60"
        >
          {saving ? "সংরক্ষণ হচ্ছে..." : editingProduct ? "আপডেট করুন" : "যোগ করুন"}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-vine-light/30 px-4 py-2 text-sm font-semibold text-ink/70 hover:bg-cream"
          >
            বাতিল
          </button>
        )}
      </div>
    </form>
  );
}
