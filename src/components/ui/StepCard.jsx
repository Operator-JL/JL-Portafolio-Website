import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  FileText,
  LifeBuoy,
  MessageCircle,
  PackageCheck,
  Search,
  Video,
} from "lucide-react";

const stepIcons = {
  contact: MessageCircle,
  meeting: Video,
  diagnosis: Search,
  proposal: FileText,
  development: Code2,
  review: CheckCircle2,
  delivery: PackageCheck,
  followUp: LifeBuoy,
};

const getStepVariants = (prefersReducedMotion) => ({
  hidden: prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: prefersReducedMotion ? 0 : 0.48, ease: "easeOut" },
  },
});

export default function StepCard({ step }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = stepIcons[step.icon] ?? FileText;

  return (
    <motion.article
      className="step-card glass-card group relative h-full min-h-40 overflow-hidden p-5"
      variants={getStepVariants(prefersReducedMotion)}
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="step-card__topline absolute inset-x-5 top-0 z-10 h-px bg-gradient-to-r from-cyan-200/40 via-cyan-200/18 to-transparent transition" />
      <div className="relative z-10 mb-5 flex items-center justify-between gap-4">
        <span className="step-card__number font-mono rounded-full border border-cyan-200/15 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100/90 transition">
          {step.number}
        </span>
        <span className="step-card__icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200/15 bg-cyan-300/10 text-cyan-100 transition">
          <Icon aria-hidden="true" className="h-5 w-5 transition" />
        </span>
      </div>
      <h3 className="relative z-10 font-display text-xl font-semibold text-white">{step.title}</h3>
      <p className="relative z-10 mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
    </motion.article>
  );
}
