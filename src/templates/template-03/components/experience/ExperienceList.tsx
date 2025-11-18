import type { Experience as ExperienceType } from "@/types/portfolio.types";
import ExperienceCard from "./ExperienceCard";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

type ExperienceListProps = {
  experiences: ExperienceType[];
  expandAll?: boolean;
};

export default function ExperienceList({
  experiences,
  expandAll = false,
}: ExperienceListProps) {
  if (experiences.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No work experiences found.</p>
      </div>
    );
  }

  const defaultValue = expandAll
    ? experiences.map((exp) => exp.id?.toString() ?? exp.companyName)
    : [experiences[0].id?.toString() ?? "0"];

  return (
    <Accordion
      type="multiple"
      defaultValue={defaultValue}
      className="flex flex-col gap-6"
    >
      {experiences.map((experience) => (
        <AccordionItem
          key={experience.id}
          value={experience.id?.toString() ?? experience.companyName}
          className="border-none"
        >
          <ExperienceCard experience={experience} />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
