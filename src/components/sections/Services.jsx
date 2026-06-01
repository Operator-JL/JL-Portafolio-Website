import { motion } from "framer-motion";
import { ArrowRight, Code2, Globe, MonitorCog } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import ServiceCard from "../ui/ServiceCard";

const serviceIcons = {
  website: Globe,
  customSoftware: Code2,
  itSupport: MonitorCog,
};

export default function Services({ services, onServiceSelect }) {
  return (
    <section id="servicios" className="section-container scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto flex justify-center">
        <SectionTitle eyebrow={services.eyebrow} title={services.title} subtitle={services.subtitle} />
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {services.items.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            icon={serviceIcons[service.id]}
            index={index}
          />
        ))}
      </div>

      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
      >
        <button
          type="button"
          className="premium-button inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-7 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:w-auto sm:min-w-64"
          onClick={() => onServiceSelect(services.ctaSelectValue)}
        >
          {services.cta}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  );
}
