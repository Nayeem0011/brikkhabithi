export default function FeatureList({ items, accent = "vine" }) {
  const accentClasses =
    accent === "vine"
      ? "bg-vine/10 text-vine"
      : "bg-plum/10 text-plum";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(({ icon: Icon, title, text }, i) => (
        <div
          key={i}
          className="flex gap-4 rounded-xl border border-vine-light/20 bg-white/60 p-4 shadow-sm transition hover:shadow-md"
        >
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${accentClasses}`}>
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-semibold text-ink">{title}</h3>
            <p className="mt-1 text-sm text-ink/70">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
