import { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CountdownOffer = () => {
  const [target] = useState(() => Date.now() + 2 * 24 * 60 * 60 * 1000);
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

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

        <h2 className="font-display text-3xl sm:text-4xl">
          এখনই অর্ডার করুন, সেরা অফার পান
        </h2>

        <p className="max-w-md text-cream/70 text-base leading-relaxed">
          এই অফার শুধুমাত্র সীমিত সময়ের জন্য। সময় শেষ হওয়ার আগেই সুযোগ নিন।
        </p>

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

        <button
          type="button"
          onClick={scrollToOrder}
          className="group flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-cream transition hover:bg-gold-light"
        >
          অর্ডার করতে
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-current transition group-hover:translate-x-1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CountdownOffer;
