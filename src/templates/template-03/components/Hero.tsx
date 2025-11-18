import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaPinterest,
  FaBehance,
  FaDribbble,
  FaCalendar,
  FaProductHunt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Code2, Mail, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { SkillBadge } from "./SkillBadge";

// Map of social media platforms to their respective icons
const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  telegram: FaTelegram,
  pinterest: FaPinterest,
  behance: FaBehance,
  dribbble: FaDribbble,
  leetcode: Code2,
  calcom: FaCalendar,
  "cal.com": FaCalendar,
  product_hunt: FaProductHunt,
  "product hunt": FaProductHunt,
  website: Globe,
  mail: Mail,
  default: Globe,
};

type SkillItem = {
  skill: { id: string; name: string };
  icon: string | null;
  color: string | null;
  isCoreSkill: boolean;
};

type LinkItem = {
  linkUrl: string;
  linkTitle: string;
};

type PortfolioData = {
  about?: string;
  summary?: string;
  skillset?: SkillItem[];
  links?: LinkItem[];
};

type HeroProps = {
  name?: string;
  title?: string;
  headerText?: string;
  email?: string;
  imageSrc?: string;
  skills?: string[];
  portfolioData?: PortfolioData;
};

// Default avatar as a data URL
const defaultAvatar = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='200' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='40' text-anchor='middle' dy='.3em' fill='%239ca3af'%3EU%3C/text%3E%3C/svg%3E`;

export default function Hero({
  name = "Ram",
  headerText = "I build interactive web applications with modern technologies.",
  email,
  imageSrc,
  portfolioData = {},
}: HeroProps) {
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);

  useEffect(() => {
    if (imageSrc && imageSrc.trim() !== "") {
      const img = new window.Image();
      img.src = imageSrc;
      img.onload = () => setAvatarUrl(imageSrc);
      img.onerror = () => setAvatarUrl(defaultAvatar);
    } else {
      setAvatarUrl(defaultAvatar);
    }
  }, [imageSrc]);

  return (
    <div className="py-8">
      {/* Avatar */}
      <div className="mb-6">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          <img
            src={avatarUrl || defaultAvatar}
            alt={name || "Profile"}
            width={96}
            height={96}
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-left">
        {/* Heading */}
        <div className="mb-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Hi, I'm {name} — <span className="text-gray-500">{headerText}</span>
          </h1>
        </div>

        {/* Core Skills */}
        {portfolioData?.skillset && Array.isArray(portfolioData.skillset) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {portfolioData.skillset
              .filter((s) => s.isCoreSkill)
              .map((skillItem, index) => (
                <SkillBadge
                  key={`${skillItem.skill.id}-${index}`}
                  name={skillItem.skill.name}
                  icon={skillItem.icon}
                  color={skillItem.color}
                />
              ))}
          </div>
        )}

        {/* Social Icons */}
        <div className=" flex items-center gap-2 text-gray-400">
          {portfolioData?.links &&
            Array.isArray(portfolioData.links) &&
            portfolioData.links.length > 0 &&
            portfolioData.links.map((link, index) => {
              if (!(link.linkUrl && link.linkTitle)) {
                return null;
              }

              const platformLower = link.linkTitle.toLowerCase();
              const IconComponent =
                socialIcons[platformLower] || socialIcons.default;

              return (
                <a
                  key={index}
                  href={
                    link.linkUrl.startsWith("http")
                      ? link.linkUrl
                      : `https://${link.linkUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-gray-900"
                  aria-label={link.linkTitle}
                >
                  <IconComponent className="size-5" />
                </a>
              );
            })}

          {/* Email icon */}
          {email && (
            <a
              href={`mailto:${email}`}
              className="transition-colors duration-200 hover:text-gray-900"
            >
              <Mail className="size-5" />
            </a>
          )}
        </div>
        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <a
            href={`mailto:${email || "contact@example.com"}`}
            className="inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}
