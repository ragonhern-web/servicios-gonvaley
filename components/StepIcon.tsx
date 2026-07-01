import type { ServiceId } from "@/data/services";
import { platforms } from "@/data/platforms";
import { withBasePath } from "@/utils/basePath";

type Props = {
  id: ServiceId;
};

export default function StepIcon({ id }: Props) {
  if (id === "plataformas") {
    return (
      <span className="step-icon step-icon-platforms" aria-hidden="true">
        {platforms.map((platform) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={platform.id} className="platform-logo" src={withBasePath(platform.logo)} alt={platform.name} />
        ))}
      </span>
    );
  }

  if (id === "estrategia") {
    return (
      <span className="step-icon" aria-hidden="true">
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4.5" width="14" height="12" rx="2.4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 8.2h14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6.6 11.2h2M11.4 11.2h2M6.6 13.8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  if (id === "contenido") {
    return (
      <span className="step-icon" aria-hidden="true">
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8.4 7.6l4.3 2.4-4.3 2.4V7.6z" fill="currentColor" />
        </svg>
      </span>
    );
  }

  if (id === "comunidad") {
    return (
      <span className="step-icon" aria-hidden="true">
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
          <path d="M3.5 5.8c0-1.05.85-1.9 1.9-1.9h9.2c1.05 0 1.9.85 1.9 1.9v5.1c0 1.05-.85 1.9-1.9 1.9H8.6l-3.3 2.7v-2.7H5.4c-1.05 0-1.9-.85-1.9-1.9V5.8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6.8 7.4h6.4M6.8 9.7h4.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    );
  }

  return (
    <span className="step-icon" aria-hidden="true">
      <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
        <path d="M3.5 16.5v-4.2M8.2 16.5V8.4M12.9 16.5V5.1M17.6 16.5V10.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}
