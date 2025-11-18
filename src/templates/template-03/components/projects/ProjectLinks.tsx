import { FaGlobe } from "react-icons/fa";
import type { ProjectLink } from "@/types/portfolio.types";

type ProjectLinksProps = {
  liveProjectLink: ProjectLink | null;
  additionalLinks: ProjectLink[];
  shouldShowAdditionalLinks: boolean;
};

export function ProjectLinks({
  liveProjectLink,
  additionalLinks,
  shouldShowAdditionalLinks,
}: ProjectLinksProps) {
  return (
    <>
      {/* Primary CTA */}
      {liveProjectLink && (
        <a
          href={liveProjectLink?.linkUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <FaGlobe className="size-4" />
          {liveProjectLink?.linkTitle || "View Project"}
        </a>
      )}

      {/* Additional Links */}
      {shouldShowAdditionalLinks && additionalLinks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {liveProjectLink ? "Additional Links" : "Links"}
          </h3>
          <div className="flex flex-wrap gap-3">
            {additionalLinks.map((link) => (
              <a
                key={link.id}
                href={link.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
              >
                <FaGlobe className="size-3.5" />
                <span className="text-sm">{link.linkTitle || "View Link"}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
