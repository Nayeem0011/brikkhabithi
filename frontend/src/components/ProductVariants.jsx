import { useEffect, useRef, useState } from "react";
import { api } from "../api";

const WHATSAPP_NUMBER = "8801744483744";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .catch(() => setError("পণ্যের তালিকা লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, []);

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

        {loading && <p className="text-center text-sm text-ink/60">পণ্য লোড হচ্ছে...</p>}
        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1.5 sm:gap-x-3 md:gap-x-5 gap-y-5 sm:gap-y-7 md:gap-y-10">
          {products.map((p) => (
            <Reveal key={p.id} className="p-tag-card rounded-md sm:rounded-lg md:rounded-xl">
              <div className="p-img-slot aspect-square flex items-center justify-center relative">
                {p.image ? (
                  <img
                    src={api.imageUrl(p.image)}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg md:rounded-xl"
                  />
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
                <p className="text-xs mt-1 font-semibold" style={{ color: "#1B5E3A" }}>
                  ৳{p.price}.00
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
