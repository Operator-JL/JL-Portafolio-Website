import { motion } from "framer-motion";

const codeFragments = [
  "const solution = build(project)",
  "npm run dev",
  "function solve()",
  "<Website />",
  "{ UI }",
  "API",
  "DB",
  "portfolio.init()",
  "stack.ready",
  "deploy-ready",
  "status: available",
];

export default function AnimatedBackground() {
  return (
    <div className="animated-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="animated-bg__base" />
      <div className="animated-bg__grid" />
      <div className="animated-bg__scan" />

      <motion.div
        className="animated-bg__glow animated-bg__glow--one"
        animate={{ x: [0, 48, -24, 0], y: [0, -34, 22, 0], scale: [1, 1.08, 0.98, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="animated-bg__glow animated-bg__glow--two"
        animate={{ x: [0, -44, 28, 0], y: [0, 38, -16, 0], scale: [1, 0.96, 1.06, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="animated-bg__geometry">
        <span className="animated-bg__line animated-bg__line--one" />
        <span className="animated-bg__line animated-bg__line--two" />
        <span className="animated-bg__line animated-bg__line--three" />
      </div>

      <div className="animated-bg__fragments">
        {codeFragments.map((fragment, index) => (
          <motion.span
            key={fragment}
            className={`animated-bg__fragment animated-bg__fragment--${index + 1}`}
            animate={{ y: [0, index % 2 ? 10 : -10, 0], opacity: [0.16, 0.34, 0.16] }}
            transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            {fragment}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
