import { useEffect, useState } from "react";

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const updateActiveSection = () => {
      const checkpoint = window.scrollY + window.innerHeight * 0.35;
      let currentSection = sectionIds[0] ?? "";

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section && section.offsetTop <= checkpoint) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  return activeSection;
}
