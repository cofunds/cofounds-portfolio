import { useState, useEffect } from "react";
import { fetchPortfolio, transformUserData } from "@/lib/portfolio-utils";
import type { PortfolioData } from "@/components/portfolio-data-provider";

export type UsePortfolioResult = {
  portfolioData: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
  username: string;
  hasValidSubdomain: boolean;
};

// Client-side version of extractUsername
function extractUsernameClient(): {
  username: string;
  hasValidSubdomain: boolean;
} {
  if (typeof window === "undefined") {
    return { username: "", hasValidSubdomain: false };
  }

  const host = window.location.hostname;
  if (!host) {
    return { username: "", hasValidSubdomain: false };
  }

  const parts = host.split(".");

  // Handle subdomains like username.buildarclabs.in
  if (parts.length >= 3) {
    return handleMultiPartDomain(parts);
  }

  // Handle localhost development
  if (
    parts.length >= 2 &&
    (parts[1] === "localhost" || parts[1].includes("localhost"))
  ) {
    return { username: parts[0], hasValidSubdomain: true };
  }

  return { username: "", hasValidSubdomain: false };
}

function handleMultiPartDomain(parts: string[]): {
  username: string;
  hasValidSubdomain: boolean;
} {
  const subdomain = parts[0];
  const domain = parts.slice(1).join(".");
  const reserved = ["www", "api", "admin", "app", "mail", "blog", "docs"];

  // Check for buildarclabs.in or other configured domains
  if (
    (domain === "buildarclabs.in" || domain === "cofounds.in") &&
    !reserved.includes(subdomain.toLowerCase())
  ) {
    return { username: subdomain, hasValidSubdomain: true };
  }

  return { username: "", hasValidSubdomain: false };
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
      setIsLoading(true);
      setError(null);

      // Extract username from client-side
      const { username: extractedUsername, hasValidSubdomain: validSubdomain } =
        extractUsernameClient();

      setUsername(extractedUsername);
      setHasValidSubdomain(validSubdomain);

      if (!validSubdomain) {
        setIsLoading(false);
        return;
      }

      try {
        const portfolioResult = await fetchPortfolio(extractedUsername);
        handlePortfolioResult(portfolioResult, setPortfolioData, setError);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
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

function handlePortfolioResult(
  portfolioResult: Awaited<ReturnType<typeof fetchPortfolio>>,
  setPortfolioData: (data: PortfolioData) => void,
  setError: (error: string) => void
): void {
  if (!portfolioResult.success) {
    const errorMessage =
      portfolioResult.error instanceof Error
        ? portfolioResult.error.message
        : "Failed to fetch portfolio data";
    setError(errorMessage);
    return;
  }

  if (!portfolioResult.data) {
    setError("No portfolio data found");
    return;
  }

  const transformedData = transformUserData(portfolioResult.data);
  setPortfolioData(transformedData as PortfolioData);
}
