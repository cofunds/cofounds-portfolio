import { useEffect, useState } from "react";

/**
 * Hook to detect if component has been hydrated on client-side
 * Prevents hydration mismatches by allowing different renders on server vs client
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
