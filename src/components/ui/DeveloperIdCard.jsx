import { motion, useReducedMotion } from "framer-motion";
import { Brackets, Code2, IdCard, MapPin, ScanLine, Sparkles, Terminal, UserRound } from "lucide-react";

export default function DeveloperIdCard({ card }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="developer-id-wrap relative w-full max-w-[19.5rem] sm:max-w-[21rem]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.94 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.78, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="developer-id-lanyard" aria-hidden="true" />
      <div className="developer-id-clip" aria-hidden="true" />
      <motion.article
        className="developer-id-card glass-card group relative overflow-hidden px-4 pb-4 pt-5 sm:px-5 sm:pb-5"
        animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
        whileHover={prefersReducedMotion ? undefined : { y: -6, rotateX: 2, rotateY: -2 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.25, ease: "easeOut" }
            : {
                y: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 0.25, ease: "easeOut" },
                rotateY: { duration: 0.25, ease: "easeOut" },
              }
        }
      >
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/12 blur-3xl" />
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />

        <div className="developer-id-slot mx-auto mb-4" aria-hidden="true" />

        <div className="relative flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="font-mono inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase text-cyan-100">
            <IdCard size={14} aria-hidden="true" />
            {card.label}
          </div>
          <span className="font-mono rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
            {card.status}
          </span>
        </div>

        <div className="developer-id-portrait relative mt-4 overflow-hidden rounded-lg border border-cyan-200/14 bg-slate-950/52 p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(34,211,238,0.16),transparent_38%)]" />
          <div className="absolute left-4 top-4 text-cyan-100/45">
            <Terminal size={18} aria-hidden="true" />
          </div>
          <div className="absolute bottom-4 right-4 text-cyan-100/45">
            <Brackets size={18} aria-hidden="true" />
          </div>
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-200/18 bg-cyan-300/10 text-cyan-100 shadow-[0_0_45px_rgba(34,211,238,0.12)]">
            <UserRound size={38} strokeWidth={1.5} aria-hidden="true" />
            <span className="absolute -bottom-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-200/20 bg-slate-950 text-cyan-100">
              <Code2 size={18} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="relative mt-4 text-center">
          <p className="font-display text-4xl font-semibold leading-none text-white">{card.name}</p>
          <h3 className="mt-2 font-display text-lg font-semibold text-white">{card.fullName}</h3>
          <p className="mx-auto mt-2 max-w-64 text-xs font-semibold leading-5 text-cyan-100">{card.role}</p>
          <p className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300">
            <MapPin size={13} className="text-cyan-200" aria-hidden="true" />
            {card.location}
          </p>
        </div>

        <div className="relative mt-4 rounded-lg border border-white/10 bg-slate-950/40 p-3">
          <p className="font-mono flex items-center justify-center gap-2 text-center text-xs font-medium uppercase text-cyan-100/80">
            <Sparkles size={14} aria-hidden="true" />
            {card.availability}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {card.chips.map((chip) => (
              <span key={chip} className="font-mono rounded-full bg-white/[0.07] px-2.5 py-1 text-[0.68rem] font-medium text-slate-200">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="developer-id-barcode relative mt-4 flex items-end justify-center gap-1" aria-hidden="true">
          {[14, 24, 18, 30, 16, 26, 20, 12, 28, 17, 22, 15].map((height, index) => (
            <span key={`${height}-${index}`} style={{ height: `${height}px` }} />
          ))}
          <ScanLine className="ml-2 h-5 w-5 text-cyan-100/35" aria-hidden="true" />
        </div>
      </motion.article>
    </motion.div>
  );
}
