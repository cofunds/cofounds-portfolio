"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useHydrated } from "@/hooks/use-hydrated";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const hydrated = useHydrated();

  if (!hydrated) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
