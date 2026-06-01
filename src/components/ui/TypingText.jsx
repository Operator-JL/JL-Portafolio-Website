import clsx from "clsx";
import { useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

export default function TypingText({ text, className = "" }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.72 });

  return (
    <span
      ref={ref}
      key={text}
      className={clsx(
        prefersReducedMotion ? "typing-text-static" : "typing-text",
        !prefersReducedMotion && isInView && "typing-text--active",
        className,
      )}
      style={{ "--typing-characters": String(text.length) }}
    >
      {text}
    </span>
  );
}
