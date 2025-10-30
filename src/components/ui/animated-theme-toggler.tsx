"use client";
import { useState, useEffect, useCallback, forwardRef } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useHydrated } from "@/hooks/use-hydrated";

type Props = {
  className?: string;
};

export const AnimatedThemeToggler = forwardRef<HTMLButtonElement, Props>(
  ({ className }, ref) => {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [buttonElement, setButtonElement] =
      useState<HTMLButtonElement | null>(null);
    const hydrated = useHydrated();

    // Custom ref callback that handles both forwarded ref and internal state
    const refCallback = useCallback(
      (el: HTMLButtonElement | null) => {
        setButtonElement(el);
        if (typeof ref === "function") {
          ref(el);
        } else if (ref && typeof ref === "object") {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            el;
        }
      },
      [ref]
    );

    useEffect(() => {
      setMounted(true);

      const updateTheme = () => {
        if (typeof document !== "undefined") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      };

      updateTheme();

      if (typeof document !== "undefined") {
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });

        return () => observer.disconnect();
      }
    }, []);

    const toggleTheme = useCallback(async () => {
      if (!(buttonElement && mounted) || typeof document === "undefined")
        return;

      // Check if browser supports view transitions
      const supportsViewTransition = "startViewTransition" in document;

      if (supportsViewTransition) {
        try {
          await document.startViewTransition(() => {
            flushSync(() => {
              const newTheme = !isDark;
              setIsDark(newTheme);
              document.documentElement.classList.toggle("dark");
              localStorage.setItem("theme", newTheme ? "dark" : "light");
            });
          }).ready;

          const { top, left, width, height } =
            buttonElement.getBoundingClientRect();
          const x = left + width / 2;
          const y = top + height / 2;
          const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
          );

          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 700,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        } catch (error) {
          // Fallback for browsers that don't support view transitions
          const newTheme = !isDark;
          setIsDark(newTheme);
          document.documentElement.classList.toggle("dark");
          localStorage.setItem("theme", newTheme ? "dark" : "light");
        }
      } else {
        // Fallback for browsers that don't support view transitions
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      }
    }, [isDark, mounted, buttonElement]);

    // Don't render until hydrated to prevent hydration mismatch
    if (!(hydrated && mounted)) {
      return (
        <button
          ref={refCallback}
          className={cn(className)}
          suppressHydrationWarning
        >
          <MoonIcon />
        </button>
      );
    }

    return (
      <button ref={refCallback} onClick={toggleTheme} className={cn(className)}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    );
  }
);

AnimatedThemeToggler.displayName = "AnimatedThemeToggler";
