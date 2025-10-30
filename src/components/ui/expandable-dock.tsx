"use client";

import { useState, type ReactNode, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableDockProps {
  headerContent: (toggleExpand: () => void, isExpanded: boolean) => ReactNode;
  children: ReactNode;
  className?: string;
}

const ExpandableDock = ({
  headerContent,
  children,
  className,
}: ExpandableDockProps) => {
  const [animationStage, setAnimationStage] = useState<
    | "collapsed"
    | "widthExpanding"
    | "heightExpanding"
    | "fullyExpanded"
    | "contentFadingOut"
    | "heightCollapsing"
    | "widthCollapsing"
  >("collapsed");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    setAnimationStage("widthExpanding");
    setTimeout(() => setAnimationStage("heightExpanding"), 400);
    setTimeout(() => setAnimationStage("fullyExpanded"), 850);
  };

  const handleCollapse = () => {
    setAnimationStage("contentFadingOut");
    setTimeout(() => setAnimationStage("heightCollapsing"), 250);
    setTimeout(() => setAnimationStage("widthCollapsing"), 650);
    setTimeout(() => setAnimationStage("collapsed"), 1050);
  };

  const isCollapsed = animationStage === "collapsed";
  const isExpanded = animationStage === "fullyExpanded";

  const toggleExpand = () => {
    if (isCollapsed) {
      handleExpand();
    } else {
      handleCollapse();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        isExpanded
      ) {
        handleCollapse();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:px-0">
      <motion.div
        ref={containerRef}
        initial={{
          width: "min(90vw, 360px)",
          height: 68,
          borderRadius: 999,
        }}
        animate={{
          width:
            animationStage === "collapsed" ||
            animationStage === "widthCollapsing"
              ? "min(90vw, 360px)"
              : "min(90vw, 720px)",
          height:
            animationStage === "collapsed" ||
            animationStage === "widthExpanding" ||
            animationStage === "widthCollapsing"
              ? 68
              : "auto",
          borderRadius: isCollapsed ? 999 : 20,
        }}
        transition={{
          width: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
          borderRadius: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        }}
        className={cn(
          "bg-background dark:bg-background backdrop-blur-md shadow-2xl overflow-hidden flex flex-col-reverse mx-auto border",
          "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          "dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
          className
        )}
      >
        <div className="flex items-center gap-4 px-4 sm:px-6 py-4 w-full h-[68px] whitespace-nowrap border-t border-border shrink-0">
          {headerContent(toggleExpand, isExpanded)}
        </div>
        <motion.div
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="p-4 flex-1 flex flex-col overflow-hidden"
        >
          <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExpandableDock;
