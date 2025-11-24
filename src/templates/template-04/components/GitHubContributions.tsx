import GitHubCalendar from "react-github-calendar";

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

  // Defensive: Extract username if a URL is passed
  const cleanUsername = (() => {
    if (!githubUsername) return "";
    try {
      if (
        githubUsername.includes("http") ||
        githubUsername.includes("github.com")
      ) {
        const url = githubUsername.startsWith("http")
          ? githubUsername
          : `https://${githubUsername}`;
        const parsed = new URL(url);
        return parsed.pathname.split("/").filter(Boolean)[0] || githubUsername;
      }
    } catch (e) {
      // ignore error
    }
    return githubUsername;
  })();

  return (
    <div className="mb-38">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            GitHub Activity
          </h2>
          <p className="text-sm text-muted-foreground">
            Recent contributions by{" "}
            <b className="text-primary">{cleanUsername}</b>
          </p>
        </div>

        <a
          href={`https://github.com/${cleanUsername}`}
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
            <div className="w-full">
              <GitHubCalendar
                username={cleanUsername ?? ""}
                colorScheme="dark"
                blockSize={9}
                blockMargin={3}
                fontSize={12}
                showWeekdayLabels={true}
                hideColorLegend={false}
                hideMonthLabels={false}
                theme={{
                  dark: [
                    "#333", // Lighter gray for empty blocks
                    "#0e4429",
                    "#006d32",
                    "#26a641",
                    "#39d353",
                  ],
                }}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
