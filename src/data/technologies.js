import {
  SiBootstrap,
  SiCanva,
  SiChartdotjs,
  SiCss,
  SiDotnet,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiOpenai,
  SiPostman,
  SiPython,
  SiReact,
  SiSharp,
  SiTailwindcss,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { Database } from "lucide-react";

export const vscodeIconUrl =
  "https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=000000";
export const csharpIconUrl =
  "https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_C_sharp.svg";
export const cssIconUrl =
  "https://upload.wikimedia.org/wikipedia/commons/3/3d/CSS.3.svg";
export const javascriptIconUrl =
  "https://upload.wikimedia.org/wikipedia/commons/d/d4/Javascript-shield.svg";
export const sqlServerIconUrl =
  "https://upload.wikimedia.org/wikipedia/commons/4/41/Microsoft_SQL_Server_2025_icon.svg";

// Fallback badges cover tools without a stable Simple Icons export in this react-icons version.
export const technologies = [
  { name: "VS Code", imageUrl: vscodeIconUrl, color: "#007ACC", group: "workflow" },
  { name: "Git", Icon: SiGit, color: "#F05032", group: "workflow" },
  { name: "GitHub", Icon: SiGithub, color: "#FFFFFF", group: "workflow" },
  { name: "HTML", Icon: SiHtml5, color: "#E34F26", group: "frontend" },
  { name: "CSS", imageUrl: cssIconUrl, Icon: SiCss, color: "#1572B6", group: "frontend" },
  { name: "JavaScript", imageUrl: javascriptIconUrl, Icon: SiJavascript, color: "#F7DF1E", group: "frontend" },
  { name: "React", Icon: SiReact, color: "#61DAFB", group: "frontend" },
  { name: "Vite", Icon: SiVite, color: "#A855F7", group: "frontend" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8", group: "frontend" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3", group: "frontend" },
  { name: "Python", Icon: SiPython, color: "#3776AB", group: "backend" },
  { name: "C#", imageUrl: csharpIconUrl, Icon: SiSharp, color: "#A179DC", group: "backend" },
  { name: "ASP.NET Core", Icon: SiDotnet, color: "#8B5CF6", group: "backend" },
  { name: "Entity Framework Core", Icon: SiDotnet, color: "#7C3AED", group: "backend" },
  { name: "SQL Server / SSMS 2022", imageUrl: sqlServerIconUrl, Icon: Database, color: "#38BDF8", group: "database" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#3C873A", group: "backend" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37", group: "workflow" },
  { name: "Vercel", Icon: SiVercel, color: "#FFFFFF", group: "workflow" },
  { name: "Canva", Icon: SiCanva, color: "#00C4CC", group: "design" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E", group: "design" },
  { name: "Chart.js", Icon: SiChartdotjs, color: "#FF6384", group: "design" },
  { name: "SweetAlert2", fallback: "SA", color: "#38BDF8", group: "design" },
  { name: "Codex", Icon: SiOpenai, color: "#7DD3FC", group: "workflow" },
];
