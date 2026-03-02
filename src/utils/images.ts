/**
 * Image path helper.
 * Pass a filename for local images in /images/portfolio/,
 * or a full URL (e.g. Cloudflare R2) which is returned as-is.
 */
export function photoSrc(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `/images/portfolio/${src}`;
}
