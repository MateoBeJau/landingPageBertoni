/** Hosts allowed in next.config remotePatterns — use unoptimized for anything else. */
export function shouldOptimizeNextImage(src: string): boolean {
  if (!src || src.startsWith("data:")) return false;
  if (src.startsWith("/")) return true;
  try {
    const u = new URL(src);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    const h = u.hostname.toLowerCase();
    if (h === "images.unsplash.com" || h === "plus.unsplash.com") return true;
    if (h.endsWith(".public.blob.vercel-storage.com")) return true;
    return false;
  } catch {
    return false;
  }
}
