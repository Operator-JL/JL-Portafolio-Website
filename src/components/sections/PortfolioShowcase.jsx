import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CalendarDays,
  Code2,
  ExternalLink,
  GraduationCap,
  ImageOff,
  Layers,
  Monitor,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import TechKeyboard from "../ui/TechKeyboard";

const tabIcons = {
  projects: Briefcase,
  certificates: Award,
  education: GraduationCap,
  stack: Code2,
};

const defaultCertificateLabels = {
  viewCertificate: "View certificate",
  viewCredential: "View credential",
  close: "Close",
  imageFallback: "Certificate image coming soon",
  imageAltPrefix: "Certificate for",
  dialogLabel: "Expanded certificate preview",
};

export default function PortfolioShowcase({ portfolio, tech }) {
  const [activeTab, setActiveTab] = useState(portfolio.tabs[0]?.id ?? "projects");
  const prefersReducedMotion = useReducedMotion();
  const activePanelId = `portfolio-panel-${activeTab}`;
  const activeTabContent = portfolio.tabs.find((tab) => tab.id === activeTab);

  return (
    <section id="portfolio" className="section-container scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto flex justify-center">
        <SectionTitle eyebrow={portfolio.eyebrow} title={portfolio.title} subtitle={portfolio.subtitle} />
      </div>

      <motion.div
        className="mx-auto mt-10 flex max-w-3xl gap-2 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.035] p-1.5 shadow-2xl shadow-slate-950/20 backdrop-blur-2xl"
        role="tablist"
        aria-label={portfolio.title}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {portfolio.tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tabIcons[tab.id] ?? Code2;

          return (
            <button
              key={tab.id}
              id={`portfolio-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`portfolio-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "relative inline-flex min-w-max flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200",
                isActive ? "text-slate-950" : "text-slate-300 hover:bg-white/[0.055] hover:text-white",
              )}
            >
              {isActive ? (
                <motion.span
                  className="absolute inset-0 rounded-lg bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.2)]"
                  layoutId="portfolio-active-tab"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              ) : null}
              <span className="relative inline-flex items-center gap-2">
                <Icon size={16} aria-hidden="true" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </motion.div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={activePanelId}
            role="tabpanel"
            aria-labelledby={`portfolio-tab-${activeTab}`}
            aria-label={activeTabContent?.label}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.99 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.34, ease: "easeOut" }}
          >
            {activeTab === "projects" ? <ProjectsPanel projects={portfolio.projects} /> : null}
            {activeTab === "certificates" ? <CertificatesPanel certificates={portfolio.certificates} labels={portfolio.certificateCopy} /> : null}
            {activeTab === "education" ? <EducationPanel education={portfolio.education} /> : null}
            {activeTab === "stack" ? <TechKeyboard tech={tech} /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectsPanel({ projects }) {
  const scrollToStart = () => {
    document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {projects.map((project) => (
        <article key={project.id} className="portfolio-card glass-card group relative overflow-hidden p-5 sm:p-6">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative mb-5 rounded-lg border border-white/10 bg-slate-950/55 p-4">
            <ProjectMockup variant={project.id} />
          </div>
          <div className="relative">
            <div className="mb-4 flex flex-wrap gap-2">
              {project.badges.map((badge) => (
                <span key={badge} className="font-mono rounded-full border border-cyan-200/15 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  {badge}
                </span>
              ))}
            </div>
            <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
            {project.note ? (
              <p className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-slate-400">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-cyan-200" aria-hidden="true" />
                {project.note}
              </p>
            ) : null}
            {project.status ? (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-bold text-slate-300">
                  {project.status}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  onClick={scrollToStart}
                >
                  {project.cta}
                  <ExternalLink size={14} aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectMockup({ variant }) {
  const isSige = variant === "sige";

  return (
    <div className="min-h-52 rounded-md border border-white/10 bg-slate-950/72 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-200/80 shadow-[0_0_16px_rgba(125,211,252,0.45)]" />
          <span className="h-2 w-20 rounded-full bg-white/12" />
        </div>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-200/15 bg-cyan-300/10 text-cyan-100">
          {isSige ? <Layers size={17} aria-hidden="true" /> : <Monitor size={17} aria-hidden="true" />}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <div className="h-2 w-10 rounded-full bg-cyan-200/35" />
            <div className="mt-4 h-12 rounded-md bg-white/[0.045]" />
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.025] p-3">
            <span className="h-2 w-2 rounded-full bg-cyan-200/60" />
            <span className="h-2 flex-1 rounded-full bg-white/10" />
            <span className="h-2 w-12 rounded-full bg-cyan-200/25" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatesPanel({ certificates, labels }) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const certificateLabels = { ...defaultCertificateLabels, ...labels };

  useEffect(() => {
    if (!selectedCertificate) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            labels={certificateLabels}
            onPreview={setSelectedCertificate}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedCertificate ? (
          <CertificateModal certificate={selectedCertificate} labels={certificateLabels} onClose={() => setSelectedCertificate(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function CertificateCard({ certificate, labels, onPreview }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageAlt = `${labels.imageAltPrefix} ${certificate.title} - ${certificate.institution}`;
  const certificateType = certificate.typeLabel ?? certificate.type;

  return (
    <article className="portfolio-card glass-card relative flex h-full flex-col overflow-hidden p-5 sm:p-6">
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="relative z-10 mb-4 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 text-[0.68rem] font-bold uppercase text-cyan-100 shadow-lg shadow-cyan-950/10 backdrop-blur">
          <BadgeCheck size={13} aria-hidden="true" />
          {certificateType}
        </span>
      </div>
      <button
        type="button"
        className="group relative mb-5 flex h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900/90 to-cyan-950/[0.35] shadow-inner shadow-cyan-950/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        aria-label={`${labels.viewCertificate}: ${certificate.title}`}
        onClick={() => onPreview(certificate)}
      >
        {imageFailed || !certificate.image ? (
          <CertificateImageFallback labels={labels} />
        ) : (
          <img
            src={certificate.image}
            alt={imageAlt}
            loading="lazy"
            className="h-full w-full object-contain p-3 transition duration-300 ease-out group-hover:scale-[1.035]"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="pointer-events-none absolute inset-0 bg-cyan-300/0 transition duration-300 group-hover:bg-cyan-300/10" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/[0.38] group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-slate-950/80 px-4 py-2 text-xs font-bold text-cyan-100 shadow-xl shadow-cyan-950/30 backdrop-blur">
            <Award size={15} aria-hidden="true" />
            {labels.viewCertificate}
          </span>
        </span>
      </button>

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-100">
          <BadgeCheck size={15} aria-hidden="true" />
          {certificateType}
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-white">{certificate.title}</h3>
        <div className="mt-3 space-y-1 text-sm text-slate-300">
          <p className="font-semibold text-white">{certificate.institution}</p>
          <p>{certificate.platform}</p>
          <p className="inline-flex items-center gap-2 text-slate-400">
            <CalendarDays size={14} aria-hidden="true" />
            {certificate.date}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {certificate.skills.map((skill) => (
            <span key={skill} className="rounded-full border border-cyan-200/15 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-50">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-6">
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-3 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/[0.45] hover:bg-cyan-300/[0.18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          >
            {labels.viewCredential}
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

function CertificateImageFallback({ labels }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center text-sm font-semibold text-slate-300">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/15 bg-cyan-300/10 text-cyan-100">
        <ImageOff size={24} aria-hidden="true" />
      </span>
      <span>{labels.imageFallback}</span>
    </div>
  );
}

function CertificateModal({ certificate, labels, onClose }) {
  const certificateType = certificate.typeLabel ?? certificate.type;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/[0.84] p-4 backdrop-blur-xl sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`certificate-modal-title-${certificate.id}`}
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-cyan-200/[0.18] bg-slate-950/[0.92] p-4 shadow-2xl shadow-cyan-950/30 sm:p-6"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase text-cyan-100">
              <BadgeCheck size={14} aria-hidden="true" />
              {certificateType}
            </p>
            <h3 id={`certificate-modal-title-${certificate.id}`} className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
              {certificate.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {certificate.institution} · {certificate.date}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-200 transition hover:border-cyan-200/25 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            aria-label={labels.close}
            onClick={onClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900/90 to-cyan-950/[0.35]">
          <ModalCertificateImage key={certificate.id} certificate={certificate} labels={labels} />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-400">{labels.dialogLabel}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/[0.45] hover:bg-cyan-300/[0.18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
            >
              {labels.viewCredential}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              onClick={onClose}
            >
              {labels.close}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ModalCertificateImage({ certificate, labels }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageAlt = `${labels.imageAltPrefix} ${certificate.title} - ${certificate.institution}`;

  if (imageFailed || !certificate.image) {
    return <div className="min-h-72 sm:min-h-[28rem]"><CertificateImageFallback labels={labels} /></div>;
  }

  return (
    <img
      src={certificate.image}
      alt={imageAlt}
      className="max-h-[68vh] w-full object-contain p-2 sm:p-4"
      onError={() => setImageFailed(true)}
    />
  );
}

function EducationPanel({ education }) {
  return (
    <article className="portfolio-card glass-card relative overflow-hidden p-5 sm:p-7">
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="rounded-lg border border-white/10 bg-slate-950/50 p-6 text-center shadow-inner shadow-cyan-950/10">
          <div className="mx-auto flex min-h-32 max-w-60 items-center justify-center rounded-2xl border border-cyan-200/15 bg-white p-5 shadow-xl shadow-slate-950/25">
            <img
              src="/logos/it-step-academy.png"
              alt="IT Step Academy logo"
              className="max-h-24 w-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-cyan-100">{education.institution}</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
              <BookOpen size={14} aria-hidden="true" />
              {education.status}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-bold text-slate-300">
              <CalendarDays size={14} aria-hidden="true" />
              {education.estimated}
            </span>
          </div>
          <h3 className="mt-5 font-display text-3xl font-semibold text-white">{education.title}</h3>
          <p className="mt-4 text-base leading-8 text-slate-300">{education.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {education.timeline.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <span className="block h-1.5 w-12 rounded-full bg-cyan-200/55" />
                <p className="mt-3 text-sm font-semibold text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
