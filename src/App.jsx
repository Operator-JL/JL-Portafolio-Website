import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Hero from "./components/sections/Hero";
import PortfolioShowcase from "./components/sections/PortfolioShowcase";
import Services from "./components/sections/Services";
import WorkProcess from "./components/sections/WorkProcess";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import { CONTACT, content } from "./data/content";

function getInitialLanguage() {
  const storedLanguage = window.localStorage.getItem("jl-language");
  return storedLanguage && content[storedLanguage] ? storedLanguage : "es";
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [selectedService, setSelectedService] = useState("");
  const t = content[language];

  useEffect(() => {
    window.localStorage.setItem("jl-language", language);
    document.documentElement.lang = language;
    document.title = t.meta.title;
  }, [language, t.meta.title]);

  const openWhatsApp = () => {
    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
      CONTACT.whatsappMessage,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openEmail = () => {
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`;
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen overflow-x-hidden bg-[#020817] text-white">
        <AnimatedBackground />
        <Navbar
          nav={t.nav}
          language={language}
          languageLabel={t.language.label}
          onLanguageChange={setLanguage}
        />

        <main className="relative z-10">
          <Hero hero={t.hero} onOpenWhatsApp={openWhatsApp} />
          <About about={t.about} />
          <PortfolioShowcase portfolio={t.portfolio} tech={t.tech} />
          <Services services={t.services} onServiceSelect={handleServiceSelect} />
          <WorkProcess process={t.process} />
          <Contact
            contact={t.contact}
            selectedService={selectedService}
            onServiceChange={setSelectedService}
            onOpenWhatsApp={openWhatsApp}
            onOpenEmail={openEmail}
          />
        </main>

        <div className="relative z-10">
          <Footer footer={t.footer} onOpenWhatsApp={openWhatsApp} onOpenEmail={openEmail} />
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
