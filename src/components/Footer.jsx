import { Grape, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-vine-light/20 bg-vine-dark py-8 text-cream/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:px-6">
        <div className="flex items-center gap-2">
          <Grape className="h-6 w-6 text-gold-light" strokeWidth={1.5} />
          <span className="font-display text-lg text-cream">বৃক্ষবীথি নার্সারি</span>
        </div>
        <a href="tel:01700000000" className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4" />
          প্রয়োজনে কল করুন: 01744-483744
        </a>
        <p className="text-xs text-cream/50">© {new Date().getFullYear()} বৃক্ষবীথি নার্সারি — সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
}
