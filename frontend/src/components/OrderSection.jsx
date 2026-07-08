import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Minus, Plus } from "lucide-react";
import { api } from "../api";

function Stepper({ value, onChange, disabled }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-vine-light/30 bg-white px-1.5 py-1">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-6 w-6 place-items-center rounded-md text-vine-dark hover:bg-cream disabled:opacity-40"
        aria-label="কমান"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-5 text-center text-sm font-semibold text-ink">{value}</span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(value + 1)}
        className="grid h-6 w-6 place-items-center rounded-md text-vine-dark hover:bg-cream disabled:opacity-40"
        aria-label="বাড়ান"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

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

  const toggleProduct = (product) => {
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
      <section id="order" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-vine-light/20 bg-white p-8 text-center shadow-lg shadow-vine/10">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-vine/10 text-vine">
            <Check className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-vine-dark">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h3>
          <p className="mt-2 text-sm text-ink/70">
            অর্ডার নম্বর <span className="font-semibold text-ink">#{result.id}</span> — মোট মূল্য{" "}
            <span className="font-semibold text-ink">৳{result.total}</span>
          </p>
          <p className="mt-1 text-sm text-ink/70">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
          <button
            type="button"
            onClick={() => setResult(null)}
            className="mt-6 rounded-full bg-vine px-5 py-2 text-sm font-semibold text-cream hover:bg-vine-dark"
          >
            আরেকটি অর্ডার করুন
          </button>
        </div>
      </section>
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
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                      checked
                        ? "border-vine bg-vine/5 shadow-sm"
                        : "border-vine-light/20 bg-white hover:border-vine-light/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleProduct(p)}
                      className="h-5 w-5 shrink-0 accent-[#1F4D2C]"
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
                      disabled={!checked}
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
                    placeholder="আপনার নাম লিখুন..."
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-vine ${
                      errors.name ? "border-red-400" : "border-vine-light/30"
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink">মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-lg border border-vine-light/30 px-3 py-2.5 text-sm outline-none focus:border-vine"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink">ঠিকানা</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={handleChange("address")}
                    placeholder="জেলা, উপজেলা..."
                    className="w-full rounded-lg border border-vine-light/30 px-3 py-2.5 text-sm outline-none focus:border-vine"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-ink">অতিরিক্ত মন্তব্য (ঐচ্ছিক)</label>
                  <textarea
                    value={form.note}
                    onChange={handleChange("note")}
                    rows={3}
                    placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন..."
                    className="w-full rounded-lg border border-vine-light/30 px-3 py-2.5 text-sm outline-none focus:border-vine"
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
                className="p-btn-green mt-5 w-full justify-center disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> অর্ডার হচ্ছে...
                  </span>
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
