"use client";

import { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  CustomTooltip,
  getSkillColor,
  type Skill,
  skillLevelToValue,
} from "./skill_chips";

type SkillsSectionProps = {
  skills: Skill[];
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!(mounted && skills) || skills.length === 0) {
    return null;
  }

  const radarData = skills
    .sort(
      (a, b) =>
        skillLevelToValue(b.skillLevel) - skillLevelToValue(a.skillLevel)
    )
    .slice(0, 8)
    .map((skill) => ({
      name: skill.skill?.name ?? skill.name,
      value: skillLevelToValue(skill.skillLevel),
      level: skill.skillLevel,
    }));

  const barData = skills
    .sort(
      (a, b) =>
        skillLevelToValue(b.skillLevel) - skillLevelToValue(a.skillLevel)
    )
    .map((skill) => ({
      name: skill.skill?.name ?? skill.name,
      value: skillLevelToValue(skill.skillLevel),
      level: skill.skillLevel,
    }));

  return (
    <section id="skills">
      <div className="rounded-[20px] border shadow-xs p-5 bg-(--card) border-(--border)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid
                  strokeDasharray="3 3"
                  stroke="var(--muted-foreground)"
                  opacity={0.3}
                />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 9,
                  }}
                  tickLine={false}
                />
                <Radar
                  dataKey="value"
                  stroke="var(--chart-2)"
                  fill="var(--chart-1)"
                  fillOpacity={0.5}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 0, right: 5, left: 5, bottom: 50 }}
                layout="horizontal"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                  stroke="var(--muted-foreground)"
                />
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 9,
                  }}
                  angle={90}
                  textAnchor="start"
                  height={70}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="value" barSize={15} radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getSkillColor(entry.level)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
