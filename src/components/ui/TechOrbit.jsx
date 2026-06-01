import clsx from "clsx";
import { Database } from "lucide-react";
import { useState } from "react";
import {
  SiCss,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiOpenai,
  SiPython,
  SiReact,
  SiSharp,
} from "react-icons/si";
import {
  csharpIconUrl,
  cssIconUrl,
  javascriptIconUrl,
  sqlServerIconUrl,
  vscodeIconUrl,
} from "../../data/technologies";
import JLMonogram from "./JLMonogram";

const orbitTechnologies = [
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26", positionClass: "tech-orbit__item--1" },
  { name: "CSS3", imageUrl: cssIconUrl, Icon: SiCss, color: "#663399", positionClass: "tech-orbit__item--2" },
  { name: "JavaScript", imageUrl: javascriptIconUrl, Icon: SiJavascript, color: "#F7DF1E", positionClass: "tech-orbit__item--3" },
  { name: "SQL Server", imageUrl: sqlServerIconUrl, Icon: Database, color: "#67E8F9", positionClass: "tech-orbit__item--4" },
  { name: "React", Icon: SiReact, color: "#61DAFB", positionClass: "tech-orbit__item--5" },
  { name: "C#", imageUrl: csharpIconUrl, Icon: SiSharp, color: "#512BD4", positionClass: "tech-orbit__item--6" },
  { name: "VS Code", imageUrl: vscodeIconUrl, color: "#007ACC", positionClass: "tech-orbit__item--7" },
  { name: "Python", Icon: SiPython, color: "#3776AB", positionClass: "tech-orbit__item--8" },
  { name: "GitHub", Icon: SiGithub, color: "#FFFFFF", positionClass: "tech-orbit__item--9" },
  { name: "Codex", Icon: SiOpenai, color: "#C7F9FF", positionClass: "tech-orbit__item--10" },
];

export default function TechOrbit({ label }) {
  return (
    <div className="tech-orbit" aria-label={label} role="img">
      <div className="tech-orbit__ring tech-orbit__ring--outer" />
      <div className="tech-orbit__ring tech-orbit__ring--middle" />
      <div className="tech-orbit__ring tech-orbit__ring--inner" />
      <div className="tech-orbit__axis tech-orbit__axis--x" />
      <div className="tech-orbit__axis tech-orbit__axis--y" />

      <div className="tech-orbit__center">
        <JLMonogram animated />
      </div>

      <div className="tech-orbit__icons">
        {orbitTechnologies.map((technology) => (
          <OrbitIcon key={technology.name} technology={technology} />
        ))}
      </div>
    </div>
  );
}

function OrbitIcon({ technology }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = technology.Icon;
  const shouldRenderImage = technology.imageUrl && !imageFailed;

  return (
    <div
      className={clsx("tech-orbit__item", technology.positionClass)}
      style={{ "--orbit-color": technology.color }}
      aria-label={technology.name}
    >
      {shouldRenderImage ? (
        <img
          src={technology.imageUrl}
          alt=""
          aria-hidden="true"
          className="tech-orbit__image"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : Icon ? (
        <Icon className="tech-orbit__icon" aria-hidden="true" />
      ) : (
        <span className="tech-orbit__fallback" aria-hidden="true">
          {technology.fallback}
        </span>
      )}
    </div>
  );
}
