import { useParams } from "react-router-dom";
import { usePortfolio } from "@/context/PortfolioContext";
import { ProjectDetailsCard } from "./components/projects/ProjectDetailsCard";
import DockNavigation from "./components/DockNavigation";
import type { ProjectLink } from "@/types/portfolio.types";

function ProjectPage03() {
  const { id } = useParams<{ id: string }>();
  const { getProjectByIdWithTemplate } = usePortfolio();
  const { data: projectData } = getProjectByIdWithTemplate(id || "");

  // Get email and all projects from portfolio context
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  if (!projectData) {
    return (
      <div className="min-h-screen w-full bg-white relative overflow-hidden font-hanken-grotesk">
        <DockNavigation email={portfolioData?.email} />
        <div className="max-w-4xl mx-auto py-20 text-red-500 font-semibold">
          Project not found.
        </div>
      </div>
    );
  }

  // Extract live project link (website, demo, live)
  const liveProjectLink =
    projectData.projectLinks?.find((link: ProjectLink) =>
      ["website", "live", "demo"].some((keyword) =>
        link.linkTitle.toLowerCase().includes(keyword)
      )
    ) || null;

  // Filter out the live link from additional links
  const additionalLinks =
    projectData.projectLinks?.filter(
      (link: ProjectLink) => link.id !== liveProjectLink?.id
    ) || [];

  // Should show additional links section only if we have more than just the live link
  const shouldShowAdditionalLinks = additionalLinks.length > 0;

  // Get related projects (up to 2, excluding current project)
  const relatedProjects = (portfolioData?.projects || [])
    .filter((p) => p.id !== projectData.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden font-hanken-grotesk mb-10">
      <DockNavigation email={portfolioData?.email} />
      <div className="max-w-3xl mx-auto px-5 py-20">
        <ProjectDetailsCard
          project={projectData}
          liveProjectLink={liveProjectLink}
          additionalLinks={additionalLinks}
          shouldShowAdditionalLinks={shouldShowAdditionalLinks}
          relatedProjects={relatedProjects}
        />
      </div>
    </div>
  );
}

export default ProjectPage03;
