import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { technologies } from "../../data/technologies";

const rowOneNames = [
  "VS Code",
  "Git",
  "GitHub",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Vite",
  "Tailwind CSS",
  "Bootstrap",
  "Python",
  "C#",
];

const rowTwoNames = [
  "ASP.NET Core",
  "Entity Framework Core",
  "SQL Server / SSMS 2022",
  "Node.js",
  "Postman",
  "Vercel",
  "Canva",
  "Figma",
  "Chart.js",
  "SweetAlert2",
  "Codex",
];

export default function TechKeyboard({ tech }) {
  const prefersReducedMotion = useReducedMotion();
  const keyboard = tech.keyboard ?? {};
  const rows = [buildRow(rowOneNames, "left"), buildRow(rowTwoNames, "right")];

  return (
    <section className="tech-carousel-showcase glass-card relative" aria-label={keyboard.ariaLabel ?? tech.title}>
      <div className="tech-carousel-glow" aria-hidden="true" />

      <div className="tech-carousel-header relative">
        <span className="tech-carousel-badge">{tech.badge}</span>
        <div>
          <h3 className="tech-carousel-title">{tech.title}</h3>
          <p className="tech-carousel-subtitle">{tech.subtitle}</p>
        </div>
      </div>

      <motion.div
        className="tech-marquee-shell relative"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        {rows.map((row) => (
          <div
            key={row.direction}
            className={clsx(
              "tech-marquee-row",
              row.direction === "left" ? "tech-marquee-row-left" : "tech-marquee-row-right",
            )}
          >
            {[...row.items, ...row.items].map((technology, index) => (
              <TechCarouselCard
                key={`${row.direction}-${technology.name}-${index}`}
                technology={technology}
                isDuplicate={index >= row.items.length}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function buildRow(names, direction) {
  return {
    direction,
    items: names.map((name) => technologies.find((technology) => technology.name === name)).filter(Boolean),
  };
}

function TechCarouselCard({ technology, isDuplicate }) {
  return (
    <div
      className={clsx("tech-carousel-card", isDuplicate && "duplicated-item")}
      style={{ "--tech-color": technology.color }}
      aria-hidden={isDuplicate ? "true" : undefined}
    >
      <span className="tech-carousel-icon" aria-hidden="true">
        <TechGlyph technology={technology} />
      </span>
      <span className="tech-carousel-name">{technology.name}</span>
    </div>
  );
}

function TechGlyph({ technology }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = technology?.Icon;
  const shouldRenderImage = technology?.imageUrl && !imageFailed;

  if (shouldRenderImage) {
    return (
      <img
        src={technology.imageUrl}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain"
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  if (Icon) {
    return <Icon aria-hidden="true" />;
  }

  return <span className="font-display text-base font-bold">{technology?.fallback ?? technology?.name?.slice(0, 2)}</span>;
}
