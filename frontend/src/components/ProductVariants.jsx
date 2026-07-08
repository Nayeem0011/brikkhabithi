import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "../api";

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

// Sends the clicked product to the OrderSection (which is listening for
// this event) and smooth-scrolls the page down to the order form.
function addToOrderAndScroll(product) {
  window.dispatchEvent(
    new CustomEvent("add-to-order", { detail: { id: product.id } })
  );
  const el = document.getElementById("order");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <Loader2 className="h-10 w-10 animate-spin" style={{ color: "#1B5E3A" }} />
            <p className="text-base font-medium" style={{ color: "#1B5E3A" }}>
              পণ্য লোড হচ্ছে...
            </p>
          </div>
        )}
        {error && <p className="text-center text-sm text-red-600">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1.5 sm:gap-x-3 md:gap-x-5 gap-y-5 sm:gap-y-7 md:gap-y-10">
          {products.map((p) => (
            <Reveal key={p.id} className="p-tag-card rounded-md sm:rounded-lg md:rounded-xl">
              <div className="p-img-slot aspect-square flex items-center justify-center relative overflow-hidden">
                {p.image ? (
                  <img
                    src={api.imageUrl(p.image)}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg md:rounded-xl"
                  />
                ) : (
                  <LeafIcon className="w-10 h-10" style={{ color: "rgba(27,94,58,.35)" }} />
                )}

                {/* Price badge — top-right corner of the image */}
                <span
                  className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 rounded-full px-2 py-1 text-[10px] sm:text-xs font-extrabold shadow-md"
                  style={{ background: "#1B5E3A", color: "#FFFFFF" }}
                >
                  ৳{p.price}
                </span>
              </div>

              <div className="px-3 pt-3 pb-3">
                <h3 className="font-bold text-sm leading-snug" style={{ color: "#1A1A1A" }}>
                  {p.name}
                </h3>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: "#5E5E5E" }}>
                  {p.note}
                </p>

                <button
                  type="button"
                  onClick={() => addToOrderAndScroll(p)}
                  className="p-btn-green text-xs mt-3 inline-flex items-center justify-center w-full"
                >
                  অর্ডার করুন
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}