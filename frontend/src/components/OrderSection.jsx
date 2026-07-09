import { useEffect, useMemo, useState } from "react";
import { Loader2, Minus, Plus, X } from "lucide-react";
import { api } from "../api";

function Stepper({ value, onChange, disabled }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-vine-light/30 bg-white px-1.5 py-1">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-6 w-6 place-items-center rounded-md text-vine-dark hover:bg-cream disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="কমান"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-5 text-center text-sm font-semibold text-ink">{value}</span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(value + 1)}
        className="grid h-6 w-6 place-items-center rounded-md text-vine-dark hover:bg-cream disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="বাড়ান"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// Simple hand-shake / thank-you icon used on the success screen.
function ThanksIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21c-3.5-2-7-4.8-7-8.8C5 9.1 7.1 7 9.6 7c1.3 0 2.5.6 3.4 1.6C13.9 7.6 15.1 7 16.4 7 18.9 7 21 9.1 21 12.2c0 4-3.5 6.8-7 8.8-.7.4-1.3.4-2 0Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M8.5 12.5c1-1.3 2.2-2 3.5-2s2.5.7 3.5 2M7 15.5c1.4-1 2.9-1.6 5-1.6s3.6.6 5 1.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const PHONE_PATTERN = /^01[3-9][0-9]{8}$/;

export default function OrderSection() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadError, setLoadError] = useState("");

  // selections: { [productId]: qty }
  const [selections, setSelections] = useState({});
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { id, total }
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    api
      .getProducts()
      .then((rows) => setProducts(rows))
      .catch(() => setLoadError("পণ্যের তালিকা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।"))
      .finally(() => setLoadingProducts(false));
  }, []);

  // Listen for "add to order" clicks coming from the product cards above.
  useEffect(() => {
    function handleAddToOrder(e) {
      const { id } = e.detail || {};
      if (id == null) return;
      setSelections((prev) => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : 1 }));
    }
    window.addEventListener("add-to-order", handleAddToOrder);
    return () => window.removeEventListener("add-to-order", handleAddToOrder);
  }, []);

  const toggleProduct = (product) => {
    if (submitting) return;
    setSelections((prev) => {
      const next = { ...prev };
      if (next[product.id]) {
        delete next[product.id];
      } else {
        next[product.id] = 1;
      }
      return next;
    });
  };

  const setQty = (productId, qty) => {
    setSelections((prev) => ({ ...prev, [productId]: qty }));
  };

  const selectedItems = useMemo(() => {
    return products
      .filter((p) => selections[p.id])
      .map((p) => ({
        productId: p.id,
        name: p.name,
        price: Number(p.price) || 0,
        qty: selections[p.id],
      }));
  }, [products, selections]);

  const total = selectedItems.reduce((sum, it) => sum + it.qty * it.price, 0);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "আপনার নাম দিন";

    const phone = form.phone.trim();
    if (!phone) {
      errs.phone = "মোবাইল নম্বর আবশ্যক";
    } else if (!PHONE_PATTERN.test(phone)) {
      errs.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)";
    }

    if (selectedItems.length === 0) errs.items = "কমপক্ষে একটি পণ্য নির্বাচন করুন";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const order = await api.createOrder({
        customerName: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        note: form.note.trim(),
        items: selectedItems,
      });
      setResult(order);
      setSelections({});
      setForm({ name: "", phone: "", address: "", note: "" });
    } catch (err) {
      setSubmitError(err.message || "অর্ডার করা যায়নি, আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-8 animate-[fadeIn_0.2s_ease-out]"
        onClick={() => setResult(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()} // card এর ভিতরে click করলে যেন বন্ধ না হয়
          className="relative mx-auto w-full max-w-2xl rounded-2xl border border-vine-light/20 bg-white px-6 py-12 text-center shadow-2xl shadow-black/20 sm:px-12 animate-[scaleIn_0.25s_ease-out] max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setResult(null)}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-cream hover:text-ink"
            aria-label="বন্ধ করুন"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full"
            style={{ background: "#E9F1EA", color: "#1B5E3A" }}
          >
            <ThanksIcon className="h-12 w-12" />
          </div>

          <h3 className="text-lg font-bold leading-relaxed text-ink sm:text-xl">
            ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের সাপোর্ট টিম থেকে আপনাকে কল
            করে অর্ডারটি কনফার্ম করা হবে, ইনশাআল্লাহ।
          </h3>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/60">
            <span className="font-semibold text-ink/70">গুরুত্বপূর্ণ তথ্যঃ</span> সাধারণত অর্ডার
            কনফার্ম করার পর আমরা ২ থেকে ৩ কার্যদিবসের মধ্যে ডেলিভারি নিশ্চিত করি। অর্ডার নিশ্চিত
            হওয়ার পর আমাদের অভিজ্ঞ কারিগররা যত্নসহকারে চারাগুলো প্রস্তুত করেন, যাতে আপনার হাতে
            সুস্থ ও সতেজ চারা পৌঁছায়। এই সামান্য সময়টুকু শুধুমাত্র মান বজায় রাখার জন্যই প্রয়োজন।
          </p>

          <p className="mt-4 text-sm font-semibold" style={{ color: "#1B5E3A" }}>
            অর্ডার নম্বর #{result.id} — মোট মূল্য ৳{result.total}
          </p>

          <button
            type="button"
            onClick={() => setResult(null)}
            className="mt-8 rounded-full bg-vine px-6 py-2.5 text-sm font-semibold text-cream hover:bg-vine-dark"
          >
            আরেকটি অর্ডার করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="order" className="px-4 py-16 sm:px-6" style={{ background: "#FBF8F1" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="p-eyebrow">অনলাইনে অর্ডার করুন</p>
          <h2 className="mt-2 text-2xl font-extrabold text-vine-dark md:text-4xl">
            পছন্দের চারা নির্বাচন করুন
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Product selection */}
          <div className="lg:col-span-2">
            {loadingProducts && (
              <div className="flex items-center gap-2 text-ink/60">
                <Loader2 className="h-4 w-4 animate-spin" /> পণ্য লোড হচ্ছে...
              </div>
            )}
            {loadError && <p className="text-sm text-red-600">{loadError}</p>}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {products.map((p) => {
                const checked = Boolean(selections[p.id]);
                return (
                  <label
                    key={p.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 transition ${checked
                      ? "bg-vine/5 shadow-sm"
                      : "border-vine-light/40 bg-white"
                      } ${submitting ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={submitting}
                      onChange={() => toggleProduct(p)}
                      className="h-5 w-5 shrink-0 accent-[#1F4D2C] disabled:cursor-not-allowed"
                    />
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                      {p.image ? (
                        <img
                          src={api.imageUrl(p.image)}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink">{p.name}</p>
                      <p className="truncate text-xs text-ink/60">{p.note}</p>
                      <p className="text-xs font-semibold text-vine-dark">৳{p.price}.00</p>
                    </div>
                    <Stepper
                      value={selections[p.id] || 1}
                      disabled={!checked || submitting}
                      onChange={(v) => setQty(p.id, v)}
                    />
                  </label>
                );
              })}
            </div>
            {errors.items && <p className="mt-2 text-sm text-red-600">{errors.items}</p>}

            {/* Customer info */}
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-bold text-vine-dark">আপনার তথ্য দিন</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    disabled={submitting}
                    placeholder="আপনার নাম লিখুন..."
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-cream/50 disabled:opacity-60 ${errors.name ? "border-red-400" : "border-vine-light/30"
                      }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink">
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    disabled={submitting}
                    placeholder="01XXXXXXXXX"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-cream/50 disabled:opacity-60 ${errors.phone ? "border-red-400" : "border-vine-light/30"
                      }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink">ঠিকানা</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={handleChange("address")}
                    disabled={submitting}
                    placeholder="জেলা, উপজেলা..."
                    className="w-full rounded-lg border border-vine-light/30 px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-cream/50 disabled:opacity-60"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">অতিরিক্ত মন্তব্য (ঐচ্ছিক)</label>
                  <textarea
                    value={form.note}
                    onChange={handleChange("note")}
                    disabled={submitting}
                    rows={3}
                    placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন..."
                    className="w-full rounded-lg border border-vine-light/30 px-3 py-2.5 text-sm outline-none disabled:cursor-not-allowed disabled:bg-cream/50 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-vine-light/20 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-vine-dark">পণ্যের বিবরণ</h3>
              {selectedItems.length === 0 ? (
                <p className="text-sm text-ink/60">এখনো কোনো পণ্য নির্বাচন করা হয়নি।</p>
              ) : (
                <div className="divide-y divide-vine-light/10">
                  {selectedItems.map((it) => (
                    <div key={it.productId} className="flex items-center justify-between py-2.5 text-sm">
                      <div className="min-w-0 pr-2">
                        <p className="truncate font-medium text-ink">{it.name}</p>
                        <p className="text-xs text-ink/50">
                          ৳{it.price} × {it.qty}
                        </p>
                      </div>
                      <p className="shrink-0 font-semibold text-ink">৳{it.price * it.qty}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-vine-light/20 pt-4">
                <span className="font-bold text-ink">সর্বমোট</span>
                <span className="text-lg font-extrabold text-vine-dark">৳{total}</span>
              </div>

              {submitError && <p className="mt-3 text-sm text-red-600">{submitError}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="p-btn-green mt-5 flex w-full items-center justify-center gap-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    অর্ডার হচ্ছে...
                  </>
                ) : (
                  "অর্ডার নিশ্চিত করুন"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}