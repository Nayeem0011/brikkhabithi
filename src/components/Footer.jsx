import navbarlogo from "../assets/image/footerlogo.png";

const WHATSAPP_NUMBER = "8801744483744";

const CONTACT = {
  phone: "০১৭৪৪-৪৮৩৭৪৪",
  address: "সারাদেশে হোম ডেলিভারি",
  // email: "brikkhobithi.example",
};

const SOCIAL = {
  facebook: "https://www.facebook.com/BrikkhaBithi",
  whatsapp: waLink("আমি বৃক্ষবীথি নার্সারি সম্পর্কে জানতে চাই।"),
};

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current transition group-hover:translate-x-1"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.59 1.45 5.12L2 22l5.13-1.34a9.87 9.87 0 0 0 4.91 1.31h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 12.04 2zm0 18.02h-.01a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.05.8.81-2.97-.2-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.49 3.66-8.15 8.15-8.15 2.18 0 4.22.85 5.76 2.39a8.09 8.09 0 0 1 2.39 5.76c0 4.49-3.66 8.15-8.15 8.15zm4.47-6.1c-.24-.12-1.45-.71-1.68-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
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

const Footer = () => {
  return (
    <div style={{ fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif" }}>
      {/* ---------- Footer ---------- */}
      <footer id="contact" className="f-root px-5 pt-16 pb-8" style={{ background: "#0E3322", color: "#FBF8F1" }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-10">
          <div>
            <div className="flex gap-2 mb-3">
              <img src={navbarlogo} alt="loto" className="w-[100px] h-auto object-cover" />
            </div>
            <p className="text-sm" style={{ color: "rgba(251,248,241,.7)" }}>
              খাঁটি গুটি কলম ফলের চারা, সরাসরি আমাদের বাগান থেকে আপনার দরজায়।
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide" style={{ color: "#F4CC8C" }}>
              যোগাযোগ
            </h4>
            <ul className="text-sm space-y-2" style={{ color: "rgba(251,248,241,.85)" }}>
              <li>📞 {CONTACT.phone}</li>
              <li>📍 {CONTACT.address}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide" style={{ color: "#F4CC8C" }}>
              সোশ্যাল
            </h4>
            <div className="flex gap-3">
              <a
                href={SOCIAL.facebook}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(251,248,241,.1)" }}
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL.whatsapp}
                aria-label="whatsapp"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(251,248,241,.1)" }}
              >
                <ChatIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-xs mt-12" style={{ color: "rgba(251,248,241,.5)" }}>
          © {new Date().getFullYear()} বৃক্ষবীথি নার্সারি। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </footer>
    </div>
  )
}

export default Footer
