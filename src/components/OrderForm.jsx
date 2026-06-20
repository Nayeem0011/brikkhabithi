import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { variants } from "./ProductVariants";

const DELIVERY_CHARGE = 200;
// ফোন নম্বর ভ্যালিডেশন: ০১ এর পর ৩-৯ এর যেকোনো একটি ডিজিট, তারপর আরও ৮টি ডিজিট (মোট ১১ ডিজিট)
const PHONE_REGEX = /^01[3-9]\d{8}$/;

export default function OrderForm() {
  // ProductVariants.jsx থেকেই ডেটা আসছে, তাই দাম-কোয়ান্টিটি সবসময় ওই ফাইলের সাথে মিলে থাকবে
  const [selectedId, setSelectedId] = useState(variants[0].id);
  const [billing, setBilling] = useState({ name: "", address: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const selected = useMemo(
    () => variants.find((v) => v.id === selectedId),
    [selectedId]
  );

  const subtotal = selected ? selected.price : 0;
  const deliveryCharge = subtotal > 0 ? DELIVERY_CHARGE : 0;
  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // ডিজিট ছাড়া অন্য কিছু লেখা যাবে না, সর্বোচ্চ ১১ ডিজিট
      const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
      setBilling((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }

    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!selectedId) next.package = "একটি প্যাকেজ বাছাই করুন";
    if (!billing.name.trim()) next.name = "নাম লিখুন";
    if (!billing.address.trim()) next.address = "ঠিকানা লিখুন";

    if (!billing.phone.trim()) {
      next.phone = "মোবাইল নম্বর দিন";
    } else if (!PHONE_REGEX.test(billing.phone.trim())) {
      next.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমনঃ 017XXXXXXXX)";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // এখানে নিজের API/Google Sheet/WhatsApp endpoint এ অর্ডার ডেটা পাঠিয়ে দিতে পারো
    console.log("Order placed:", { package: selected, billing, total });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="order" className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-14 w-14 text-vine" />
        <h2 className="mt-4 font-display text-3xl text-vine-dark">অর্ডার সফল হয়েছে!</h2>
        <p className="mt-2 text-ink/70">
          ধন্যবাদ {billing.name}, আপনার অর্ডার গ্রহণ করা হয়েছে। যাচাইয়ের জন্য আমাদের প্রতিনিধি শীঘ্রই
          {" "}
          {billing.phone} নম্বরে কল করবেন।
        </p>
      </section>
    );
  }

  return (
    <section id="order" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="অর্ডার করতে নিচের ফর্মটি পূরণ করুন"
        title="আপনার সঠিক তথ্য দিন"
      />

      <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-vine-dark">প্যাকেজ বাছাই করুন</h3>

            {variants.map((v) => {
              const isSelected = selectedId === v.id;
              return (
                <label
                  key={v.id}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition ${
                    isSelected
                      ? "border-vine bg-vine/10"
                      : "border-vine-light/20 bg-white/60 hover:border-vine-light/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="package"
                      checked={isSelected}
                      onChange={() => setSelectedId(v.id)}
                      className="h-4 w-4 accent-vine"
                    />
                    <div>
                      <p className="font-medium text-ink">
                        {v.name} — {v.quantity}
                      </p>
                      <p className="text-sm text-ink/60">{v.color}</p>
                    </div>
                  </div>
                  <p className="shrink-0 font-semibold text-plum">৳{v.price}</p>
                </label>
              );
            })}
            {errors.package && <p className="text-sm text-red-600">{errors.package}</p>}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-vine-dark">বিলিং তথ্য</h3>
            <div>
              <input
                name="name"
                value={billing.name}
                onChange={handleChange}
                placeholder="আপনার নাম *"
                className="w-full rounded-lg border border-vine-light/30 bg-white/70 px-4 py-2.5 outline-none focus:border-vine"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <textarea
                name="address"
                value={billing.address}
                onChange={handleChange}
                placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন *"
                rows={3}
                className="w-full rounded-lg border border-vine-light/30 bg-white/70 px-4 py-2.5 outline-none focus:border-vine"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
            <div>
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                value={billing.phone}
                onChange={handleChange}
                placeholder="মোবাইল নম্বর * (যেমনঃ 017XXXXXXXX)"
                className="w-full rounded-lg border border-vine-light/30 bg-white/70 px-4 py-2.5 outline-none focus:border-vine"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 flex flex-col gap-3 rounded-2xl border border-vine-light/20 bg-vine/5 p-6">
            <h3 className="font-semibold text-vine-dark">অর্ডার সামারি</h3>

            {selected && (
              <div className="flex justify-between text-sm text-ink/70">
                <span>{selected.name} — {selected.quantity}</span>
                <span>৳{selected.price}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-ink/70">
              <span>ডেলিভারি চার্জ</span>
              <span>৳{deliveryCharge}</span>
            </div>
            <div className="my-1 h-px bg-vine-light/20" />
            <div className="flex justify-between text-lg font-bold text-vine-dark">
              <span>সর্বমোট</span>
              <span>৳{total}</span>
            </div>

            <button
              type="submit"
              className="mt-3 w-full rounded-full bg-plum py-3 font-semibold text-cream transition hover:bg-plum-light"
            >
              অর্ডার করুন ৳{total}
            </button>
            <p className="text-center text-xs text-ink/50">
              ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে মূল্য পরিশোধ
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
