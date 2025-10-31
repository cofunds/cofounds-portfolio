import { Dock, DockIcon } from "@/components/magicui/dock";
import ExpandableDock from "@/components/ui/expandable-dock";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaBehance,
  FaDribbble,
  FaPinterest,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HomeIcon, MenuIcon } from "lucide-react";
import type { PortfolioData } from "@/components/portfolio-data-provider";
import type { IconType } from "react-icons";

const platformIcons: Record<string, IconType> = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  x: FaXTwitter,
  behance: FaBehance,
  dribbble: FaDribbble,
  pinterest: FaPinterest,
  telegram: FaTelegramPlane,
  youtube: FaYoutube,
};

type NavbarProps = {
  portfolioData: PortfolioData;
};

export default function ResponsiveNavbar({ portfolioData }: NavbarProps) {
  type SocialEntry = {
    name: string;
    url: string;
    navbar: boolean;
  };

  const socialLinks = Object.entries(portfolioData.contact.social || {}).filter(
    ([_, social]) => {
      const s = social as SocialEntry;
      return s?.navbar && s?.url;
    }
  );

  // Desktop Dock Component
  const DesktopDock = () => (
    <div className="hidden md:flex pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background" />
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
        {/* Home icon */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <HomeIcon className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>

        {/* Additional navbar items */}
        {portfolioData.navbar &&
          portfolioData.navbar.length > 0 &&
          portfolioData.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    {item.icon && <item.icon className="size-4" />}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

        <Separator orientation="vertical" className="h-full" />

        {/* Social links */}
        {socialLinks.map(([name, social]) => {
          const s = social as SocialEntry;
          const IconComponent = platformIcons[name.toLowerCase()];
          if (!IconComponent) {
            return null;
          }

          return (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={s.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <IconComponent className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{s.name || name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}

        <Separator orientation="vertical" className="h-full py-2" />

        {/* Theme toggle */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <AnimatedThemeToggler
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );

  // Mobile Expandable Dock Component
  const MobileDock = () => (
    <div className="md:hidden">
      <ExpandableDock
        headerContent={(toggleExpand) => (
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              className="flex items-center gap-3 cursor-pointer appearance-none border-0 bg-transparent p-0"
              onClick={toggleExpand}
            >
              <MenuIcon className="size-5" />
              <span className="text-sm font-medium">Navigation</span>
            </button>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-10"
                )}
              >
                <HomeIcon className="size-5" />
              </Link>
              <AnimatedThemeToggler
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-10"
                )}
              />
            </div>
          </div>
        )}
        className="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              Social Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map(([name, social]) => {
                const s = social as SocialEntry;
                const IconComponent = platformIcons[name.toLowerCase()];
                if (!IconComponent) {
                  return null;
                }

                return (
                  <Link
                    key={name}
                    href={s.url}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-start gap-3 h-12"
                    )}
                  >
                    <IconComponent className="size-4" />
                    <span className="text-sm">{s.name || name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Additional navbar items if any */}
          {portfolioData.navbar && portfolioData.navbar.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
                Quick Links
              </h3>
              <div className="space-y-1">
                {portfolioData.navbar.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-start gap-3 h-10 w-full"
                    )}
                  >
                    {item.icon && <item.icon className="size-4" />}
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </ExpandableDock>
    </div>
  );

  return (
    <>
      <DesktopDock />
      <MobileDock />
    </>
  );
}
