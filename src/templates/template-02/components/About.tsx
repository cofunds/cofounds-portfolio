"use client";

import Link from "next/link";
import Skills from "./Skills";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Modal from "./modal";
import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const getLinkIcon = (linkTitle: string) => {
  const title = linkTitle.toLowerCase();
  switch (title) {
    case "instagram":
      return <FaInstagram className="h-8 w-8" />;
    case "linkedin":
      return <FaLinkedin className="h-8 w-8" />;
    case "github":
      return <FaGithub className="h-8 w-8" />;
    case "twitter":
    case "x":
      return <FaTwitter className="h-8 w-8" />;
    case "telegram":
      return <FaTelegram className="h-8 w-8" />;
    case "youtube":
      return <FaYoutube className="h-8 w-8" />;
    case "behance":
      return <FaBehance className="h-8 w-8" />;
    case "dribbble":
      return <FaDribbble className="h-8 w-8" />;
    case "pinterest":
      return <FaPinterest className="h-8 w-8" />;
    default:
      return null;
  }
};

interface AboutProps {
  description?: string;
  skillset?: Array<{ skillLevel: string; skill: { name: string } }>;
  links?: Array<{ linkUrl: string; linkTitle: string }>;
}

export default function About({ description, skillset, links }: AboutProps) {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isSkillModalOpen, setSkillModalOpen] = useState(false);

  const aboutContent = description || "<p>No description available.</p>";

  const availableLinks = links || [];

  return (
    <>
      <AnimatedSection className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Me */}
          <div className="lg:col-span-1 bg-secondary rounded-[20px] p-6 sm:p-8 flex flex-col h-full">
            <div>
              <h3 className="font-inter-display font-medium text-2xl sm:text-3xl text-foreground mb-4">
                About Me
              </h3>
              <button onClick={() => setAboutModalOpen(true)}>
                <div
                  className="text-left font-inter-display font-normal text-foreground/80 leading-7 prose prose-sm max-w-none line-clamp-12"
                  dangerouslySetInnerHTML={{ __html: aboutContent }}
                />
                See More
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-7">
            {/* Tool Icons */}
            <div className="grid grid-cols-3 gap-4">
              {availableLinks.map((link, index) => (
                <div
                  key={index}
                  className="bg-secondary rounded-[16px] p-3 sm:p-3 flex items-center justify-center"
                >
                  <Link
                    href={link.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-foreground hover:text-primary transition-colors">
                      {getLinkIcon(link.linkTitle)}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Skills Section - Only render if skillset exists and has items */}
            {skillset && skillset.length > 0 && (
              <button
                className="w-full"
                onClick={() => setSkillModalOpen(true)}
              >
                <Skills skills={skillset} />
              </button>
            )}
          </div>
        </div>
      </AnimatedSection>

      <Modal
        isOpen={isAboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        title="About Me"
      >
        <div
          className="font-inter-display font-normal text-foreground/80 leading-7 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: aboutContent }}
        />
      </Modal>

      {/* Skills Modal - Only render if skillset exists and has items */}
      {skillset && skillset.length > 0 && (
        <Modal
          isOpen={isSkillModalOpen}
          onClose={() => setSkillModalOpen(false)}
          title="My Skills"
        >
          <Skills skills={skillset} />
        </Modal>
      )}
    </>
  );
}
