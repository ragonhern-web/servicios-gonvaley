/**
 * En GitHub Pages el sitio se sirve bajo /servicios-gonvaley, así que las
 * rutas absolutas a /public necesitan este prefijo (ver next.config.ts).
 * En local (npm run dev) el prefijo es "" y la ruta queda igual.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
