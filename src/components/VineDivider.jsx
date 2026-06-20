export default function VineDivider({ className = "" }) {
  return (
    <svg viewBox="0 0 200 20" className={`h-4 w-28 ${className}`} fill="none">
      <path
        d="M2 10 Q 50 -4, 100 10 T 198 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="38" cy="3.5" r="3" fill="currentColor" />
      <circle cx="162" cy="3.5" r="3" fill="currentColor" />
    </svg>
  );
}
