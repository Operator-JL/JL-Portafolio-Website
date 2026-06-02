import { motion, useReducedMotion } from "framer-motion";

const codeFragments = [
  "system.ready()",
  "npm run dev",
  "route: portfolio",
  "build.pipeline",
  "ui.render()",
  "API",
  "DB",
  "portfolio.init()",
  "stack.ready",
  "deploy-ready",
  "status: available",
].map((fragment, index) => ({
  className: `animated-bg__fragment animated-bg__fragment--${index + 1}`,
  text: fragment,
}));

const glowMotion = {
  x: [0, 28, -14, 0],
  y: [0, -18, 14, 0],
  scale: [1, 1.035, 0.99, 1],
};

const glowTransitions = [
  { duration: 48, repeat: Infinity, ease: "easeInOut" },
  { duration: 56, repeat: Infinity, ease: "easeInOut" },
  { duration: 64, repeat: Infinity, ease: "easeInOut" },
];

export default function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();
  const activeGlowMotion = prefersReducedMotion ? undefined : glowMotion;

  return (
    <div className="animated-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="animated-bg__base" />
      <div className="animated-bg__aurora" />
      <div className="animated-bg__grid" />
      <div className="animated-bg__blueprint" />
      <div className="animated-bg__scan" />

      <motion.div
        className="animated-bg__glow animated-bg__glow--one"
        initial={false}
        animate={activeGlowMotion}
        transition={glowTransitions[0]}
      />
      <motion.div
        className="animated-bg__glow animated-bg__glow--two"
        initial={false}
        animate={activeGlowMotion}
        transition={glowTransitions[1]}
      />
      <motion.div
        className="animated-bg__glow animated-bg__glow--three"
        initial={false}
        animate={activeGlowMotion}
        transition={glowTransitions[2]}
      />

      <div className="animated-bg__geometry">
        <span className="animated-bg__line animated-bg__line--one" />
        <span className="animated-bg__line animated-bg__line--two" />
        <span className="animated-bg__line animated-bg__line--three" />
      </div>

      <div className="animated-bg__fragments">
        {codeFragments.map((fragment) => (
          <span key={fragment.text} className={fragment.className}>
            {fragment.text}
          </span>
        ))}
      </div>
      <div className="animated-bg__noise" />
      <div className="animated-bg__vignette" />
    </div>
  );
}
