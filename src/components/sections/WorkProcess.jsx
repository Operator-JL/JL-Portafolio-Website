import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import StepCard from "../ui/StepCard";

const stepsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.14,
    },
  },
};

export default function WorkProcess({ process }) {
  return (
    <section id="proceso" className="section-container scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto flex justify-center">
        <SectionTitle eyebrow={process.eyebrow} title={process.title} subtitle={process.subtitle} />
      </div>

      <motion.div
        className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={stepsContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.24 }}
      >
        {process.steps.map((step) => (
          <div key={step.number} className="relative z-10">
            <StepCard step={step} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
