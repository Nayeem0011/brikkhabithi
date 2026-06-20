import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    q: "আঙ্গুর গাছে কত মাসে ফল আসে?",
    a: "সাধারণত রোপনের ৬-৮ মাসের মধ্যে ফুল ও ফল আসতে শুরু করে।",
  },
  {
    q: "আমি বাসায় টবে চাষ করতে পারবো?",
    a: "অবশ্যই! টব, ড্রাম বা ছাদে খুব সহজেই এই চারা চাষ করা যায়।",
  },
  {
    q: "সার ও পানি কেমন লাগবে?",
    a: "নিয়মিত পানি আর সাধারণ জৈব সার ব্যবহার করলেই যথেষ্ট, বাড়তি যত্নের দরকার নেই।",
  },
  {
    q: "ডেলিভারি পেতে কতদিন সময় লাগবে?",
    a: "অর্ডার নিশ্চিত হওয়ার পর সাধারণত ২-৫ কার্যদিবসের মধ্যে সারাদেশে ডেলিভারি দেওয়া হয়।",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-vine/5 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="প্রায়শই জিজ্ঞাসিত প্রশ্ন" title="আপনার প্রশ্নের উত্তর" />

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-vine-light/20 bg-white/70"
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-vine-dark"
                >
                  {item.q}

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-plum transition-transform duration-500 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-ink/70">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
