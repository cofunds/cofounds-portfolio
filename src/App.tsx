import { Route } from "react-router-dom";
import { useEffect } from "react";
import { usePortfolio } from "./context/PortfolioContext";
import RootPage from "./pages/root-page";
import ProjectsPage from "./pages/projects-page";
import ExperiencesPage from "./pages/experiences-page";
import ProjectPage from "./pages/project-page";
import ExperiencePage from "./pages/experience-page";
import { AnimatedRoutes } from "./components/animated-routes-provider";
import { SmoothScrollProvider } from "./components/smooth-scroll-provider";
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";
import posthog from "posthog-js";

const capturePostHogEvent = (username: string) => {
  posthog.capture("portfolio_opened", {
    user: username,
  });
};

function App() {
  const { getAllDetailsWithTemplate } = usePortfolio();
  const { data, isLoading } = getAllDetailsWithTemplate();

  // Capture PostHog event when data is loaded
  useEffect(() => {
    if (data?.userName) {
      capturePostHogEvent(data?.userName);
    }
  }, [data?.userName]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Helix size="45" speed="2.5" color="black" />
      </div>
    );
  }

  return (
    <SmoothScrollProvider>
      <AnimatedRoutes>
        <Route path="/" element={<RootPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/experiences/:id" element={<ExperiencePage />} />
      </AnimatedRoutes>
    </SmoothScrollProvider>
  );
}

export default App;
