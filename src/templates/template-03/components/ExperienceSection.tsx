import { Link } from "react-router-dom";
import type { Experience } from "@/types/portfolio.types";
import { Button } from "@/components/ui/button";
import ExperienceList from "./experience/ExperienceList";

type ExperienceSectionProps = {
  experiences?: Experience[];
};

export default function ExperienceSection({
  experiences = [],
}: ExperienceSectionProps) {
  const visibleExperiences = experiences.slice(0, 3);
  const hasMore = experiences.length > 3;

  return (
    <div>
      <div className="max-w-3xl mx-auto px-5 pb-15">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl font-bold text-gray-800">Experiences</h2>
        </div>
        <ExperienceList experiences={visibleExperiences} />
        {hasMore && (
          <div className="mt-8 text-center">
            <Button variant="outline">
              <Link to="/experiences">Show all work experiences</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
