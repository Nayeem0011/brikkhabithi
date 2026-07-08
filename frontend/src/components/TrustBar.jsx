import { useEffect, useRef, useState } from "react";

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

function TruckIcon({ className = "", ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="1.5" y="7" width="12" height="9" rx="1" />
      <path d="M13.5 10h4l3 3v3h-7v-6Z" />
      <circle cx="6" cy="18" r="1.7" />
      <circle cx="16.5" cy="18" r="1.7" />
    </svg>
  );
}

function ShieldIcon({ className = "", ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <path d="M12 2.5 4 5.5v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10v-6L12 2.5Z" />
      <path d="M8.5 12.2 11 14.7l4.8-5" />
    </svg>
  );
}

function CoinIcon({ className = "", ...rest }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" {...rest}>
      <circle cx="12" cy="12" r="9" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none" fontFamily="inherit">
        ৳
      </text>
    </svg>
  );
}

const ITEMS = [
  { Icon: LeafIcon, label: "১০০% গুটি কলম" },
  { Icon: TruckIcon, label: "সারাদেশে ডেলিভারি" },
  { Icon: ShieldIcon, label: "রিপ্লেসমেন্ট গ্যারান্টি" },
  { Icon: CoinIcon, label: "COD সুবিধা" },
];

export default function TrustBar() {
  const [ref] = useReveal();

  return (
    <section
      style={{
        background: "#F2EAD9",
        borderTop: "1px solid rgba(27,94,58,.12)",
        borderBottom: "1px solid rgba(27,94,58,.12)",
        fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
      }}
      className="py-8 px-5"
    >
      <div
        ref={ref}
        className={` max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center`}
      >
        {ITEMS.map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon className="w-8 h-8" style={{ color: "#1B5E3A" }} />
            <span className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}