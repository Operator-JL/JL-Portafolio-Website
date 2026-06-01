import { useState } from "react";
import clsx from "clsx";

export default function TechLogo({ technology, compact = false }) {
  const { Icon, imageUrl, name, fallback, color } = technology;
  const [imageFailed, setImageFailed] = useState(false);
  const shouldRenderImage = imageUrl && !imageFailed;

  return (
    <div className={clsx("tech-logo-card group", compact && "tech-logo-card--compact")} style={{ "--tech-color": color }}>
      <div
        className={clsx(
          "tech-logo-icon flex items-center justify-center rounded-full border border-cyan-200/5 bg-white/[0.015] transition",
          compact ? "h-10 w-10 text-2xl" : "h-12 w-12 text-3xl",
        )}
      >
        {shouldRenderImage ? (
          <img
            src={imageUrl}
            alt={name}
            className={clsx(
              "object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]",
              compact ? "h-6 w-6" : "h-8 w-8",
            )}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : Icon ? (
          <Icon aria-hidden="true" />
        ) : (
          <span className="font-display text-sm font-bold">{fallback}</span>
        )}
      </div>
      <span
        className={clsx(
          "text-center font-semibold leading-4 text-slate-300 transition group-hover:text-white",
          compact ? "max-w-28 text-[0.68rem]" : "max-w-24 text-xs",
        )}
      >
        {name}
      </span>
    </div>
  );
}
