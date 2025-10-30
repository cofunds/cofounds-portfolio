import { useState, useEffect } from "react";
import { fetchPortfolio, transformUserData } from "@/lib/portfolio-utils";
import type { PortfolioData } from "@/components/portfolio-data-provider";

export interface UsePortfolioResult {
  portfolioData: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
  username: string;
  hasValidSubdomain: boolean;
}

// Client-side version of extractUsername
function extractUsernameClient(): {
  username: string;
  hasValidSubdomain: boolean;
} {
  if (typeof window === "undefined") {
    return { username: "", hasValidSubdomain: false };
  }

  const host = window.location.hostname;
  let username = "";
  let hasValidSubdomain = false;

  if (host) {
    const parts = host.split(".");

    // Handle subdomains like username.buildarclabs.in
    if (parts.length >= 3) {
      const subdomain = parts[0];
      const domain = parts.slice(1).join(".");

      // Check for buildarclabs.in or other configured domains
      if (domain === "buildarclabs.in" || domain === "cofounds.in") {
        const reserved = ["www", "api", "admin", "app", "mail", "blog", "docs"];
        if (!reserved.includes(subdomain.toLowerCase())) {
          username = subdomain;
          hasValidSubdomain = true;
        }
      }
    }
    // Handle localhost development
    else if (
      parts.length >= 2 &&
      (parts[1] === "localhost" || parts[1].includes("localhost"))
    ) {
      username = parts[0];
      hasValidSubdomain = true;
    }
  }

  return { username, hasValidSubdomain };
}

export function usePortfolioClient(): UsePortfolioResult {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [hasValidSubdomain, setHasValidSubdomain] = useState(false);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        setIsLoading(true);
        setError(null);

        // Extract username from client-side
        const {
          username: extractedUsername,
          hasValidSubdomain: validSubdomain,
        } = extractUsernameClient();

        setUsername(extractedUsername);
        setHasValidSubdomain(validSubdomain);

        if (!validSubdomain) {
          setIsLoading(false);
          return;
        }

        const portfolioResult = await fetchPortfolio(extractedUsername);

        if (!portfolioResult.success) {
          const errorMessage =
            portfolioResult.error instanceof Error
              ? portfolioResult.error.message
              : "Failed to fetch portfolio data";
          setError(errorMessage);
          setIsLoading(false);
          return;
        }

        if (!portfolioResult.data) {
          setError("No portfolio data found");
          setIsLoading(false);
          return;
        }

        const transformedData = transformUserData(portfolioResult.data as any);
        setPortfolioData(transformedData as PortfolioData);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setIsLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  return {
    portfolioData,
    isLoading,
    error,
    username,
    hasValidSubdomain,
  };
}
