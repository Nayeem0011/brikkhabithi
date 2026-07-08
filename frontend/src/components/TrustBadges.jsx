import { ShieldCheck, PackageCheck, RotateCcw, Truck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const badges = [
  { icon: ShieldCheck, text: "সম্পূর্ণ প্রাকৃতিক ও বাছাইকৃত চারা" },
  { icon: PackageCheck, text: "পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন" },
  { icon: RotateCcw, text: "পছন্দ না হলে ফেরত বা পরিবর্তনযোগ্য" },
  { icon: Truck, text: "সারাদেশে ক্যাশ অন ডেলিভারি সুবিধা" },
];

export default function TrustBadges() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="আস্থা রাখুন, আস্থায় থাকুন" title="কেনাকাটায় নিশ্চিন্ত থাকুন" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex flex-col items-center gap-3 rounded-2xl border border-vine-light/20 bg-white/60 p-6 text-center shadow-sm"
          >
            <Icon className="h-8 w-8 text-vine" strokeWidth={1.5} />
            <p className="text-sm text-ink/70">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
