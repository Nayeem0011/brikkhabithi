import herobanar from "../assets/image/hero-banar.jpeg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-gold">
            ● ১০০% গুটি কলম চারা
          </span>

          <h1 className="font-display text-4xl leading-tight text-vine-dark sm:text-5xl">
            খাঁটি ফলের চারা, এখন আপনার দরজায়
          </h1>

          <p className="text-lg text-ink/70">
            ১০০% গুটি কলম পদ্ধতিতে তৈরি, সারাদেশে হোম ডেলিভারি — হাতে পেয়ে দাম পরিশোধ করুন
          </p>
          <a
            href="https://wa.me/8801744483744"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-2 rounded-full bg-vine px-6 py-3 font-semibold text-cream shadow-lg shadow-vine/20 transition hover:bg-vine-dark"
          >
            অর্ডার করতে চাই
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current transition group-hover:translate-x-1"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.59 1.45 5.12L2 22l5.13-1.34a9.87 9.87 0 0 0 4.91 1.31h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 12.04 2zm0 18.02h-.01a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.05.8.81-2.97-.2-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.49 3.66-8.15 8.15-8.15 2.18 0 4.22.85 5.76 2.39a8.09 8.09 0 0 1 2.39 5.76c0 4.49-3.66 8.15-8.15 8.15zm4.47-6.1c-.24-.12-1.45-.71-1.68-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
            </svg>
          </a>
        </div>
        <img
          src={herobanar}
          alt="ads"
          className="h-full w-full rounded-2xl objeoct-cver"
        />
      </div>
    </section>
  )
}

export default Hero
