import { Phone } from "lucide-react";
import navbarlogo from "../assets/image/navbarlogo.png";

const Header = () => {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-vine-light/20 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <img src={navbarlogo} alt="loto" className="w-[110px] h-auto object-cover" />
        </a>

        <div className="flex items-center gap-3">
          <a
            href="tel:01700000000"
            className="hidden items-center gap-2 text-sm font-medium text-vine-dark sm:flex"
          >
            <Phone className="h-4 w-4" />
            01744-483744
          </a>

          <button
            type="button"
            onClick={scrollToOrder}
            className="group flex w-fit items-center gap-1 rounded-full bg-vine px-4 py-2 text-sm font-semibold text-cream shadow-lg shadow-vine/20 transition hover:bg-vine-dark"
          >
            অর্ডার করুন
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current transition group-hover:translate-x-1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
