"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { FaGlobe, FaBuilding } from "react-icons/fa";
import Modal from "./modal";
import { useState } from "react";
import { Calendar } from "lucide-react";

interface WorksProps {
  experience?: Array<{
    title: string;
    companyName: string;
    description: string;
    startedAt: string;
    endAt?: string;
  }>;
}

export default function Works({ experience }: WorksProps) {
  const [isWorkModalOpen, setWorkModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<
    NonNullable<WorksProps["experience"]>[0] | null
  >(null);

  const availableExperience = experience || [];

  if (availableExperience.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}/${month}`;
  };

  const handleWorkClick = (work: NonNullable<WorksProps["experience"]>[0]) => {
    setSelectedWork(work);
    setWorkModalOpen(true);
  };

  return (
    <>
      <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
        <div className="text-center mb-12 sm:mb-16">
          <FaGlobe className="text-foreground/40 w-15 h-15 mx-auto mb-4" />
          <p className=" font-medium text-base text-foreground/40 uppercase tracking-wider mb-2">
            HISTORY SECTION
          </p>
          <h2 className=" font-medium text-4xl sm:text-5xl lg:text-[52px] text-foreground leading-tight">
            History the work
          </h2>
        </div>
        <div className="bg-secondary rounded-[20px] p-8 sm:p-10">
          <div className="space-y-6">
            {availableExperience.map((work, index) => {
              const startFormatted = formatDate(work.startedAt);
              const period = work.endAt
                ? `${startFormatted} -> ${formatDate(work.endAt)}`
                : `Since ${startFormatted}`;

              return (
                <button
                  key={index}
                  onClick={() => handleWorkClick(work)}
                  className="w-full text-left bg-background/20 relative overflow-hidden hover:bg-background/50 transition-all duration-500 ease-in-out rounded-[16px] p-6 sm:p-8"
                >
                  <div className="absolute w-full h-16 -top-20 left-0 bg-primary/10 blur-2xl" />
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                    <div className="lg:w-1/4">
                      <p className=" font-normal text-base text-foreground mb-2">
                        {period}
                      </p>
                      <h3 className=" font-medium text-3xl sm:text-4xl text-foreground">
                        {work.companyName}
                      </h3>
                    </div>
                    <div className="lg:w-3/4 border-l border-[#ffffff0c] pl-6 lg:pl-8">
                      <h4 className=" font-medium text-3xl text-foreground mb-4">
                        {work.title}
                      </h4>
                      <div
                        className="font-normal text-base text-foreground/40 leading-6 prose prose-sm max-w-none line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: work.description }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Work Modal */}
      {selectedWork && (
        <Modal
          isOpen={isWorkModalOpen}
          onClose={() => setWorkModalOpen(false)}
          title={selectedWork.title}
        >
          <div className="max-h-112 overflow-y-auto rounded-lg bg-background p-6">
            <div className="space-y-6 text-foreground/80">
              {/* Company */}
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <FaBuilding className="w-4 h-4" />
                <span className="font-medium">{selectedWork.companyName}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Calendar className="w-4 h-4" />
                <span>
                  {selectedWork.endAt
                    ? `${new Date(selectedWork.startedAt).toLocaleDateString()} → ${new Date(
                        selectedWork.endAt
                      ).toLocaleDateString()}`
                    : `Since ${new Date(selectedWork.startedAt).toLocaleDateString()}`}
                </span>
              </div>

              {/* Description */}
              <div
                className="prose prose-sm max-w-none text-foreground/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedWork.description }}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
