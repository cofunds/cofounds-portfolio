export interface Skill {
  name?: string;
  skill?: {
    name: string;
  };
  skillLevel: string | null;
}

export const skillLevelToValue = (level: string | null): number => {
  switch (level?.toLowerCase()) {
    case "advanced":
      return 90;
    case "intermediate":
      return 60;
    case "beginner":
      return 30;
    default:
      return 20;
  }
};

export const getSkillColor = (level: string | null) => {
  switch (level?.toLowerCase()) {
    case "advanced":
      return "var(--chart-1)";
    case "intermediate":
      return "var(--chart-2)";
    case "beginner":
      return "var(--chart-3)";
    default:
      return "var(--muted-foreground)";
  }
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      level: string;
    };
  }>;
}

export function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload?.length) {
    const data = payload[0]?.payload;
    if (!data) return null;
    const { name, level } = data;

    return (
      <div className="px-2 py-1 border shadow-xs rounded-md text-sm bg-(--popover) border-(--border) text-(--popover-foreground)">
        <p className="font-medium">{name}</p>
        <p className="capitalize text-(--muted-foreground)">{level}</p>
      </div>
    );
  }

  return null;
}

export function renderTopSkills(
  skills: Skill[],
  level = "advanced",
  limit = 3
) {
  const filteredSkills = skills
    .filter((skill) => skill.skillLevel?.toLowerCase() === level.toLowerCase())
    .sort(
      (a, b) =>
        skillLevelToValue(b.skillLevel) - skillLevelToValue(a.skillLevel)
    )
    .slice(0, limit);

  if (filteredSkills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {filteredSkills.map((skillItem, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md px-3 py-1.5 text-sm shadow-xs
                   flex items-center flex-wrap gap-x-1.5 transition-colors"
        >
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {skillItem.skill?.name}
          </span>
        </div>
      ))}
    </div>
  );
}
