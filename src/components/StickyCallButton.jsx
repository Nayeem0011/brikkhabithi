import { Phone } from "lucide-react";

export default function StickyCallButton() {
  return (
    <a
      href="tel:01700000000"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-plum px-5 py-3 font-semibold text-cream shadow-lg shadow-plum/30 md:hidden"
    >
      <Phone className="h-4 w-4" />
      কল করুন
    </a>
  );
}
