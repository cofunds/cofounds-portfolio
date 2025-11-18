type ProjectMetaProps = {
  timeline?: string;
  role?: string;
  team?: string;
  status?: string | null;
};

export function ProjectMeta({
  timeline,
  role,
  team,
  status,
}: ProjectMetaProps) {
  // Get styled colors to match ProjectCard
  const getStatusStyles = (statusName: string) => {
    switch (statusName) {
      case "Completed":
        return {
          container: "border-green-300 bg-green-500/10",
          dot: "bg-green-500",
          text: "text-green-700 dark:text-green-400",
        };
      case "In Progress":
        return {
          container: "border-yellow-300 bg-yellow-500/10",
          dot: "bg-yellow-500",
          text: "text-yellow-700 dark:text-yellow-400",
        };
      case "Planning":
        return {
          container: "border-blue-300 bg-blue-500/10",
          dot: "bg-blue-500",
          text: "text-blue-700 dark:text-blue-400",
        };
      case "On Hold":
        return {
          container: "border-red-300 bg-red-500/10",
          dot: "bg-red-500",
          text: "text-red-700 dark:text-red-400",
        };
      default:
        return {
          container: "border-gray-300 bg-gray-500/10",
          dot: "bg-gray-500",
          text: "text-gray-700 dark:text-gray-400",
        };
    }
  };

  const statusStyles = status ? getStatusStyles(status) : null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-2 rounded-2xl py-5 px-3">
      {/* Timeline */}
      <div>
        <h5 className="text-sm font-semibold text-muted-foreground">
          Timeline
        </h5>
        <p className="text-sm">{timeline || "Not listed"}</p>
      </div>

      {/* Role */}
      <div>
        <h5 className="text-sm font-semibold text-muted-foreground">Role</h5>
        <p className="text-sm">{role || "Not listed"}</p>
      </div>

      {/* Team */}
      <div>
        <h5 className="text-sm font-semibold text-muted-foreground">Team</h5>
        <p className="text-sm">{team || "Not listed"}</p>
      </div>

      {/* Status */}
      <div>
        <h5 className="text-sm font-semibold text-muted-foreground">Status</h5>

        {status ? (
          <div
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs border ${statusStyles?.container}`}
          >
            <div
              className={`size-2 rounded-full ${statusStyles?.dot} animate-pulse`}
            />
            <span className={statusStyles?.text}>{status}</span>
          </div>
        ) : (
          <p className="text-sm">Not listed</p>
        )}
      </div>
    </div>
  );
}
