import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMZ Creatives · Gestión integral de redes",
  description:
    "Landing premium para el Pack Premium de gestión integral de redes sociales para negocios locales."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#122539"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
