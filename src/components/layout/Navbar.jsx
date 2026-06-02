import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";

function LanguageSwitch({ language, label, onLanguageChange }) {
  return (
    <div
      className="font-mono flex rounded-full border border-white/10 bg-white/[0.04] p-1 text-xs font-medium text-slate-300 shadow-lg shadow-slate-950/20 backdrop-blur-xl"
      role="group"
      aria-label={label}
    >
      {["es", "en"].map((option) => {
        const isActive = language === option;

        return (
          <button
            key={option}
            type="button"
            className={clsx(
              "rounded-full px-3 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
              isActive ? "bg-cyan-300 text-slate-950 shadow-[0_0_22px_rgba(103,232,249,0.18)]" : "hover:text-white",
            )}
            aria-pressed={isActive}
            onClick={() => onLanguageChange(option)}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar({ nav, language, languageLabel, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = useMemo(() => nav.links.map((link) => link.id), [nav.links]);
  const activeSection = useActiveSection(sectionIds);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#02040a]/80 shadow-[0_18px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
      <div className="mx-auto mt-3 flex w-[min(1240px,calc(100%-1.5rem))] items-center gap-3 sm:gap-4">
        <a
          href="#inicio"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl drop-shadow-[0_0_18px_rgba(34,211,238,0.16)] transition hover:scale-[1.03] hover:drop-shadow-[0_0_24px_rgba(34,211,238,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:h-14 sm:w-14"
          onClick={closeMenu}
          aria-label="JL developer avatar"
        >
          <img
            src="/logos/jl-developer-avatar.png"
            alt="JL developer avatar"
            title="JL developer avatar"
            className="h-full w-full object-contain"
            loading="eager"
          />
        </a>

        <nav
          className="nav-shell flex h-16 min-w-0 flex-1 items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-2 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl sm:px-3 lg:pl-2 lg:pr-5"
          style={{ width: "auto" }}
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-2">
            <a
              href="#inicio"
              className="font-mono inline-flex items-center rounded-full border border-cyan-200/15 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-50 shadow-lg shadow-cyan-950/10 transition hover:border-cyan-200/30 hover:bg-cyan-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              onClick={closeMenu}
            >
              JL
            </a>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {nav.links.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={clsx(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive ? "text-white" : "text-slate-300 hover:text-white",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      className="absolute inset-x-4 -bottom-1 h-px rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.55)]"
                      layoutId="active-nav-line"
                    />
                  ) : null}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitch language={language} label={languageLabel} onLanguageChange={onLanguageChange} />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-cyan-300/25 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 lg:hidden"
              aria-label={isOpen ? nav.menuClose : nav.menuOpen}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            className="border-t border-white/10 bg-[#02040a]/96 px-4 py-4 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {nav.links.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/20 hover:bg-white/[0.08]"
                    onClick={closeMenu}
                  >
                    {link.label}
                    <span className={clsx("h-2 w-2 rounded-full", isActive ? "bg-cyan-300" : "bg-white/20")} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
