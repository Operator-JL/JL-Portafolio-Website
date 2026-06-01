import { motion } from "framer-motion";
import { Award, BookOpen, Briefcase, Code2, MapPin } from "lucide-react";
import TypingText from "../ui/TypingText";

const aboutIcons = {
  education: BookOpen,
  certifications: Award,
  experience: Briefcase,
  skills: Code2,
};

export default function About({ about }) {
  const profileCards = about.cards.filter((card) => ["experience", "skills"].includes(card.id));

  return (
    <section id="acerca" className="section-container scroll-mt-24 py-20 lg:py-28">
      <div className="mb-10 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase text-cyan-200">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          {about.eyebrow}
        </span>
        <h2 className="font-display text-4xl font-semibold text-white sm:text-6xl lg:text-7xl">
          <TypingText text={about.title} className="gradient-text" />
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <motion.article
          className="about-profile glass-card relative overflow-hidden p-6 sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative">
            <p className="font-display text-3xl font-semibold text-white sm:text-4xl">{about.name}</p>
            <p className="mt-3 text-base font-semibold text-cyan-100">{about.role}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-semibold text-slate-300">
              <MapPin size={15} className="text-cyan-200" aria-hidden="true" />
              {about.location}
            </div>

            <div className="mt-7 space-y-5 text-base leading-8 text-slate-300">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.article>

        <div className="grid gap-4 sm:grid-cols-2">
          {profileCards.map((card, index) => {
            const Icon = aboutIcons[card.id] ?? Code2;
            const isSkills = card.id === "skills";

            return (
              <motion.article
                key={card.id}
                className="about-card glass-card p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/15 bg-cyan-300/10 text-cyan-200">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{card.title}</h3>

                {isSkills ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
