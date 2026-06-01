import { Mail, MessageCircle } from "lucide-react";
import JLMonogram from "../ui/JLMonogram";

export default function Footer({ footer, onOpenWhatsApp, onOpenEmail }) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/72 backdrop-blur-xl">
      <div className="section-container flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <JLMonogram compact />
          <div>
            <p className="font-display text-lg font-semibold text-white">{footer.name}</p>
            <p className="mt-1 text-sm text-slate-300">{footer.subtitle}</p>
            <p className="mt-1 text-sm text-slate-400">{footer.location}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <p className="text-sm font-semibold text-slate-300">{footer.contactLine}</p>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              onClick={onOpenWhatsApp}
            >
              <MessageCircle size={16} aria-hidden="true" />
              {footer.whatsapp}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              onClick={onOpenEmail}
            >
              <Mail size={16} aria-hidden="true" />
              {footer.email}
            </button>
          </div>
          <p className="text-sm text-slate-500">{footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
