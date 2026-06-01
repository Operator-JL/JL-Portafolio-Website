import { motion } from "framer-motion";
import { useId } from "react";

export default function JLMonogram({ compact = false, animated = false, className = "" }) {
  const rawId = useId().replace(/:/g, "");
  const panelGradient = `${rawId}-panel`;
  const borderGradient = `${rawId}-border`;
  const accentGradient = `${rawId}-accent`;
  const sizeClass = compact ? "h-10 w-10" : "h-52 w-52 sm:h-64 sm:w-64 lg:h-[22rem] lg:w-[22rem]";

  const monogram = (
    <div className={`relative ${sizeClass} ${className}`} aria-label="JL monogram" role="img">
      <div className="absolute -inset-4 rounded-[30%] bg-cyan-400/10 blur-3xl" />
      <div className="absolute inset-6 rounded-[28%] bg-sky-300/10 blur-2xl" />
      <svg
        className="relative h-full w-full drop-shadow-[0_30px_80px_rgba(14,165,233,0.26)]"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="26"
          y="26"
          width="268"
          height="268"
          rx="58"
          fill={`url(#${panelGradient})`}
          fillOpacity="0.9"
          stroke={`url(#${borderGradient})`}
          strokeWidth="2"
        />
        <rect x="43" y="43" width="234" height="234" rx="44" stroke="#FFFFFF" strokeOpacity="0.055" />
        <path d="M58 88H262" stroke="#7DD3FC" strokeOpacity="0.17" strokeWidth="2" />
        <path d="M58 232H262" stroke="#7DD3FC" strokeOpacity="0.12" strokeWidth="2" />
        <path d="M95 84V205C95 225 82 237 61 237" stroke="#F8FCFF" strokeWidth="24" strokeLinecap="round" />
        <path d="M154 84V232H252" stroke={`url(#${accentGradient})`} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id={panelGradient} x1="40" y1="38" x2="282" y2="292" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10213B" />
            <stop offset="0.5" stopColor="#071629" />
            <stop offset="1" stopColor="#020817" />
          </linearGradient>
          <linearGradient id={borderGradient} x1="48" y1="34" x2="284" y2="286" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BAF2FF" stopOpacity="0.58" />
            <stop offset="0.42" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="1" stopColor="#38BDF8" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id={accentGradient} x1="150" y1="80" x2="255" y2="236" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EAFBFF" />
            <stop offset="0.42" stopColor="#7DD3FC" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  if (!animated) {
    return monogram;
  }

  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, 0.4, 0] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {monogram}
    </motion.div>
  );
}
