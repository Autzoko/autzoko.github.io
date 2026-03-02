/** Central site metadata — import this everywhere instead of hard-coding. */
export const SITE = {
  title: "Autzoko",
  description: "Personal site — work, life, and portfolio.",
  author: "Langtian Lang",
  url: "https://autzoko.github.io", // TODO: replace
  lang: "en",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    { label: "Work", href: "/work/" },
    { label: "Life", href: "/life/" },
    { label: "Portfolio", href: "/portfolio/" },
  ],
  socials: {
    github: "https://github.com/autzoko",
    instagram: "https://instagram.com/autzoko", // TODO: replace
    linkedin: "https://linkedin.com/in/langtian-lang", // TODO: replace
    xiaohongshu: "https://www.xiaohongshu.com/user/profile/5f7837680000000001002a8c", // TODO: replace
    email: "autzokoLang@outlook.com",
  },
} as const;
