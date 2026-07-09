import herobanar from "../assets/image/hero-banar.jpeg";

const Hero = () => {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <span className="w-fit rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold tracking-wide text-gold">
            ● ১০০% গুটি কলম চারা
          </span>

          <h1 className="font-display text-3xl leading-tight text-vine-dark sm:text-4xl lg:text-5xl">
            খাঁটি ফলের চারা, এখন আপনার দরজায়
          </h1>

          <p className="max-w-md text-base text-ink/70 sm:text-lg lg:max-w-none">
            ১০০% গুটি কলম পদ্ধতিতে তৈরি, সারাদেশে হোম ডেলিভারি — হাতে পেয়ে দাম পরিশোধ করুন
          </p>

          <button
            type="button"
            onClick={scrollToOrder}
            className="group flex w-fit items-center gap-2 rounded-full bg-vine px-6 py-3 font-semibold text-cream shadow-lg shadow-vine/20 transition hover:bg-vine-dark"
          >
            অর্ডার
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current transition group-hover:translate-x-1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <img
          src={herobanar}
          alt="ফলের চারা"
          className="h-full w-full rounded-2xl object-cover sm:h-80 lg:h-full"
        />
      </div>
    </section>
  );
};

export default Hero;
