import { useState } from "react";

// Comprehensive technology mapping for skillicons.dev
const techMap: { [key: string]: string } = {
  "next.js": "nextjs",
  "node.js": "nodejs",
  nodejs: "nodejs",
  react: "react",
  reactjs: "react",
  "vue.js": "vue",
  vuejs: "vue",
  angular: "angular",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  python: "python",
  django: "django",
  flask: "flask",
  java: "java",
  spring: "spring",
  "c++": "cplusplus",
  "c#": "csharp",
  csharp: "csharp",
  php: "php",
  laravel: "laravel",
  ruby: "ruby",
  rails: "rails",
  go: "go",
  golang: "go",
  rust: "rust",
  swift: "swift",
  kotlin: "kotlin",
  docker: "docker",
  kubernetes: "kubernetes",
  k8s: "kubernetes",
  aws: "amazonwebservices",
  azure: "azure",
  "google cloud": "googlecloud",
  gcp: "googlecloud",
  firebase: "firebase",
  mongodb: "mongodb",
  mongo: "mongodb",
  postgresql: "postgresql",
  postgres: "postgresql",
  mysql: "mysql",
  redis: "redis",
  sqlite: "sqlite",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  linux: "linux",
  ubuntu: "ubuntu",
  windows: "windows",
  macos: "apple",
  nginx: "nginx",
  apache: "apache",
  tailwind: "tailwindcss",
  tailwindcss: "tailwindcss",
  bootstrap: "bootstrap",
  css: "css3",
  html: "html5",
  html5: "html5",
  css3: "css3",
  sass: "sass",
  scss: "sass",
  webpack: "webpack",
  vite: "vite",
  babel: "babel",
  eslint: "eslint",
  prettier: "prettier",
  jest: "jest",
  cypress: "cypress",
  figma: "figma",
  sketch: "sketch",
  photoshop: "photoshop",
  illustrator: "illustrator",
  vscode: "visualstudiocode",
  "visual studio code": "visualstudiocode",
};

// Generate skillicons.dev URL
export const getTechIconUrl = (techName: string) => {
  // Convert to lowercase and trim
  const cleanName = techName.toLowerCase().trim();

  // Check if we have a mapping for this technology
  const mappedName = techMap[cleanName];
  if (mappedName) {
    return `https://skillicons.dev/icons?i=${mappedName}`;
  }

  // Try some common patterns
  if (cleanName.includes(".js")) {
    const jsName = cleanName.replace(".js", "js");
    if (techMap[jsName]) {
      return `https://skillicons.dev/icons?i=${techMap[jsName]}`;
    }
  }

  // Default: use the cleaned name
  const formattedName = cleanName.replace(/\s+/g, "");
  return `https://skillicons.dev/icons?i=${formattedName}`;
};

// Fallback icon component for TechIcon
function TechIconFallback({
  name,
  size,
}: {
  name: string;
  size: "xs" | "sm" | "md" | "lg";
}) {
  const fallbackSizeClasses = {
    xs: "h-3 w-3 text-[8px]",
    sm: "h-4 w-4 text-[10px]",
    md: "h-5 w-5 text-xs",
    lg: "h-6 w-6 text-sm",
  };

  return (
    <div
      className={`flex items-center justify-center rounded bg-gray-200 font-medium dark:bg-gray-700 dark:text-gray-300 ${fallbackSizeClasses[size]}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// Technology Icon Component
export function TechIcon({
  name,
  size = "sm",
}: {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const [iconError, setIconError] = useState(false);

  // Size classes
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  // Size values for width/height attributes
  const sizeValues = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
  };

  if (iconError) {
    return <TechIconFallback name={name} size={size} />;
  }

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: onError is a valid native event for img elements
    <img
      src={getTechIconUrl(name)}
      alt={name}
      width={sizeValues[size]}
      height={sizeValues[size]}
      className={sizeClasses[size]}
      onError={() => setIconError(true)}
      loading="lazy"
    />
  );
}

// Fallback component for TechBadge
function TechBadgeFallback({ name }: { name: string }) {
  return (
    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 px-2 py-1">
      {name}
    </span>
  );
}

// Technology Badge Component (for project cards)
export function TechBadge({ name }: { name: string }) {
  const [iconError, setIconError] = useState(false);

  // List of technical skills that should show icons
  const technicalSkills = [
    "javascript",
    "js",
    "typescript",
    "ts",
    "react",
    "reactjs",
    "next.js",
    "nextjs",
    "node.js",
    "nodejs",
    "node",
    "html5",
    "html",
    "css3",
    "css",
    "sass",
    "scss",
    "python",
    "django",
    "flask",
    "java",
    "spring",
    "c++",
    "cplusplus",
    "c#",
    "csharp",
    "php",
    "laravel",
    "ruby",
    "rails",
    "go",
    "golang",
    "rust",
    "swift",
    "kotlin",
    "docker",
    "kubernetes",
    "k8s",
    "aws",
    "azure",
    "google cloud",
    "gcp",
    "firebase",
    "mongodb",
    "mongo",
    "postgresql",
    "postgres",
    "mysql",
    "redis",
    "sqlite",
    "git",
    "github",
    "gitlab",
    "linux",
    "ubuntu",
    "windows",
    "macos",
    "nginx",
    "apache",
    "tailwind",
    "tailwindcss",
    "bootstrap",
    "webpack",
    "vite",
    "babel",
    "eslint",
    "prettier",
    "jest",
    "cypress",
    "figma",
    "sketch",
    "photoshop",
    "illustrator",
    "vscode",
    "visual studio code",
    "machine learning",
    "ml",
    "artificial intelligence",
    "ai",
    "data analysis",
    "cloud computing",
    "blockchain",
    "seo optimization",
    "ollama",
  ];

  // Filter out non-technical skills - only show icons for technical skills
  if (!technicalSkills.includes(name.toLowerCase().trim())) {
    return null;
  }

  if (iconError) {
    return <TechBadgeFallback name={name} />;
  }

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: onError is a valid native event for img elements
    <img
      src={getTechIconUrl(name)}
      alt={name}
      width={24}
      height={24}
      className="h-6 w-6 rounded-full"
      onError={() => setIconError(true)}
      loading="lazy"
    />
  );
}

// Technology Pill Component (for project details)
export function TechPill({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
      <span>{name}</span>
    </div>
  );
}
