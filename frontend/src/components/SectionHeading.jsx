const SectionHeading = ({ eyebrow, title, subtitle, align = "center", accent = "text-gold", }) => {

  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className={`text-sm font-semibold tracking-[0.2em] ${accent}`}>{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl text-vine-dark sm:text-4xl">{title}</h2>
      <svg viewBox="0 0 200 20" className={`h-4 w-28 ${accent}`} fill="none">
        <path
          d="M2 10 Q 50 -4, 100 10 T 198 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="38" cy="3.5" r="3" fill="currentColor" />
        <circle cx="162" cy="3.5" r="3" fill="currentColor" />
      </svg>
      {subtitle && <p className="max-w-xl text-ink/70">{subtitle}</p>}
    </div>
  )
}

export default SectionHeading;
