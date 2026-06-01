import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import JLMonogram from "../ui/JLMonogram";

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
      <nav
        className="nav-shell mx-auto mt-3 flex h-16 items-center justify-between rounded-full border border-white/10 bg-white/[0.045] px-3 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl sm:px-4 lg:px-5"
        aria-label="Main navigation"
      >
        <a
          href="#inicio"
          className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          onClick={closeMenu}
        >
          <JLMonogram compact />
          <span className="hidden font-mono text-sm font-semibold text-white sm:inline">JL</span>
        </a>

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
