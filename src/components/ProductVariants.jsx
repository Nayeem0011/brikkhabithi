import { useEffect, useRef, useState } from "react";

import product from "../assets/image/product.jpg";
import product1 from "../assets/image/product1.jpg";
import product2 from "../assets/image/product2.jpg";
import product3 from "../assets/image/product3.jpg";
import product4 from "../assets/image/product4.jpg";
import product5 from "../assets/image/product5.jpg";
import product6 from "../assets/image/product6.jpg";
import product7 from "../assets/image/product7.jpg";

const WHATSAPP_NUMBER = "8801744483744";

const PRODUCTS = [
  { id: 1, name: "বাইকুনুর আঙুর চারা", note: "মিষ্টি, বীজবিহীন জাত", image: product },
  { id: 2, name: "বোম্বাই লিচু চারা", note: "ছোট দানা, রসালো", image: product1 },
  { id: 3, name: "ড্রাগন ফ্রুট চারা", note: "লাল মাংসল জাত", image: product2 },
  { id: 4, name: "আমের চারা", note: "দ্রুত ও নিয়মিত ফলন", image: product3 },
  { id: 5, name: "মাল্টা ও কমলা", note: "রসালো, কমলা স্বাদ", image: product4 },
  { id: 6, name: "স্ট্রবেরি পেয়ারা চারা", note: "মুচমুচে ও মিষ্টি", image: product5 },
  { id: 7, name: "আপেল কুল", note: "মিষ্টি স্বাদ", image: product6 },
  { id: 8, name: "কাগজি লেবু চারা", note: "সারা বছর ফলনশীল", image: product7 },
];

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`p-reveal ${visible ? "p-reveal-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function LeafIcon({ className = "", ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M12 2.5C6.5 2.5 2.5 7.2 2.5 12.8c0 4.6 3.4 8.2 7.8 8.7.4-6.4 2.6-9.8 9.9-12C19.9 5.4 16.3 2.5 12 2.5Z"
        fill="currentColor"
      />
      <path d="M10.3 21.3C10.6 14.9 12.6 11 19.8 8.4" stroke="white" strokeOpacity="0.45" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8 8 0 0 1-9.8 7.8L4 21l1.7-5.1A8 8 0 1 1 21 11.5Z" />
      <path d="M8.3 11.5h7.4M8.3 8.6h5.2" />
    </svg>
  );
}

export default function ProductVariants() {

  return (
    <section
      className="px-2 sm:px-3 md:px-5 py-20"
      style={{
        background: "linear-gradient(180deg, #FBF8F1 0%, #EFE2C9 100%)",
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
      }}
    >

      <div className="p-root max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="p-eyebrow">তাজা ও সতেজ</p>
          <h2 className="text-2xl md:text-4xl font-extrabold mt-2" style={{ color: "#0E3322" }}>
            আমাদের চারা
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1.5 sm:gap-x-3 md:gap-x-5 gap-y-5 sm:gap-y-7 md:gap-y-10">
          {PRODUCTS.map((p) => (
            <Reveal key={p.id} className="p-tag-card rounded-md sm:rounded-lg md:rounded-xl">
              <div className="p-img-slot aspect-square flex items-center justify-center relative">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-md sm:rounded-lg md:rounded-xl" />
                ) : (
                  <LeafIcon className="w-10 h-10" style={{ color: "rgba(27,94,58,.35)" }} />
                )}
              </div>
              <div className="px-3 pt-3">
                <h3 className="font-bold text-sm leading-snug" style={{ color: "#1A1A1A" }}>
                  {p.name}
                </h3>
                <p className="text-xs mt-1" style={{ color: "#5E5E5E" }}>
                  {p.note}
                </p>
                <a
                  href={waLink(`আমি ${p.name} সম্পর্কে জানতে চাই। দাম: ৳${p.price}`)}
                  className="p-btn-green text-xs mt-3 inline-flex items-center gap-1 md:gap-1.5 w-full justify-center"
                >
                  <ChatIcon className="w-3.5 h-3.5" />
                  অর্ডার করুন
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
