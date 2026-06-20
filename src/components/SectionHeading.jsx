import VineDivider from "./VineDivider";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  accent = "text-gold",
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className={`text-sm font-semibold tracking-[0.2em] ${accent}`}>{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl text-vine-dark sm:text-4xl">{title}</h2>
      <VineDivider className={accent} />
      {subtitle && <p className="max-w-xl text-ink/70">{subtitle}</p>}
    </div>
  );
}
