import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function PortfolioPreviewSkeleton() {
  return (
    <SkeletonTheme baseColor="#374151" highlightColor="#4B5563">
      <div className="min-h-screen bg-background text-foreground">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section Skeleton */}
          <AnimatedSection className="mt-4">
            <div className="bg-secondary rounded-[20px] p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="relative max-w-full">
                    <Skeleton height={200} className="mb-4" />
                    <Skeleton
                      height={60}
                      width="60%"
                      className="rounded-full"
                    />
                  </div>
                </div>
                {/* Right Content - Image */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="aspect-video w-full">
                    <Skeleton height="100%" className="rounded-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* About Section Skeleton */}
          <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
            <div className="text-center mb-12 sm:mb-16">
              <Skeleton
                circle
                height={60}
                width={60}
                className="mx-auto mb-4"
              />
              <Skeleton height={20} width={200} className="mx-auto mb-2" />
              <Skeleton height={60} width={300} className="mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* About Text */}
              <div className="space-y-4">
                <Skeleton height={20} />
                <Skeleton height={20} />
                <Skeleton height={20} width="80%" />
              </div>

              {/* Social Links Grid */}
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-secondary rounded-[16px] p-4 flex flex-col items-center"
                  >
                    <Skeleton circle height={40} width={40} className="mb-2" />
                    <Skeleton height={15} width={60} />
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-12">
              <Skeleton height={30} width={200} className="mb-6" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <Skeleton
                    key={i}
                    height={32}
                    width={80 + Math.random() * 40}
                    className="rounded-full"
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Projects Section Skeleton */}
          <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
            <div className="text-center mb-12 sm:mb-16">
              <Skeleton
                circle
                height={60}
                width={60}
                className="mx-auto mb-4"
              />
              <Skeleton height={20} width={200} className="mx-auto mb-2" />
              <Skeleton height={60} width={250} className="mx-auto" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-secondary rounded-[20px] p-6 sm:p-8">
                  <div className="mb-6">
                    <Skeleton height={30} width="70%" className="mb-2" />
                    <div className="flex items-center gap-2 mb-4">
                      <Skeleton circle height={20} width={20} />
                      <Skeleton height={15} width="60%" />
                    </div>
                    <Skeleton height={15} />
                    <Skeleton height={15} />
                    <Skeleton height={15} width="80%" />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Works Section Skeleton */}
          <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
            <div className="text-center mb-12 sm:mb-16">
              <Skeleton
                circle
                height={60}
                width={60}
                className="mx-auto mb-4"
              />
              <Skeleton height={20} width={200} className="mx-auto mb-2" />
              <Skeleton height={60} width={280} className="mx-auto" />
            </div>

            <div className="bg-secondary rounded-[20px] p-8 sm:p-10">
              <div className="space-y-6">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-background/20 rounded-[16px] p-6 sm:p-8"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                      <div className="lg:w-1/4">
                        <Skeleton height={16} width={120} className="mb-2" />
                        <Skeleton height={40} width="80%" />
                      </div>
                      <div className="lg:w-3/4 border-l border-[#ffffff0c] pl-6 lg:pl-8">
                        <Skeleton height={40} width="60%" className="mb-4" />
                        <Skeleton height={15} />
                        <Skeleton height={15} width="90%" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Blogs Section Skeleton */}
          <AnimatedSection className="mt-20 sm:mt-24 lg:mt-32">
            <div className="text-center mb-12 sm:mb-16">
              <Skeleton
                circle
                height={60}
                width={60}
                className="mx-auto mb-4"
              />
              <Skeleton height={20} width={200} className="mx-auto mb-2" />
              <Skeleton height={60} width={200} className="mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="bg-secondary rounded-[20px] p-6">
                  <Skeleton height={200} className="rounded-[16px] mb-4" />
                  <Skeleton height={24} width="80%" className="mb-2" />
                  <Skeleton height={15} />
                  <Skeleton height={15} width="70%" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Footer Section Skeleton */}
        <section className="mt-20 sm:mt-24 lg:mt-32">
          <div className="text-center">
            {/* Profile Image */}
            <div className="relative overflow-hidden w-80 h-56 mx-auto">
              <Skeleton
                circle
                height={160}
                width={160}
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
              />
            </div>

            <div className="bg-secondary rounded-t-[20px] p-8 sm:p-12 max-w-4xl mx-auto">
              <Skeleton
                circle
                height={64}
                width={64}
                className="mx-auto mb-6"
              />
              <Skeleton height={52} width={400} className="mx-auto mb-6" />
              <Skeleton
                height={50}
                width={250}
                className="mx-auto rounded-full"
              />
            </div>

            {/* Footer */}
            <div className="bg-secondary p-3">
              <div className="grid grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
                <div className="bg-secondary rounded-[18px] px-4 py-2">
                  <Skeleton height={16} width={200} />
                </div>
                <div className="text-center">
                  <Skeleton height={16} width={180} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SkeletonTheme>
  );
}
