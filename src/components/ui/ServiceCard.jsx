import { motion } from "framer-motion";

export default function ServiceCard({ service, icon: Icon, index = 0 }) {
  return (
    <motion.article
      className="service-card glass-card group relative flex h-full flex-col overflow-hidden p-6"
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={{ y: -7 }}
      transition={{ duration: 0.48, delay: index * 0.08, ease: "easeOut" }}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent opacity-0 transition group-hover:opacity-100" />
      <motion.div
        className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-300/15 bg-cyan-300/10 text-cyan-200"
        whileHover={{ rotate: -4, scale: 1.06 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      </motion.div>
      <h3 className="font-display text-2xl font-semibold text-white">{service.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{service.text}</p>
    </motion.article>
  );
}
