import { useParams } from "react-router-dom";
import { usePortfolio } from "@/context/PortfolioContext";
import ExperienceCard from "./components/experience/ExperienceCard";
import DockNavigation from "./components/DockNavigation";

function ExperiencePage03() {
  const { id } = useParams<{ id: string }>();
  const { getExperienceByIdWithTemplate } = usePortfolio();
  const { data: experienceData } = getExperienceByIdWithTemplate(id || "");

  // Get email from portfolio context
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  if (!experienceData) {
    return (
      <div className="min-h-screen w-full bg-white relative overflow-hidden font-hanken-grotesk">
        <DockNavigation email={portfolioData?.email} />
        <div className="max-w-4xl mx-auto py-20 text-red-500 font-semibold">
          Experience not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden font-hanken-grotesk mb-10">
      <DockNavigation email={portfolioData?.email} />
      <div className="max-w-3xl mx-auto px-5 py-20">
        <ExperienceCard experience={experienceData} />
      </div>
    </div>
  );
}

export default ExperiencePage03;
