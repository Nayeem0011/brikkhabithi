import { Grape, Droplets, CircleDot } from "lucide-react";
import SectionHeading from "./SectionHeading";

import grape1 from "../assets/image/grape-1.jpg";

export const variants = [
  {
    id: 1,
    name: "বাইকুনুর",
    quantity: "১ টি",
    price: 360,
    image: grape1,
    color: "গাঢ় বেগুনি-লাল রঙের লম্বাটে ফল, গড় ওজন ১০-১২ গ্রাম",
    taste: "অত্যন্ত মিষ্টি (ব্রিক্স ১৯-২১%) ও সামান্য খাস্তা স্বাদের",
    seed: "সম্পূর্ণ বীজবিহীন জাত",
  },
  {
    id: 2,
    name: "বাইকুনুর",
    quantity: "২ টি",
    price: 700,
    image: grape1,
    color: "গাঢ় বেগুনি-লাল রঙের লম্বাটে ফল, গড় ওজন ১০-১২ গ্রাম",
    taste: "অত্যন্ত মিষ্টি (ব্রিক্স ১৯-২১%) ও সামান্য খাস্তা স্বাদের",
    seed: "সম্পূর্ণ বীজবিহীন জাত",
  },
  {
    id: 3,
    name: "বাইকুনুর",
    quantity: "৩ টি",
    price: 1000,
    image: grape1,
    color: "গাঢ় বেগুনি-লাল রঙের লম্বাটে ফল, গড় ওজন ১০-১২ গ্রাম",
    taste: "অত্যন্ত মিষ্টি (ব্রিক্স ১৯-২১%) ও সামান্য খাস্তা স্বাদের",
    seed: "সম্পূর্ণ বীজবিহীন জাত",
  },
];

function VariantCard({ variant }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-vine-light/20 bg-white/60 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={variant.image}
        alt={variant.name}
        className="aspect-square w-full rounded-2xl object-cover"
      />

      {/* Name + Quantity + Price */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl text-vine-dark">{variant.name}</h3>

        <div className="flex items-center gap-3 text-right">
          <p className="text-sm font-normal text-ink/60">{variant.quantity}</p>
          <p className="text-xl font-bold text-plum">৳{variant.price}</p>
        </div>
      </div>

      <div className="flex items-start gap-2 text-sm text-ink/70">
        <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
        <p>{variant.color}</p>
      </div>

      <div className="flex items-start gap-2 text-sm text-ink/70">
        <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
        <p>{variant.taste}</p>
      </div>

      <div className="flex items-start gap-2 text-sm text-ink/70">
        <Grape className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
        <p>{variant.seed}</p>
      </div>
    </div>
  );
}

export default function ProductVariants() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="প্রতিটি চারা ৩ ফুট উচ্চতার" title="আমাদের সেরা অফার" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {variants.map((variant) => (
          <VariantCard key={variant.id} variant={variant} />
        ))}
      </div>
    </section>
  );
}
