import { motion } from "framer-motion";

export default function ServiceCard({ service, icon: Icon, index = 0 }) {
  return (
    <motion.article
      className="service-card glass-card group relative flex h-full min-h-72 flex-col overflow-hidden p-6"
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.48, delay: index * 0.08, ease: "easeOut" }}
    >
      <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl transition group-hover:bg-cyan-300/16" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent opacity-60 transition group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <motion.div
          className="service-card__icon flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/18 bg-cyan-300/10 text-cyan-100 shadow-lg shadow-cyan-950/20"
          whileHover={{ rotate: -4, scale: 1.06 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
        </motion.div>
        <span className="font-mono rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative z-10 mt-8 font-display text-2xl font-semibold text-white">{service.title}</h3>
      <p className="relative z-10 mt-4 flex-1 text-sm leading-7 text-slate-300">{service.text}</p>
      <div className="relative z-10 mt-6 h-px w-full bg-gradient-to-r from-cyan-200/50 via-white/10 to-transparent" />
    </motion.article>
  );
}
