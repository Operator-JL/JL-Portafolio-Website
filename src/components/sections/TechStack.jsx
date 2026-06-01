import { useMemo, useState } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { technologies } from "../../data/technologies";
import TechLogo from "../ui/TechLogo";

const defaultCategories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend / Software" },
  { id: "database", label: "Database" },
  { id: "workflow", label: "Workflow" },
  { id: "design", label: "Design / Utilities" },
];

export default function TechStack({ tech, variant = "section" }) {
  const [activeGroup, setActiveGroup] = useState("all");
  const prefersReducedMotion = useReducedMotion();
  const isEmbedded = variant === "embedded";
  const categories = useMemo(
    () => (tech.categories?.length ? tech.categories : defaultCategories),
    [tech.categories],
  );
  const categoryGroups = useMemo(
    () => categories.filter((category) => category.id !== "all"),
    [categories],
  );

  const visibleTechnologies = useMemo(() => {
    if (activeGroup === "all") return technologies;
    return technologies.filter((technology) => technology.group === activeGroup);
  }, [activeGroup]);

  const groupedTechnologies = useMemo(() => {
    const visibleGroups =
      activeGroup === "all"
        ? categoryGroups
        : categoryGroups.filter((category) => category.id === activeGroup);

    return visibleGroups
      .map((category) => ({
        ...category,
        items: technologies.filter((technology) => technology.group === category.id),
      }))
      .filter((category) => category.items.length > 0);
  }, [activeGroup, categoryGroups]);

  const marqueeRows = useMemo(() => {
    const midpoint = Math.ceil(technologies.length / 2);
    return [technologies.slice(0, midpoint), technologies.slice(midpoint)];
  }, []);

  const shouldUseMarquee = activeGroup === "all" && !prefersReducedMotion;
  const revealTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
  const fadeUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: revealTransition },
  };

  const content = (
    <>
      {!isEmbedded ? (
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.span
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase text-cyan-200"
            variants={fadeUp}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            {tech.eyebrow}
          </motion.span>
          <motion.h2
            className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl lg:text-5xl"
            variants={fadeUp}
          >
            {tech.title}
          </motion.h2>
          <motion.p className="text-base leading-7 text-slate-300 sm:text-lg" variants={fadeUp}>
            {tech.subtitle}
          </motion.p>
        </motion.div>
      ) : null}

      {!isEmbedded ? (
        <motion.div
          className="mt-9 flex flex-wrap justify-center gap-2"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
          role="group"
          aria-label={tech.categoryAriaLabel ?? "Technology categories"}
        >
          {categories.map((category) => {
            const isActive = activeGroup === category.id;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveGroup(category.id)}
                className={clsx(
                  "rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200",
                  isActive
                    ? "border-cyan-300/45 bg-cyan-300/15 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)]"
                    : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/28 hover:bg-cyan-300/10 hover:text-white",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </motion.div>
      ) : null}

      <motion.div
        className={clsx(
          "tech-showcase tech-stack-panel glass-card relative overflow-hidden p-3 sm:p-4 lg:p-5",
          isEmbedded ? "mt-5" : "mt-10",
        )}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        aria-label={tech.title}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_92%_82%,rgba(59,130,246,0.1),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#020817] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#020817] to-transparent" />

        <div className="relative hidden md:block">
          {shouldUseMarquee ? (
            <div className="space-y-2">
              <MarqueeRow items={marqueeRows[0]} />
              <MarqueeRow items={marqueeRows[1]} reverse />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {visibleTechnologies.map((technology) => (
                <TechLogo key={technology.name} technology={technology} />
              ))}
            </div>
          )}
        </div>

        <div className="relative space-y-7 md:hidden">
          {groupedTechnologies.map((group) => (
            <div key={group.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-cyan-200/35 to-transparent" />
                <h3 className="font-display text-xs font-semibold uppercase tracking-normal text-cyan-100">
                  {group.label}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-l from-cyan-200/35 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-3 min-[390px]:grid-cols-3">
                {group.items.map((technology) => (
                  <TechLogo key={technology.name} technology={technology} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );

  if (isEmbedded) {
    return <div className="tech-stack-embedded">{content}</div>;
  }

  return (
    <section id="tecnologias" className="section-container scroll-mt-24 py-20 lg:py-28">
      {content}
    </section>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-2">
      <div className={`tech-marquee flex gap-4 ${reverse ? "tech-marquee--reverse" : ""}`}>
        {marqueeItems.map((technology, index) => (
          <div key={`${technology.name}-${index}`} className="min-w-[9.75rem]">
            <TechLogo technology={technology} />
          </div>
        ))}
      </div>
    </div>
  );
}
