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
      label: "Sample Series",
      href: "/portfolio/sample-series/",
      description: "Photography collection",
    },
  ],
  quote: {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames",
  },
  location: {
    city: "New York City",
    country: "United States",
  },
};
