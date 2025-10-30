"use client";

import About from "./components/About";
import Blogs from "./components/Blog";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Works from "./components/Works";
import type { PortfolioData } from "@/components/portfolio-data-provider";

/**
 * Template-02: Modern Portfolio
 *
 * A modern, visually appealing portfolio template with modal interactions,
 * animated sections, and a clean grid-based layout.
 *
 * Features:
 * - Hero section with large header image
 * - Modal-based "About Me" and skills sections
 * - Social media icon grid
 * - Project cards with hover effects
 * - Work experience timeline
 * - Contact footer
 *
 * @param portfolioData - The user's portfolio data
 */
export default function Template02({
  portfolioData,
}: {
  portfolioData: PortfolioData;
}) {
  // Use raw data directly - no transformation needed!
  const projectsCount = portfolioData.projectsRaw?.length || 0;
  const experienceCount = portfolioData.experience?.length || 0;
  const blogsCount = 0; // TODO: Add blog support when available

  // Use raw experience data (already in correct format)
  const experienceData = portfolioData.experience || [];

  // Use raw projects data (already in correct format)
  const projectsData =
    portfolioData.projectsRaw?.map((project) => ({
      title: project.title,
      description: project.description,
      link: project.link || "",
      startedAt: project.startedAt,
      endAt: project.endAt || undefined,
    })) || [];

  // Convert experience data null to undefined for TypeScript
  const experienceDataFormatted = experienceData.map((exp) => ({
    ...exp,
    endAt: exp.endAt || undefined,
  }));

  // Use raw skillset data (already has skill levels)
  const skillsetData = portfolioData.skillset || [];

  // Use raw links data (already in correct format)
  const linksData = portfolioData.links || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        userName={portfolioData.name}
        projectsCount={projectsCount}
        experienceCount={experienceCount}
        blogsCount={blogsCount}
      />
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section id="hero">
          <Hero
            title={portfolioData.headerText}
            imageSrc={portfolioData.headerImage}
            email={portfolioData.email}
          />
        </section>

        {/* About Section */}
        <section id="about">
          <About
            description={portfolioData.summary}
            skillset={skillsetData}
            links={linksData}
          />
        </section>

        {/* Projects Section */}
        {projectsData && projectsData.length > 0 && (
          <section id="projects">
            <Projects projects={projectsData} />
          </section>
        )}

        {/* Work/Experience Section */}
        {experienceDataFormatted && experienceDataFormatted.length > 0 && (
          <section id="work">
            <Works experience={experienceDataFormatted} />
          </section>
        )}

        {/* Blog Section - TODO: Implement when blog data is available */}
        {blogsCount > 0 && (
          <section id="blog">
            <Blogs />
          </section>
        )}
      </div>

      {/* Contact/Footer Section */}
      <section id="contact">
        <Footer
          email={portfolioData.email}
          firstName={portfolioData.firstName}
          lastName={portfolioData.lastName}
          profileImage={portfolioData.profileImage}
        />
      </section>
    </div>
  );
}
