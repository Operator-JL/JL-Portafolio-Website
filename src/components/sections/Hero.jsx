import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import DeveloperIdCard from "../ui/DeveloperIdCard";
import IntroScene from "./IntroScene";

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" },
  },
};

export default function Hero({ hero, onOpenWhatsApp }) {
  const scrollToServices = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="hero-section section-container min-h-[100svh] pt-24 pb-6">
      <div className="hero-composition grid w-full items-center gap-8 rounded-[2rem] border border-white/10 bg-black/20 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-sm sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-7">
        <motion.div
          className="relative order-1 z-10 text-center lg:text-left"
          variants={revealContainer}
          initial="hidden"
          animate="visible"
        >
          <IntroScene intro={hero.intro} />

          <motion.div
            className="font-mono mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium text-cyan-100/90 shadow-lg shadow-cyan-950/20 backdrop-blur-xl"
            variants={revealItem}
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.85)]" />
            {hero.badge}
          </motion.div>

          <motion.h1
            className="font-display text-4xl font-extrabold leading-[0.95] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            variants={revealItem}
          >
            <span className="gradient-text">{hero.title}</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-lg font-semibold text-cyan-100/90 sm:text-2xl"
            variants={revealItem}
          >
            {hero.subtitle}
          </motion.p>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg lg:mx-0"
            variants={revealItem}
          >
            {hero.text}
          </motion.p>

          <motion.div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start" variants={revealItem}>
            {hero.chips.map((chip) => (
              <span
                key={chip}
                className="font-mono rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 shadow-lg shadow-slate-950/10 backdrop-blur-xl"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            variants={revealItem}
          >
            <button
              type="button"
              className="premium-button inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:w-auto"
              onClick={scrollToServices}
            >
              {hero.primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/20 backdrop-blur-xl transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:shadow-cyan-950/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:w-auto"
              onClick={onOpenWhatsApp}
            >
              <MessageCircle size={18} aria-hidden="true" />
              {hero.secondaryCta}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-2 z-10 flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.78, delay: 0.5, ease: "easeOut" }}
        >
          <DeveloperIdCard card={hero.developerCard} />
        </motion.div>
      </div>
    </section>
  );
}
