import { Grape, Phone } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-vine-light/20 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <Grape className="h-7 w-7 text-plum" strokeWidth={1.5} />
          <span className="font-display text-xl text-vine-dark">বৃক্ষবীথি নার্সারি</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="tel:01700000000"
            className="hidden items-center gap-2 text-sm font-medium text-vine-dark sm:flex"
          >
            <Phone className="h-4 w-4" />
            01744-483744
          </a>
          <a
            href="#order"
            className="rounded-full bg-vine px-4 py-2 text-sm font-semibold text-cream transition hover:bg-vine-dark"
          >
            অর্ডার করুন
          </a>
        </div>
      </div>
    </header>
  );
}
