/**
 * Image path helper.
 * All portfolio images live under /images/portfolio/ for now.
 * Swap this single function when migrating to an external CDN.
 */
export function photoSrc(filename: string): string {
  return `/images/portfolio/${filename}`;
}
