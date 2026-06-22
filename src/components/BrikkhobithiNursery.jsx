import { useEffect, useRef, useState } from "react";

/* ============================================================
   বৃক্ষবীথি নার্সারি — Landing Page
   --------------------------------------------------------------
   এডিট করার জায়গা (TODO):
   1) WHATSAPP_NUMBER — নিচে আপনার আসল WhatsApp নম্বর বসান (দেশের কোড সহ, যেমন 8801XXXXXXXXX)
   2) PRODUCTS — পণ্যের তালিকা, দাম, ছবি (image: এ আপনার ছবির URL দিন)
   3) REVIEWS — আসল কাস্টমার রিভিউ দিয়ে পরিবর্তন করুন
   4) HERO_IMAGE / ABOUT_IMAGE — আপনার বাগানের আসল ছবি/ভিডিও দিয়ে প্রতিস্থাপন করুন
   5) CONTACT — ফোন, ঠিকানা, ইমেইল, সোশ্যাল লিংক
   ============================================================ */

const WHATSAPP_NUMBER = "8801XXXXXXXXX"; // TODO: আসল নম্বর বসান

const PRODUCTS = [
  { id: 1, name: "বাইকুনুর আঙুর চারা", price: 350, note: "মিষ্টি, বীজবিহীন জাত", image: "" },
  { id: 2, name: "কাঠগোলা লেবু চারা", price: 120, note: "সারা বছর ফলনশীল", image: "" },
  { id: 3, name: "ড্রাগন ফ্রুট চারা", price: 250, note: "লাল মাংসল জাত", image: "" },
  { id: 4, name: "থাই কাটিমন আম চারা", price: 300, note: "দ্রুত ও নিয়মিত ফলন", image: "" },
  { id: 5, name: "থাই পেয়ারা চারা", price: 150, note: "মুচমুচে ও মিষ্টি", image: "" },
  { id: 6, name: "বারি মাল্টা-১ চারা", price: 400, note: "রসালো, কমলা স্বাদ", image: "" },
  { id: 7, name: "চায়না-৩ লিচু চারা", price: 450, note: "বড় দানা, রসালো", image: "" },
  { id: 8, name: "জাম্বুরা চারা", price: 200, note: "টক-মিষ্টি স্বাদ", image: "" },
];

const REVIEWS = [
  { name: "রাকিবুল ইসলাম", area: "কুষ্টিয়া", stars: 5, text: "চারাগুলো খুবই সতেজ ছিল, মাত্র কয়েক দিনেই হাতে পেয়েছি। এখন নতুন পাতা ছাড়ছে।" },
  { name: "সুমাইয়া আক্তার", area: "বগুড়া", stars: 5, text: "COD সুবিধা থাকায় নিশ্চিন্তে অর্ডার করেছিলাম। প্যাকেজিং খুব যত্ন করে করা হয়েছিল।" },
  { name: "আব্দুল কাদের", area: "যশোর", stars: 4, text: "WhatsApp-এ মেসেজ দেওয়ার সাথে সাথেই উত্তর পেয়েছি। চারার মান নিয়ে কোনো অভিযোগ নেই।" },
  { name: "নাজমুল হক", area: "টাঙ্গাইল", stars: 5, text: "আগে অন্য জায়গা থেকে ঠকেছি। এখানের গুটি কলম চারা আসলেই খাঁটি মনে হলো।" },
];

const PROCESS = [
  { step: "১", title: "পণ্য বেছে নিন", text: "তালিকা থেকে পছন্দের চারা বেছে নিন" },
  { step: "২", title: "WhatsApp করুন", text: "এক ক্লিকে অর্ডার মেসেজ পাঠান" },
  { step: "৩", title: "ডেলিভারি পান", text: "দরজায় বুঝে নিন, COD-তে পেমেন্ট করুন" },
];

function toBn(num) {
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num)
    .split("")
    .map((c) => (c >= "0" && c <= "9" ? digits[c.charCodeAt(0) - 48] : c))
    .join("");
}

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
    <Tag ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------------- Icons (generic, hand-drawn-simple line icons) ---------------- */

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

function ChatIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8 8 0 0 1-9.8 7.8L4 21l1.7-5.1A8 8 0 1 1 21 11.5Z" />
      <path d="M8.3 11.5h7.4M8.3 8.6h5.2" />
    </svg>
  );
}

function StarIcon({ filled = true, className = "" }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
      <path d="M10 1.5 12.6 7l6 .9-4.3 4.2 1 6-5.3-2.8L4.7 18l1-6L1.4 7.9l6-.9L10 1.5Z" />
    </svg>
  );
}

function ArrowIcon({ dir = "right", className = "", style, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: dir === "left" ? "scaleX(-1)" : "none", ...style }}
      {...rest}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function FacebookIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14 22v-8h2.7l.4-3.2H14V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2C17 4.1 15.9 4 14.6 4 11.9 4 10 5.6 10 8.4v2.4H7v3.2h3V22h4Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------------- Decorative botanical hero illustration ---------------- */

function HeroArt() {
  return (
    <svg viewBox="0 0 600 600" className="hero-art" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5" stroke="#FBF8F1" strokeWidth="2" fill="none">
        <path d="M40 560C140 420 120 260 260 140" />
        <path d="M260 140c0 60-30 90-90 100" />
        <path d="M260 140c40 20 50 60 30 110" />
        <path d="M40 560c60-10 90-40 100-90" />
        <path d="M40 560c10-60 40-90 90-100" />
      </g>
      <g opacity="0.35" fill="#FBF8F1">
        <ellipse cx="430" cy="120" rx="70" ry="34" transform="rotate(28 430 120)" />
        <ellipse cx="500" cy="210" rx="55" ry="26" transform="rotate(-15 500 210)" />
        <ellipse cx="120" cy="430" rx="40" ry="20" transform="rotate(60 120 430)" />
      </g>
    </svg>
  );
}

/* ---------------- App ---------------- */

export default function Apps() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const reviewTrack = useRef(null);
  const scrollReviews = (dir) => {
    if (reviewTrack.current) {
      reviewTrack.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bb-root">
      <style>{`
        :root{
          --green-primary:#1B5E3A;
          --green-light:#4CAF6D;
          --green-deep:#0E3322;
          --cream:#FBF8F1;
          --cream-soft:#F2EAD9;
          --ink:#1A1A1A;
          --gray:#5E5E5E;
          --gold:#E8A33D;
          --gold-soft:#F4CC8C;
          --clay:#8B5E3C;
        }
        .bb-root{
          font-family:'Hind Siliguri', 'Noto Sans Bengali', sans-serif;
          background:var(--cream);
          color:var(--ink);
          scroll-behavior:smooth;
          overflow-x:hidden;
        }
        .bb-root a, .bb-root button{ font-family:inherit; }
        .bb-root :focus-visible{ outline:3px solid var(--gold); outline-offset:3px; border-radius:4px; }

        .eyebrow{
          color:var(--green-primary);
          font-weight:700;
          letter-spacing:.08em;
          font-size:.8rem;
        }
        .eyebrow::before{ content:"●"; color:var(--gold); margin-right:.5rem; font-size:.55rem; vertical-align:middle; }

        .btn-gold{
          background:var(--gold);
          color:var(--green-deep);
          font-weight:700;
          border-radius:999px;
          padding:.95rem 1.9rem;
          box-shadow:0 10px 26px rgba(232,163,61,.35);
          transition:transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .btn-gold:hover{ transform:translateY(-2px); background:var(--gold-soft); box-shadow:0 14px 30px rgba(232,163,61,.42); }

        .btn-green{
          background:var(--green-primary);
          color:var(--cream);
          font-weight:700;
          border-radius:999px;
          padding:.7rem 1.4rem;
          box-shadow:0 8px 18px rgba(27,94,58,.22);
          transition:transform .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .btn-green:hover{ transform:translateY(-2px); background:var(--green-deep); }

        .hero-wrap{
          background:linear-gradient(135deg, var(--green-deep) 0%, var(--green-primary) 55%, #226b46 100%);
          position:relative;
          overflow:hidden;
        }
        .hero-art{ position:absolute; inset:0; width:100%; height:100%; opacity:.8; pointer-events:none; }
        .hero-leaf{
          position:absolute;
          color:var(--green-light);
          opacity:.5;
        }
        @media (prefers-reduced-motion: no-preference){
          .hero-leaf{ animation:sway 6s ease-in-out infinite; }
          .scroll-cue{ animation:bob 1.8s ease-in-out infinite; }
        }
        @keyframes sway{ 0%,100%{ transform:rotate(-6deg);} 50%{ transform:rotate(6deg);} }
        @keyframes bob{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(8px);} }

        .trust-band{
          background:var(--cream-soft);
          border-top:1px solid rgba(27,94,58,.12);
          border-bottom:1px solid rgba(27,94,58,.12);
        }

        .soil-strip{
          background:linear-gradient(180deg, var(--cream) 0%, #EFE2C9 100%);
        }

        .tag-card{
          background:var(--cream);
          border:1.5px solid rgba(27,94,58,.16);
          clip-path: polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%);
          padding-bottom:2.5rem;
          box-shadow:0 6px 18px rgba(14,51,34,.08);
          transition:transform .25s ease, box-shadow .25s ease;
        }
        .tag-card:hover{ transform:translateY(-5px); box-shadow:0 14px 28px rgba(14,51,34,.16); }

        .img-slot{
          background:radial-gradient(circle at 30% 30%, #E7F2EA, var(--cream-soft));
          border:1px dashed rgba(27,94,58,.3);
        }

        .price-badge{
          background:var(--gold);
          color:var(--green-deep);
          font-weight:700;
        }

        .review-card{
          scroll-snap-align:center;
          background:var(--cream);
          border:1px solid rgba(27,94,58,.14);
          box-shadow:0 6px 16px rgba(14,51,34,.07);
        }

        .process-node{
          background:var(--green-primary);
          color:var(--cream);
          font-weight:800;
        }

        .wa-float{
          position:fixed;
          right:1.25rem;
          bottom:1.25rem;
          z-index:50;
          background:var(--green-primary);
          color:var(--cream);
          box-shadow:0 10px 24px rgba(14,51,34,.35);
        }
        @media (prefers-reduced-motion: no-preference){
          .wa-float::before{
            content:"";
            position:absolute;
            inset:0;
            border-radius:999px;
            background:var(--green-primary);
            animation:pulse 2.4s ease-out infinite;
            z-index:-1;
          }
        }
        @keyframes pulse{
          0%{ transform:scale(1); opacity:.55; }
          100%{ transform:scale(1.9); opacity:0; }
        }

        .reveal{ opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease; }
        .reveal-visible{ opacity:1; transform:translateY(0); }
        @media (prefers-reduced-motion: reduce){
          .reveal{ opacity:1; transform:none; transition:none; }
          .hero-leaf, .scroll-cue, .wa-float::before{ animation:none !important; }
        }

        .no-scrollbar::-webkit-scrollbar{ display:none; }
        .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>

      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "var(--cream)", borderColor: "rgba(27,94,58,.12)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2">
            <LeafIcon className="w-7 h-7" style={{ color: "var(--green-primary)" }} />
            <span className="font-bold text-lg" style={{ color: "var(--green-deep)" }}>
              বৃক্ষবীথি নার্সারি
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "var(--gray)" }}>
            <a href="#products" className="hover:text-current">পণ্য</a>
            <a href="#about" className="hover:text-current">আমাদের বাগান</a>
            <a href="#reviews" className="hover:text-current">রিভিউ</a>
            <a href="#contact" className="hover:text-current">যোগাযোগ</a>
          </nav>
          <a href={waLink("আমি বৃক্ষবীথি নার্সারি থেকে চারা সম্পর্কে জানতে চাই।")} className="btn-green text-sm flex items-center gap-2">
            <ChatIcon className="w-4 h-4" />
            অর্ডার করুন
          </a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section id="top" className="hero-wrap px-5 pt-16 pb-24 md:pt-24 md:pb-32 relative">
        <HeroArt />
        <LeafIcon className="hero-leaf w-16 h-16" style={{ top: "12%", left: "8%" }} />
        <LeafIcon className="hero-leaf w-10 h-10" style={{ bottom: "18%", right: "12%" }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-sm font-semibold tracking-wide mb-4" style={{ color: "var(--gold-soft)" }}>
            ● ১০০% গুটি কলম চারা
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight" style={{ color: "var(--cream)" }}>
            খাঁটি ফলের চারা,
            <br />
            এখন আপনার দরজায়
          </h1>
          <p className="mt-5 text-base md:text-lg" style={{ color: "rgba(251,248,241,.85)" }}>
            ১০০% গুটি কলম পদ্ধতিতে তৈরি, সারাদেশে হোম ডেলিভারি — হাতে পেয়ে দাম পরিশোধ করুন
          </p>
          <div className="mt-9">
            <a href={waLink("আমি একটি চারা অর্ডার করতে চাই।")} className="btn-gold inline-flex items-center gap-2 text-base">
              <ChatIcon className="w-5 h-5" />
              WhatsApp-এ অর্ডার করুন
            </a>
          </div>
        </div>
        <div className="scroll-cue flex justify-center mt-14">
          <ArrowIcon dir="down" className="w-6 h-6" style={{ color: "rgba(251,248,241,.6)", transform: "rotate(90deg)" }} />
        </div>
      </section>

      {/* ---------- Trust bar ---------- */}
      <section className="trust-band py-8 px-5">
        <Reveal className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { Icon: LeafIcon, label: "১০০% গুটি কলম" },
            { Icon: TruckIcon, label: "সারাদেশে ডেলিভারি" },
            { Icon: ShieldIcon, label: "রিপ্লেসমেন্ট গ্যারান্টি" },
            { Icon: CoinIcon, label: "COD সুবিধা" },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="w-8 h-8" style={{ color: "var(--green-primary)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {label}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ---------- Products ---------- */}
      <section id="products" className="soil-strip px-5 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="eyebrow">তাজা ও সতেজ</p>
            <h2 className="text-2xl md:text-4xl font-extrabold mt-2" style={{ color: "var(--green-deep)" }}>
              আমাদের চারা
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {PRODUCTS.map((p) => (
              <Reveal key={p.id} className="tag-card">
                <div className="img-slot aspect-square flex items-center justify-center relative">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <LeafIcon className="w-10 h-10" style={{ color: "rgba(27,94,58,.35)" }} />
                  )}
                  <span className="price-badge absolute top-2 right-2 text-xs px-2 py-1 rounded-full">
                    ৳{toBn(p.price)}
                  </span>
                </div>
                <div className="px-3 pt-3">
                  <h3 className="font-bold text-sm leading-snug" style={{ color: "var(--ink)" }}>
                    {p.name}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: "var(--gray)" }}>
                    {p.note}
                  </p>
                  <a
                    href={waLink(`আমি ${p.name} সম্পর্কে জানতে চাই। দাম: ৳${p.price}`)}
                    className="btn-green text-xs mt-3 inline-flex items-center gap-1.5 w-full justify-center"
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

      {/* ---------- About ---------- */}
      <section id="about" className="px-5 py-20" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Reveal className="img-slot rounded-2xl aspect-video flex items-center justify-center order-2 md:order-1">
            <div className="flex flex-col items-center gap-2" style={{ color: "rgba(27,94,58,.45)" }}>
              <LeafIcon className="w-10 h-10" />
              <span className="text-xs font-medium">বাগানের ভিডিও এখানে যুক্ত হবে</span>
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2">
            <p className="eyebrow">আমাদের গল্প</p>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2 mb-4" style={{ color: "var(--green-deep)" }}>
              আমাদের বাগান
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--gray)" }}>
              বৃক্ষবীথি নার্সারি বছরের পর বছর ধরে যত্ন সহকারে গুটি কলম পদ্ধতিতে ফলের চারা তৈরি করে আসছে। প্রতিটি চারা আমাদের নিজস্ব বাগানে প্রস্তুত করা হয়, যাতে গাছ দ্রুত শিকড় ধরে এবং সময়মতো ফল দেয়। স্টক ছবি নয় — আপনি যা দেখছেন, তা আমাদের বাগানেরই বাস্তব চিত্র।
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section id="reviews" className="px-5 py-20" style={{ background: "var(--cream-soft)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="eyebrow">কাস্টমার বলছেন</p>
              <h2 className="text-2xl md:text-4xl font-extrabold mt-2" style={{ color: "var(--green-deep)" }}>
                রিভিউ
              </h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollReviews(-1)} aria-label="আগের রিভিউ" className="btn-green p-2 rounded-full">
                <ArrowIcon dir="left" className="w-4 h-4" />
              </button>
              <button onClick={() => scrollReviews(1)} aria-label="পরের রিভিউ" className="btn-green p-2 rounded-full">
                <ArrowIcon dir="right" className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
          <div ref={reviewTrack} className="flex gap-5 overflow-x-auto no-scrollbar pb-4" style={{ scrollSnapType: "x mandatory" }}>
            {REVIEWS.map((r) => (
              <div key={r.name} className="review-card flex-shrink-0 w-72 rounded-xl p-5">
                <div className="flex gap-1 mb-3" style={{ color: "var(--gold)" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < r.stars} className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
                  {r.text}
                </p>
                <p className="text-xs mt-4 font-semibold" style={{ color: "var(--green-primary)" }}>
                  {r.name} · {r.area}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section id="process" className="px-5 py-20" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="eyebrow">৩টি সহজ ধাপ</p>
            <h2 className="text-2xl md:text-4xl font-extrabold mt-2" style={{ color: "var(--green-deep)" }}>
              কিভাবে অর্ডার করবেন
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-8">
            {PROCESS.map((s) => (
              <Reveal key={s.step} className="text-center">
                <div className="process-node w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg">
                  {s.step}
                </div>
                <h3 className="font-bold mb-1" style={{ color: "var(--ink)" }}>
                  {s.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--gray)" }}>
                  {s.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer id="contact" className="px-5 pt-16 pb-28" style={{ background: "var(--green-deep)", color: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LeafIcon className="w-6 h-6" style={{ color: "var(--green-light)" }} />
              <span className="font-bold">বৃক্ষবীথি নার্সারি</span>
            </div>
            <p className="text-sm" style={{ color: "rgba(251,248,241,.7)" }}>
              খাঁটি গুটি কলম ফলের চারা, সরাসরি আমাদের বাগান থেকে আপনার দরজায়।
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide" style={{ color: "var(--gold-soft)" }}>
              যোগাযোগ
            </h4>
            <ul className="text-sm space-y-2" style={{ color: "rgba(251,248,241,.85)" }}>
              <li>📞 ০১XXX-XXXXXX</li>
              <li>📍 ঠিকানা এখানে বসবে</li>
              <li>✉️ info@brikkhobithi.example</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide" style={{ color: "var(--gold-soft)" }}>
              সোশ্যাল
            </h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(251,248,241,.1)" }}>
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(251,248,241,.1)" }}>
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-xs mt-12" style={{ color: "rgba(251,248,241,.5)" }}>
          © {new Date().getFullYear()} বৃক্ষবীথি নার্সারি। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </footer>

      {/* ---------- Floating WhatsApp ---------- */}
      <a
        href={waLink("আমি বৃক্ষবীথি নার্সারি থেকে চারা অর্ডার করতে চাই।")}
        className="wa-float w-14 h-14 rounded-full flex items-center justify-center relative"
        aria-label="WhatsApp-এ অর্ডার করুন"
      >
        <ChatIcon className="w-6 h-6" />
      </a>
    </div>
  );
}
