import { Link } from "react-router-dom";
import ProjectsList from "./projects/ProjectsList";
import type { Project } from "@/types/portfolio.types";
import { Button } from "@/components/ui/button";

type ProjectsSectionProps = {
  projects?: Project[];
};

export default function ProjectsSection({
  projects = [],
}: ProjectsSectionProps) {
  const visibleProjects = projects.slice(0, 4);
  const hasMore = projects.length > 4;

  return (
    <div>
      <div className="max-w-3xl mx-auto px-5 pb-15">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
        </div>
        <ProjectsList projects={visibleProjects} />
        {hasMore && (
          <div className="mt-8 text-center">
            <Button variant="outline">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
