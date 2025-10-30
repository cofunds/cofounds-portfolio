import type { UserProfile } from "@/components/portfolio-data-provider";

export const fetchPortfolio = async (username: string) => {
  const portfolioURL = process.env.COFOUNDS_API_URL;

  if (!portfolioURL) {
    return {
      success: false,
      message: "API URL not configured",
      data: null,
      error: new Error("COFOUNDS_API_URL not set"),
    };
  }

  const fullURL = `${portfolioURL}/${username}`;

  const isDev = process.env.NODE_ENV === "development";

  try {
    const portfolioData = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Portfolio-App/1.0",
      },
      // ✅ Disable caching in dev, keep revalidation in prod
      ...(isDev ? { cache: "no-store" } : { next: { revalidate: 60 } }),
    });

    if (!portfolioData.ok) {
      const errorText = await portfolioData.text();
      return {
        success: false,
        message: `API request failed with status ${portfolioData.status}`,
        data: null,
        error: new Error(`HTTP ${portfolioData.status}: ${errorText}`),
      };
    }

    const responseText = await portfolioData.text();
    let jsonRes: { data?: UserProfile } | null = null;

    try {
      jsonRes = JSON.parse(responseText);
    } catch (parseError) {
      return {
        success: false,
        message: "Invalid JSON response",
        data: null,
        error: parseError,
      };
    }

    if (jsonRes?.data) {
      return {
        success: true,
        message: "Portfolio Fetched successfully!",
        data: jsonRes.data,
        error: null,
      };
    }
    return {
      success: false,
      message: "Invalid response structure",
      data: null,
      error: new Error("Invalid API response structure"),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the portfolio!",
      data: null,
      error,
    };
  }
};

// Helper functions for transformUserData
function transformSkills(userData: UserProfile): string[] {
  return userData.skillset?.map((s) => s.skill?.name).filter(Boolean) || [];
}

function transformWork(userData: UserProfile) {
  return (
    userData.experience
      ?.map((e) => ({
        company: e.companyName || "",
        title: e.title || "",
        href: "",
        logoUrl: e.logoURL || "",
        badges: [],
        start: e.startedAt
          ? new Date(e.startedAt).getFullYear().toString()
          : "",
        end: e.endAt ? new Date(e.endAt).getFullYear().toString() : null,
        description: e.description || "",
      }))
      .filter((w) => w.company) || []
  );
}

function transformEducation(userData: UserProfile) {
  return (
    userData.education
      ?.map((e) => ({
        school: e.eduFrom || "",
        degree: e.degree?.name || "",
        href: e.eduFromLink || "",
        logoUrl: e.logoURL || "",
        start: e.startedAt
          ? new Date(e.startedAt).getFullYear().toString()
          : "",
        end: e.endAt ? new Date(e.endAt).getFullYear().toString() : "",
      }))
      .filter((edu) => edu.school) || []
  );
}

function transformProjects(userData: UserProfile) {
  return (
    userData.projects
      ?.map((p) => {
        const projectLinks =
          p.projectLinks
            ?.map((link) => ({
              type: link.linkTitle || "Website",
              href: link.linkUrl,
              linkTitle: link.linkTitle,
            }))
            .filter((link) => link.href) || [];

        if (p.link) {
          projectLinks.unshift({
            type: "Website",
            href: p.link,
            linkTitle: "Website",
          });
        }

        return {
          title: p.title || "",
          description: p.description || "",
          dates: `${p.startedAt ? new Date(p.startedAt).getFullYear() : ""} - ${p.endAt ? new Date(p.endAt).getFullYear() : "Present"}`,
          technologies:
            p.projectSkillset?.map((ps) => ps.skill?.name).filter(Boolean) ||
            [],
          image: p.previewImageUrl || "",
          video: "",
          links: projectLinks,
          href: p.link || "",
        };
      })
      .filter((p) => p.title) || []
  );
}

function transformCertificates(userData: UserProfile) {
  return (
    userData.certificates
      ?.map((c) => {
        const links = c.link
          ? [
              {
                type: c.linkName || "Open Link",
                href: c.link,
                linkTitle: c.linkName,
              },
            ]
          : [];

        return {
          title: c.title || "",
          description: c.description || "",
          location: c.location || "",
          dates: `${c.startedAt ? new Date(c.startedAt).getFullYear() : ""}${c.endAt ? ` - ${new Date(c.endAt).getFullYear()}` : ""}`,
          image: c.logoURL || "",
          links,
        };
      })
      .filter((h) => h.title) || []
  );
}

function transformSocialLinks(userData: UserProfile) {
  const socialLinks = userData.links || [];
  const contact = {
    email: userData.email || "",
    social: {} as Record<
      string,
      { name: string; url: string; navbar: boolean }
    >,
  };

  for (const link of socialLinks) {
    if (link.linkTitle && link.linkUrl) {
      const platform = link.linkTitle.toLowerCase();
      contact.social[platform] = {
        name: link.linkTitle,
        url: link.linkUrl,
        navbar: true,
      };
    }
  }

  return contact;
}

function buildTransformedData(
  userData: UserProfile,
  transformedParts: {
    username: string;
    name: string;
    initials: string;
    avatarUrl: string;
    description: string;
    summary: string;
    skills: string[];
    work: ReturnType<typeof transformWork>;
    education: ReturnType<typeof transformEducation>;
    projects: ReturnType<typeof transformProjects>;
    hackathons: ReturnType<typeof transformCertificates>;
    contact: ReturnType<typeof transformSocialLinks>;
  }
) {
  return {
    // Basic Info
    username: transformedParts.username,
    name: transformedParts.name,
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    initials: transformedParts.initials,
    email: userData.email || "",
    phone: userData.phone || "",

    // Profile Images
    avatarUrl: transformedParts.avatarUrl,
    profileImage: userData.profileImage || "",
    headerImage: userData.headerImage || "",

    // Descriptions
    description: transformedParts.description,
    headerText: userData.headerText || "",
    summary: transformedParts.summary,

    // Location (for template-01)
    url: "",
    location: "",
    locationLink: "",

    // Navigation
    navbar: [],

    // Skills - Both formats
    skills: transformedParts.skills,
    skillset: userData.skillset || [],

    // Links/Social
    links: userData.links || [],
    contact: transformedParts.contact,

    // Work Experience - Both formats
    work: transformedParts.work,
    experience: userData.experience || [],

    // Education - Both formats
    education: transformedParts.education,
    educationRaw: userData.education || [],

    // Projects - Both formats
    projects: transformedParts.projects,
    projectsRaw: userData.projects || [],

    // Certificates
    hackathons: transformedParts.hackathons,
    certificates: userData.certificates || [],

    // Template Selection
    templateId: userData.template || "template-01",
  };
}

export const transformUserData = (userData: UserProfile) => {
  const username = userData.userName;
  const name = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
  const initials =
    `${userData.firstName?.[0] || ""}${userData.lastName?.[0] || ""}`.toUpperCase();
  const avatarUrl = userData.profileImage || "";
  const description = userData.headerText || "";
  const summary = userData.description || "";

  const transformedParts = {
    username,
    name,
    initials,
    avatarUrl,
    description,
    summary,
    skills: transformSkills(userData),
    work: transformWork(userData),
    education: transformEducation(userData),
    projects: transformProjects(userData),
    hackathons: transformCertificates(userData),
    contact: transformSocialLinks(userData),
  };

  return buildTransformedData(userData, transformedParts);
};

function checkSubdomainValidity(subdomain: string, domain: string): boolean {
  if (domain !== "buildarclabs.in" && domain !== "cofounds.in") {
    return false;
  }

  const reserved = ["www", "api", "admin", "app", "mail", "blog", "docs"];
  return !reserved.includes(subdomain.toLowerCase());
}

function parseHostname(actualHost: string): {
  username: string;
  hasValidSubdomain: boolean;
} {
  const parts = actualHost.split(".");

  // Handle subdomains like username.buildarclabs.in
  if (parts.length >= 3) {
    const subdomain = parts[0];
    const domain = parts.slice(1).join(".");

    if (checkSubdomainValidity(subdomain, domain)) {
      return { username: subdomain, hasValidSubdomain: true };
    }
  }

  // Handle localhost development
  if (
    parts.length >= 2 &&
    (parts[1] === "localhost" || parts[1].includes("localhost"))
  ) {
    return { username: parts[0], hasValidSubdomain: true };
  }

  return { username: "", hasValidSubdomain: false };
}

export const extractUsername = (headersList: Headers) => {
  const host = headersList.get("host");
  const xForwardedHost = headersList.get("x-forwarded-host");
  const actualHost = xForwardedHost || host || "";

  if (!actualHost) {
    return { username: "", hasValidSubdomain: false };
  }

  return parseHostname(actualHost);
};
