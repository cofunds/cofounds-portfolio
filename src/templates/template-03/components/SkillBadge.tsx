import { Brain } from "lucide-react";

type SkillBadgeProps = {
  name: string;
  icon: string | null;
  color?: string | null;
};

export function SkillBadge({ name, icon, color }: SkillBadgeProps) {
  const renderIcon = () => {
    // If icon is a URL (skillicons.dev or custom)
    if (icon?.startsWith("http")) {
      return (
        <img src={icon} alt={name} width={16} height={16} className="h-4 w-4" />
      );
    }

    // Fallback to brain icon with color
    return <Brain className="h-4 w-4" style={{ color: color ?? "#3B82F6" }} />;
  };

  return (
    <div className="group inline-flex items-center text-sm bg-black/5 border border-dashed border-black/20 py-1 px-2 rounded-md text-black">
      {/* Icon */}
      <div className="shrink-0">{renderIcon()}</div>

      {/* Skill Name */}
      <span className="ml-1 shrink-0 font-bold">{name}</span>
    </div>
  );
}
