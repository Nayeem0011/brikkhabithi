import { ArrowRight } from "lucide-react";
import heroimage from "../assets/image/hero-image.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-gold">
            সীমিত সময়ের অফার
          </span>

          <h1 className="font-display text-4xl leading-tight text-vine-dark sm:text-5xl">
            ঘরে বসেই ফলান উন্নত মানের বিদেশি বাইকুনুর আঙুর
          </h1>

          <p className="text-lg text-ink/70">
            ছাদ, ব্যালকনি বা জমি — যেখানেই জায়গা থাকুক, পরিচর্যা কম লাগলেও ফলন হবে ভরপুর।
            ৩টি সেরা জাতের চারা একসাথে, রোপনের ৬-৭ মাসের মধ্যেই ফল পাবেন।
          </p>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-plum">৳৩৬০</span>
            <span className="text-lg text-ink/40 line-through">৳১০০০</span>
            <span className="rounded-full bg-plum/10 px-3 py-1 text-xs font-semibold text-plum">
              ৬৪% ছাড়
            </span>
          </div>

          <a
            href="#order"
            className="group flex w-fit items-center gap-2 rounded-full bg-vine px-6 py-3 font-semibold text-cream shadow-lg shadow-vine/20 transition hover:bg-vine-dark"
          >
            অর্ডার করতে চাই
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        <img
          src={heroimage}
          alt="ads"
          className="aspect-square w-full rounded-2xl objeoct-cver"
        />
      </div>
    </section>
  );
}
