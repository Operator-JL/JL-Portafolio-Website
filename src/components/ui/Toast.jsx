import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full border border-cyan-200/20 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-cyan-50 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl"
          initial={{ opacity: 0, y: 16, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 16, x: "-50%" }}
          transition={{ duration: 0.25 }}
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 size={18} className="text-cyan-200" aria-hidden="true" />
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
