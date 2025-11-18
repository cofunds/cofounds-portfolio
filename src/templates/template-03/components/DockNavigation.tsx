import { Link } from "react-router-dom";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home, Code, Briefcase, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DockNavigationProps = {
  email?: string;
};

export default function DockNavigation({ email }: DockNavigationProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <Dock className="bg-transparent backdrop-blur-md rounded-full px-6 py-2 border border-white/20 shadow-lg">
        {/* Home */}
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="bg-gray-100 hover:bg-gray-200 transition-colors">
              <Link
                to="/"
                className="flex items-center justify-center w-full h-full"
              >
                <Home className="size-5 text-gray-700" />
              </Link>
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent>Home</TooltipContent>
        </Tooltip>

        {/* Projects */}
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="bg-gray-100 hover:bg-gray-200 transition-colors">
              <Link
                to="/projects"
                className="flex items-center justify-center w-full h-full"
              >
                <Briefcase className="size-5 text-gray-700" />
              </Link>
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent>Projects</TooltipContent>
        </Tooltip>

        {/* Experiences */}
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="bg-gray-100 hover:bg-gray-200 transition-colors">
              <Link
                to="/experiences"
                className="flex items-center justify-center w-full h-full"
              >
                <Code className="size-5 text-gray-700" />
              </Link>
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent>Experiences</TooltipContent>
        </Tooltip>

        {/* Mail */}
        {email && (
          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon className="bg-gray-100 hover:bg-gray-200 transition-colors">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center justify-center w-full h-full"
                >
                  <Mail className="size-5 text-gray-700" />
                </a>
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent>Contact</TooltipContent>
          </Tooltip>
        )}

        <div className="px-2 flex items-center justify-center self-stretch">
          <span className="text-2xl text-gray-400 font-extralight leading-none">
            |
          </span>
        </div>

        {/* Build Your Own Portfolio Link */}
        <Tooltip>
          <TooltipTrigger asChild>
            <DockIcon className="bg-gray-100 hover:bg-gray-200 transition-colors p-0">
              <a
                href="https://www.hirewiser.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full"
              >
                <img
                  src="/logo.svg"
                  alt="HireWiser"
                  className="w-10 h-10 object-cover rounded-full bg-white"
                  width={30}
                  height={30}
                />
              </a>
            </DockIcon>
          </TooltipTrigger>
          <TooltipContent>Build Your Own Portfolio</TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
