import { motion, useReducedMotion } from "framer-motion";

export default function IntroScene({ intro }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="intro-scene relative mb-5 inline-flex max-w-full flex-col items-center overflow-hidden rounded-full border border-cyan-200/15 bg-black/35 px-4 py-2.5 text-center shadow-2xl shadow-slate-950/35 backdrop-blur-2xl sm:px-5 lg:items-start lg:text-left"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.14),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent" />

      <div className="relative">
        <motion.p
          className="font-display text-base font-bold text-white sm:text-lg"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        >
          {intro.greeting}
        </motion.p>
        <motion.p
          className="font-mono mt-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-cyan-100/78 sm:text-xs"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
        >
          {intro.welcome}
        </motion.p>
      </div>
    </motion.div>
  );
}
