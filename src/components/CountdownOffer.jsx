import { useEffect, useState } from "react";
import { ArrowRight, Truck } from "lucide-react";

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownOffer() {
  // অফার শেষ হওয়ার সময়: এখন থেকে ৩ দিন পর। চাইলে নির্দিষ্ট তারিখ বসিয়ে দিতে পারো।
  const [target] = useState(() => Date.now() + 2 * 24 * 60 * 60 * 1000);
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const blocks = [
    { label: "দিন", value: time.days },
    { label: "ঘণ্টা", value: time.hours },
    { label: "মিনিট", value: time.minutes },
    { label: "সেকেন্ড", value: time.seconds },
  ];

  return (
    <section className="bg-vine-dark py-16 text-cream">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <span className="rounded-full bg-gold/20 px-4 py-1.5 text-sm font-semibold tracking-wide text-gold-light">
          সীমিত সময়ের জন্য
        </span>
        <h2 className="font-display text-3xl sm:text-4xl">আজকের অফার মূল্য মাত্র ৳৩৬০</h2>

        <div className="flex gap-3 sm:gap-4">
          {blocks.map((b) => (
            <div
              key={b.label}
              className="flex w-16 flex-col items-center rounded-xl bg-cream/10 py-3 sm:w-20"
            >
              <span className="font-display text-2xl sm:text-3xl">
                {String(b.value).padStart(2, "0")}
              </span>
              <span className="text-xs text-cream/70">{b.label}</span>
            </div>
          ))}
        </div>

        <p className="flex items-center gap-2 text-cream/80">
          <Truck className="h-4 w-4" />
          সারাদেশে হোম ডেলিভারি চার্জ মাত্র ৳২০০
        </p>

        <a
          href="#order"
          className="group flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-vine-dark transition hover:bg-gold-light"
        >
          অর্ডার করতে চাই
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
