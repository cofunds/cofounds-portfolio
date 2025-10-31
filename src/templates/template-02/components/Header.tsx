"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

type HeaderProps = {
  userName?: string;
  projectsCount?: number;
  experienceCount?: number;
};

const Header: React.FC<HeaderProps> = ({
  userName = "Portfolio",
  projectsCount = 0,
  experienceCount = 0,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Create menu items with scroll targets
  const menuItems = [
    { label: "Home", href: "#hero", id: "hero", show: true },
    { label: "About", href: "#about", id: "about", show: true },
    {
      label: "Projects",
      href: "#projects",
      id: "projects",
      show: projectsCount > 0,
    },
    { label: "Work", href: "#work", id: "work", show: experienceCount > 0 },
    { label: "Contact", href: "#contact", id: "contact", show: true },
  ].filter((item) => item.show);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.id);
      let currentSection = "hero";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-2 sticky top-1 z-100">
      <div className="flex justify-between items-center bg-secondary/20 backdrop-blur-md rounded-[26px] px-3 py-3 sm:px-4 sm:py-3 md:px-6 md:py-4 relative">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <h1 className="text-foreground font-medium text-lg sm:text-xl md:text-2xl lg:text-[26px] leading-8">
            {userName}
          </h1>
        </div>

        {/* Hamburger Menu Icon (Mobile only) */}
        <button
          type="button"
          className="block lg:hidden p-2 text-foreground"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Menu</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`
          ${menuOpen ? "block" : "hidden"} 
          lg:block 
          absolute lg:relative 
          top-full lg:top-auto 
          left-0 lg:left-auto 
          w-full lg:w-auto 
          bg-secondary lg:bg-transparent 
          mt-2 lg:mt-0 
          rounded-lg lg:rounded-none 
          p-4 lg:p-0 
          z-50
        `}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-normal text-sm sm:text-base transition-colors duration-200 hover:text-foreground cursor-pointer ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
            <AnimatedThemeToggler />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
