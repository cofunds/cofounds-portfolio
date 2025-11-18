import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/portfolio.types";

type ProjectsListProps = {
  projects?: Project[];
};

export default function ProjectsList({ projects = [] }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No projects found.</p>
      </div>
    );
  }

  return (
    <section id="projects">
      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
