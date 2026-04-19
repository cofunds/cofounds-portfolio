import { resolvePortfolioIdentifier } from "@/utils/portfolio_identifier";

const apiUrl = import.meta.env.VITE_COFOUNDS_API_URL;
const identifier = resolvePortfolioIdentifier(window.location.hostname);

if (typeof apiUrl === "string" && apiUrl.length > 0) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "fetch";
  link.crossOrigin = "anonymous";
  link.href = `${apiUrl}/${identifier}`;
  document.head.appendChild(link);
}
