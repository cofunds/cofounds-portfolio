import { usePortfolio } from "@/context/PortfolioContext";
import ProjectsList from "./components/projects/ProjectsList";
import DockNavigation from "./components/DockNavigation";
import { BackButton } from "./components/BackButton";

function ProjectsPage03() {
  const { getAllProjectsWithTemplate } = usePortfolio();
  const { data: projectsData } = getAllProjectsWithTemplate();

  // Get email from portfolio context
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  if (!projectsData || projectsData.length === 0) {
    return (
      <div className="min-h-screen w-full bg-white relative overflow-hidden font-hanken-grotesk">
        <DockNavigation email={portfolioData?.email} />
        <div className="max-w-4xl mx-auto py-20 text-center">
          <p className="text-gray-500">No projects found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden font-hanken-grotesk mb-10">
      {/* DOCK NAVIGATION */}
      <DockNavigation email={portfolioData?.email} />
      <div className="max-w-3xl mx-auto px-5 py-20">
        <BackButton className="mb-15" to="/" label="Back to Home" />
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Projects</h2>
        <ProjectsList projects={projectsData} />
      </div>
    </div>
  );
}

export default ProjectsPage03;
