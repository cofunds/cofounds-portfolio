import GitHubCalendar from "react-github-calendar";
import { FaGithub } from "react-icons/fa";

type GitHubContributionsProps = {
  githubUsername: string | null;
  isIntegrationEnabled?: boolean;
  isGitHubEnabled?: boolean;
};

export default function GitHubContributions({
  githubUsername,
  isIntegrationEnabled = true,
  isGitHubEnabled = true,
}: GitHubContributionsProps) {
  const isEnabled =
    isIntegrationEnabled && isGitHubEnabled && Boolean(githubUsername);

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            GitHub Activity
          </h2>
          <p className="text-sm text-muted-foreground">
            Recent contributions by{" "}
            <b className="text-primary">{githubUsername}</b>
          </p>
        </div>

        <a
          href={`https://github.com/${githubUsername}`}
          className="text-sm text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </a>
      </div>

      {/* Card UI */}
      <div className="relative overflow-hidden">
        <div className="relative bg-background/50 backdrop-blur-sm rounded-lg border border-dashed dark:border-white/10 border-black/20 p-6 flex justify-center">
          <div className="w-full flex justify-center">
            <div className="w-full mx-20">
              <GitHubCalendar
                username={githubUsername ?? ""}
                year={new Date().getFullYear()}
                colorScheme="light"
                blockSize={9}
                blockMargin={3}
                fontSize={12}
                showWeekdayLabels={true}
                hideColorLegend={false}
                hideMonthLabels={false}
                transformData={(data) =>
                  data.filter(
                    (d) =>
                      new Date(d.date).getFullYear() ===
                      new Date().getFullYear()
                  )
                }
                style={{
                  width: "100%",
                  maxWidth: "900px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Optional fallback */}
      {!githubUsername && (
        <div className="p-8 mt-4 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <FaGithub className="w-8 h-8" />
          </div>
          <p className="font-medium mb-2">No GitHub username provided</p>
          <p className="text-sm mb-4">Unable to load GitHub data.</p>
        </div>
      )}
    </div>
  );
}
