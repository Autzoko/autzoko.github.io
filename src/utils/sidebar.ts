/** Sidebar configuration for the Home page. */

export interface SidebarCuratedLink {
  /** Display label */
  label: string;
  /** URL path (internal) or full URL (external) */
  href: string;
  /** Optional short description shown below the label */
  description?: string;
}

export interface SidebarQuote {
  text: string;
  author: string;
  source?: string;
}

export interface SidebarConfig {
  now: string;
  curated: SidebarCuratedLink[];
  quote: SidebarQuote;
  location: {
    city: string;
    country: string;
  };
}

export const SIDEBAR: SidebarConfig = {
  now: "Building my personal site, reading about typography, and exploring film photography.",
  curated: [
    {
      label: "Hello World",
      href: "/work/hello-world/",
      description: "First post on the new site",
    },
    {
      label: "Road",
      href: "/portfolio/sample-series/",
      description: "Journey to the West",
    },
  ],
  quote: {
    text: "To observe is to begin understanding.",
    author: "N/A",
  },
  location: {
    city: "New York City",
    country: "United States",
  },
};
