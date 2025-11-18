import { SkillBadge } from "../SkillBadge";
import type { ProjectSkillset } from "@/types/portfolio.types";

type TechStackProps = {
  technologies: ProjectSkillset[];
};

export function ProjectTechStack({ technologies }: TechStackProps) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="mb-3 text-lg font-semibold">Skills Used</h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <SkillBadge
            key={tech.id}
            name={tech.skill.name}
            icon={tech.icon}
            color={tech.color}
          />
        ))}
      </div>
    </div>
  );
}
