export type ServiceId = "plataformas" | "estrategia" | "contenido" | "comunidad" | "informes";

export type PlanId = "esencial" | "crecimiento" | "premium";

export type Plan = {
  id: PlanId;
  label: string;
  price: string;
};

export const plans: Plan[] = [
  { id: "esencial", label: "Esencial", price: "599 €/mes" },
  { id: "crecimiento", label: "Crecimiento", price: "799 €/mes" },
  { id: "premium", label: "Premium", price: "1.199 €/mes" }
];

export type Service = {
  id: ServiceId;
  number: string;
  label: string;
  heading: string;
  text: string;
  visual: "platforms" | "strategy" | "content" | "community" | "reports";
};

export const services: Service[] = [
  {
    id: "plataformas",
    number: "01",
    label: "Plataformas",
    heading: "Tu negocio presente donde tus clientes pasan el tiempo.",
    text:
      "Gestionamos tu presencia en Instagram, TikTok, YouTube Shorts y Google My Business para que tu marca tenga visibilidad tanto en redes sociales como en búsquedas locales.",
    visual: "platforms"
  },
  {
    id: "estrategia",
    number: "02",
    label: "Estrategia",
    heading: "No publicamos por publicar. Creamos una dirección.",
    text:
      "Definimos un plan de contenido mensual según tu negocio, tus objetivos, tu zona y el tipo de cliente que quieres atraer.",
    visual: "strategy"
  },
  {
    id: "contenido",
    number: "03",
    label: "Contenido",
    heading: "Reels, carruseles y stories para mantener tu marca activa.",
    text:
      "Creamos contenido visual para que tu negocio se vea profesional durante todo el mes: publicaciones, carruseles, stories diarias y vídeos cortos para redes.",
    visual: "content"
  },
  {
    id: "comunidad",
    number: "04",
    label: "Gestión de comunidad",
    heading: "Cuidamos lo que ocurre después de publicar.",
    text:
      "Gestionamos comentarios, mensajes directos y reseñas para que tu negocio mantenga una imagen cercana, profesional y activa.",
    visual: "community"
  },
  {
    id: "informes",
    number: "05",
    label: "Informes y mejora",
    heading: "Medimos resultados y mejoramos cada mes.",
    text:
      "Te entregamos un informe mensual con el rendimiento de tus redes: alcance, interacciones, crecimiento, mejores contenidos y próximos pasos.",
    visual: "reports"
  }
];
