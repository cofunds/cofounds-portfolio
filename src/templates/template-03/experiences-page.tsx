import { usePortfolio } from "@/context/PortfolioContext";
import ExperienceList from "./components/experience/ExperienceList";
import DockNavigation from "./components/DockNavigation";
import { BackButton } from "./components/BackButton";

function ExperiencesPage03() {
  const { getAllExperienceWithTemplate } = usePortfolio();
  const { data: experiencesData } = getAllExperienceWithTemplate();
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data: portfolioData } = getAllDetailsWithTemplate();

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden font-hanken-grotesk mb-10">
      {/* DOCK NAVIGATION */}
      <DockNavigation email={portfolioData?.email} />
      <div className="max-w-3xl mx-auto px-5 py-20">
        <BackButton className="mb-10" to="/" label="Back to Home" />
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Experiences</h2>
        <ExperienceList experiences={experiencesData || []} expandAll={true} />
      </div>
    </div>
  );
}

export default ExperiencesPage03;
