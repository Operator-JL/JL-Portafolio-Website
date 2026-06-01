import { motion } from "framer-motion";
import { Layers, ShieldCheck } from "lucide-react";
import sigeLogo from "../../assets/logos/sige-logo-placeholder.svg";
import SectionTitle from "../ui/SectionTitle";

export default function FeaturedProject({ project }) {
  return (
    <section id="proyecto" className="section-container scroll-mt-24 py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <SectionTitle eyebrow={project.eyebrow} title={project.title} align="left" />
          <div className="mt-6 flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="mt-6 text-base leading-8 text-slate-300">{project.text}</p>
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-400 backdrop-blur-xl">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-cyan-200" aria-hidden="true" />
            <span>{project.note}</span>
          </div>
        </div>

        <motion.article
          className="project-showcase glass-card relative overflow-hidden p-4 sm:p-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="flex min-h-72 items-center justify-center rounded-lg border border-white/10 bg-slate-950/55 p-5">
              <div className="relative w-full">
                <div className="absolute inset-7 rounded-full bg-cyan-300/12 blur-2xl" />
                <img
                  src={sigeLogo}
                  alt="SIGE 16 de Septiembre placeholder logo"
                  className="relative h-auto w-full rounded-lg border border-white/10 shadow-2xl shadow-cyan-950/25"
                />
              </div>
            </div>

            <div className="dashboard-mockup rounded-lg border border-white/10 bg-slate-950/62 p-4">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-cyan-200/70">{project.mockup.title}</p>
                  <div className="mt-2 h-2 w-32 rounded-full bg-white/10" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-200/15 bg-cyan-200/10 text-cyan-200">
                  <Layers size={18} aria-hidden="true" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {project.mockup.metrics.map((metric, index) => (
                  <div key={metric} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                    <span className="text-[0.68rem] font-bold text-cyan-200/70">0{index + 1}</span>
                    <p className="mt-2 text-sm font-semibold text-white">{metric}</p>
                    <div className="mt-3 h-1.5 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-cyan-200/60" style={{ width: `${74 - index * 11}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                {project.mockup.rows.map((row, index) => (
                  <div key={row} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-200/70 shadow-[0_0_16px_rgba(125,211,252,0.35)]" />
                    <span className="flex-1 text-sm font-medium text-slate-300">{row}</span>
                    <span className="h-1.5 w-12 rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-cyan-200/45"
                        style={{ width: `${52 + index * 14}%` }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
