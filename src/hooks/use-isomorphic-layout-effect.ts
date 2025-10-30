import { useEffect, useLayoutEffect } from "react";

// Use useLayoutEffect on client-side and useEffect on server-side
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
