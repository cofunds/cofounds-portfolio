/** HireWiser portfolio hosts use `{username}.hirewiser.in`. Other hosts use the full hostname (API maps custom domains). */
const HIREWISER_SUFFIX = ".hirewiser.in";

/**
 * Resolves the portfolio API path segment from the request hostname.
 *
 * @param hostname - `window.location.hostname` (no port).
 */
export function resolvePortfolioIdentifier(hostname: string): string {
  const h = hostname.toLowerCase();

  if (h.endsWith(HIREWISER_SUFFIX)) {
    const sub = h.slice(0, -HIREWISER_SUFFIX.length);
    if (sub && sub !== "www") {
      if (sub.includes(".")) {
        const first = sub.split(".")[0];
        return first ?? sub;
      }
      return sub;
    }
  }

  if (h.startsWith("www.")) {
    return h.slice(4);
  }

  return h;
}
