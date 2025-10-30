"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { Calendar, Link2 } from "lucide-react";
import { FaDatabase } from "react-icons/fa";
import Modal from "./modal";
import { useState } from "react";

interface ProjectsProps {
  projects?: Array<{
    title: string;
    description: string;
    link: string;
    startedAt?: string;
    endAt?: string;
  }>;
}

export default function ProjectSection({ projects }: ProjectsProps) {
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    NonNullable<ProjectsProps["projects"]>[number] | null
  >(null);

  const availableProjects = projects || [];

  if (availableProjects.length === 0) return null;

  const handleProjectClick = (
    project: NonNullable<ProjectsProps["projects"]>[number]
  ) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  return (
    <>
      <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
        <div className="text-center mb-12 sm:mb-16">
          <FaDatabase className="text-foreground/40 w-15 h-15 mx-auto mb-4" />
          <p className="font-medium text-base text-foreground/40 uppercase tracking-wider mb-2">
            PROJECT SECTION
          </p>
          <h2 className=" font-medium text-4xl sm:text-5xl lg:text-[52px] text-foreground leading-tight">
            My Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {availableProjects.map((project, index) => (
            <button
              key={index}
              onClick={() => handleProjectClick(project)}
              className="bg-secondary rounded-[20px] p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg text-left w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-full">
                  <h3 className="font-medium text-xl sm:text-2xl text-foreground mb-2">
                    {project.title}
                  </h3>
                  <div className="text-foreground/50 flex flex-row items-center gap-2 py-2 hover:text-primary">
                    <Link2 />
                    <Link
                      href={project.link}
                      onClick={(e) => e.stopPropagation()}
                      className="truncate max-w-[300px] block"
                    >
                      {project.link}
                    </Link>
                  </div>
                  <div
                    className="line-clamp-5 overflow-hidden text-foreground/80"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Project Modal */}
      {selectedProject && (
        <Modal
          isOpen={isProjectModalOpen}
          onClose={() => setProjectModalOpen(false)}
          title={selectedProject.title}
        >
          <div className="max-h-112 overflow-y-auto rounded-lg bg-background p-6">
            <div className="space-y-6 text-foreground/80">
              {/* Metadata Section */}
              <div className="flex flex-col gap-3 text-sm text-foreground/60">
                {/* Project Link */}
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  <Link
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary truncate"
                  >
                    {selectedProject.link}
                  </Link>
                </div>

                {/* Started Date */}
                <div className="flex items-center gap-6 text-sm text-foreground/60">
                  {selectedProject.startedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Started:{" "}
                        {new Date(
                          selectedProject.startedAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {selectedProject.endAt
                        ? `Ended: ${new Date(selectedProject.endAt).toLocaleDateString()}`
                        : "Currently Building 🚀"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div
                className="prose prose-sm max-w-none text-foreground/90 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: selectedProject.description,
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
