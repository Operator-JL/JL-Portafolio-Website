import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, subtitle, align = "center" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      className={`flex max-w-3xl flex-col gap-4 ${alignment}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {eyebrow ? (
        <span className="font-mono inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase text-cyan-200">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display max-w-4xl text-4xl font-bold leading-[0.98] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle ? <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{subtitle}</p> : null}
    </motion.div>
  );
}
