export type PlatformId = "instagram" | "tiktok" | "shorts" | "google";

export type Platform = {
  id: PlatformId;
  name: string;
  icon: "insta" | "tiktok" | "shorts" | "google";
  /** Logo oficial en PNG, servido desde /public/platforms. */
  logo: string;
  title: string;
  description: string;
  mockup: {
    label: string;
    heading: string;
    detail: string;
    /** Ruta de imagen real del mockup. Placeholder hasta tener el asset definitivo. */
    image: string | null;
  };
};

export const platforms: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "insta",
    logo: "/platforms/instagram.png",
    title: "Feed, stories y reels",
    description: "Publicaciones, carruseles y stories diarias pensadas para mantener tu perfil activo y reconocible.",
    mockup: {
      label: "Instagram",
      heading: "Feed activo",
      detail: "Carruseles y reels programados cada semana.",
      image: null
    }
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "tiktok",
    logo: "/platforms/tiktok.png",
    title: "Vídeo corto local",
    description: "Vídeos cortos con ganchos rápidos, pensados para el algoritmo y el público de tu zona.",
    mockup: {
      label: "TikTok",
      heading: "Vídeos cortos",
      detail: "Tendencias adaptadas al negocio local.",
      image: null
    }
  },
  {
    id: "shorts",
    name: "YouTube Shorts",
    icon: "shorts",
    logo: "/platforms/shorts.png",
    title: "Contenido vertical",
    description: "Reaprovechamos el contenido de vídeo para llegar también a la audiencia de YouTube.",
    mockup: {
      label: "YouTube Shorts",
      heading: "Shorts semanales",
      detail: "Mismo contenido, formato vertical optimizado.",
      image: null
    }
  },
  {
    id: "google",
    name: "Google My Business",
    icon: "google",
    logo: "/platforms/gmb.png",
    title: "Búsqueda y reseñas",
    description: "Publicaciones, fotos y gestión de reseñas para reforzar tu presencia en búsquedas locales.",
    mockup: {
      label: "Google Business",
      heading: "Perfil optimizado",
      detail: "Publicaciones y reseñas gestionadas cada semana.",
      image: null
    }
  }
];
