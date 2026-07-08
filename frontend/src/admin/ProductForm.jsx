import { useEffect, useState } from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import { api } from "../api";

const emptyForm = { name: "", note: "", price: "", image: "" };

export default function ProductForm({ editingProduct, onSaved, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const { url } = await api.uploadImage(file);
      setForm((prev) => ({ ...prev, image: url }));
      setPreview(api.imageUrl(url));
    } catch (err) {
      setError(err.message || "ছবি আপলোড ব্যর্থ হয়েছে");
    } finally {
      setUploading(false);
    }
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
      className="rounded-xl border border-vine-light/20 bg-white p-5 shadow-sm"
    >
      <h3 className="mb-4 text-base font-bold text-vine-dark">
        {editingProduct ? "পণ্য সম্পাদনা করুন" : "নতুন পণ্য যোগ করুন"}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-ink">পণ্যের নাম *</label>
          <input
            type="text"
            value={form.name}
            onChange={handleField("name")}
            className="w-full rounded-lg border border-vine-light/30 px-3 py-2 text-sm outline-none focus:border-vine"
            placeholder="যেমনঃ বাইকুনুর আঙুর চারা"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-ink">সংক্ষিপ্ত বিবরণ</label>
          <input
            type="text"
            value={form.note}
            onChange={handleField("note")}
            className="w-full rounded-lg border border-vine-light/30 px-3 py-2 text-sm outline-none focus:border-vine"
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
            className="w-full rounded-lg border border-vine-light/30 px-3 py-2 text-sm outline-none focus:border-vine"
            placeholder="350"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">ছবি</label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-vine-light/40 px-3 py-2 text-sm text-ink/70 hover:bg-cream">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="h-4 w-4" />
            )}
            {uploading ? "আপলোড হচ্ছে..." : "ছবি বাছাই করুন"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>
      </div>

      {preview && (
        <div className="relative mt-3 inline-block">
          <img src={preview} alt="preview" className="h-20 w-20 rounded-lg object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview("");
              setForm((prev) => ({ ...prev, image: "" }));
            }}
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-red-500 text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

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
