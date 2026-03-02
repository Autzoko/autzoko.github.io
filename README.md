# Personal Site

A personal GitHub Pages site built with [Astro](https://astro.build) and TypeScript. Features a work/projects section with LaTeX math and code highlighting, a literary section for poems and essays, and a curated portfolio with lightbox.

## Quick start

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:4321
npm run build        # build for production
npm run preview      # preview the production build locally
```

## Project structure

```
src/
  content/
    work/            ← Projects & professional posts (.md / .mdx)
    life/            ← Poems & essays (.md)
    portfolio/       ← Photo series (.md, images on Cloudflare R2)
  components/        ← Header, Footer, ThemeToggle, Lightbox, HomeSidebar, etc.
  layouts/           ← BaseLayout, WorkLayout, LifeLayout, PortfolioLayout
  pages/             ← Routes (index, about, section indexes, tags, RSS)
  styles/global.css  ← Design tokens, prose styles, animations
  utils/
    site.ts          ← Site metadata, nav links, social links
    sidebar.ts       ← Home sidebar content (Now, Curated, Quote, Location)
    images.ts        ← Image path helper
    date.ts          ← Date formatting
public/
  images/avatar.png  ← Your avatar photo (stored in GitHub repo)
  images/portfolio/  ← Local portfolio images (or use R2 URLs instead)
  images/og-default.png
  favicon.svg
```

## Setting up your personal info

### 1. Avatar

Your avatar is stored directly in the GitHub repo at `public/images/avatar.png`.

To change it, replace that file with your own photo. Any square image works well (recommended: at least 192×192 px). The component renders it as a circle with a subtle border and hover effect.

The avatar appears on the Home page hero and can be reused anywhere via:

```astro
import Avatar from "@/components/Avatar.astro";
<Avatar size={96} />
```

### 2. Site config

Edit `src/utils/site.ts` to set your name, description, URL, and social links:

```ts
export const SITE = {
  title: "Autzoko",
  description: "Personal site — work, life, and portfolio.",
  author: "Your Name",
  url: "https://YOUR-USERNAME.github.io",
  lang: "en",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    { label: "Work", href: "/work/" },
    { label: "Life", href: "/life/" },
    { label: "Portfolio", href: "/portfolio/" },
  ],
  socials: {
    github: "https://github.com/YOUR-USERNAME",
    linkedin: "https://linkedin.com/in/YOUR-ID",
    xiaohongshu: "https://www.xiaohongshu.com/user/profile/YOUR-ID",
    email: "mailto:you@example.com",
  },
};
```

Also update the `site` field in `astro.config.mjs` to match your URL.

### 3. Social links

Social link icons appear in the site footer (every page) and the mobile navigation drawer.

**Current platforms:** Email, GitHub, Instagram, Xiaohongshu, LinkedIn.

**To update a link:** Change the URL in `SITE.socials` in `src/utils/site.ts`. Set a value to `""` (empty string) to hide that icon.

**To add a new platform** (e.g. Twitter/X, Mastodon):

1. Add the URL to `SITE.socials` in `src/utils/site.ts`:

   ```ts
   socials: {
     github: "https://github.com/...",
     twitter: "https://x.com/YOUR-HANDLE",  // new
     // ...
   },
   ```

2. Register the new link in `src/components/SocialLinks.astro`. Add an entry to the `links` array:

   ```ts
   SITE.socials.twitter && {
     href: SITE.socials.twitter,
     label: "Twitter",
     icon: "twitter",
   },
   ```

3. Add the SVG icon in the same file's template section. Find an SVG icon (e.g. from [Simple Icons](https://simpleicons.org/) or [Lucide](https://lucide.dev/)) and add a conditional block:

   ```astro
   {icon === "twitter" && (
     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
       <path d="..." />
     </svg>
   )}
   ```

All icons are 20×20 with `viewBox="0 0 24 24"`. Use `fill="currentColor"` for solid icons or `stroke="currentColor"` for outline icons (like the email envelope).

### 4. Home sidebar

The right-side sidebar on the Home page is configured in `src/utils/sidebar.ts`:

```ts
export const SIDEBAR = {
  now: "What you're currently working on or thinking about.",
  curated: [
    { label: "Post Title", href: "/work/my-post/", description: "Optional subtitle" },
  ],
  quote: {
    text: "A favorite quotation.",
    author: "Author Name",
  },
  location: {
    city: "New York",
    country: "USA",
  },
};
```

| Field      | Description                                         |
| ---------- | --------------------------------------------------- |
| `now`      | Short status block — what you're working on         |
| `curated`  | 2–4 highlighted links to posts or projects          |
| `quote`    | A single quotation with author (and optional source)|
| `location` | City and country shown at the bottom of the sidebar |

### 5. About page

Edit `src/pages/about.astro` directly to write your bio, CV, or any personal information.

## Adding content

### Work post

Create a `.md` or `.mdx` file in `src/content/work/`:

```md
---
title: "My Project"
description: "A short summary."
date: 2025-06-01
tags: ["machine-learning", "math"]
lang: en
---

Your content here. Supports **Markdown**, code blocks, tables,
and LaTeX math:

Inline: $E = mc^2$

Display:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

| Field         | Required | Description                        |
| ------------- | -------- | ---------------------------------- |
| `title`       | yes      | Post title                         |
| `date`        | yes      | Publication date (YYYY-MM-DD)      |
| `description` | no       | Short summary for listing/SEO      |
| `tags`        | no       | Array of tag strings               |
| `updatedDate` | no       | Last updated date                  |
| `lang`        | no       | Language code (default: `"en"`)    |
| `draft`       | no       | Set `true` to hide from listings   |

### Life post (poem or essay)

Create a `.md` file in `src/content/life/`:

```md
---
title: "Evening Walk"
date: 2025-05-20
tags: ["essay", "reflection"]
style: essay
lang: en
---

Your prose here.
```

The `style` field controls the layout variant:

- `poem` — centered text, extra line spacing
- `essay` — justified text, narrower width
- _(omit)_ — default serif layout

### Portfolio series

1. **Prepare your images** — upload them to Cloudflare R2 (see [Using Cloudflare R2 for images](#using-cloudflare-r2-for-images) below), or place them in `public/images/portfolio/` for local hosting.

2. **Create a `.md` file** in `src/content/portfolio/`:

```md
---
title: "Mountain Light"
description: "Weekend hike in the Alps."
date: 2025-04-10
tags: ["landscape", "mountains"]
cover: "alps-01.jpg"
photos:
  - src: "alps-01.jpg"
    alt: "Sunrise over the ridge"
    caption: "First light, 6:12 AM"
  - src: "alps-02.jpg"
    alt: "Valley fog"
  - src: "alps-03.jpg"
    alt: "Trail marker"
    caption: "Halfway up"
---

Optional prose to accompany the series.
```

| Field         | Required | Description                                 |
| ------------- | -------- | ------------------------------------------- |
| `title`       | yes      | Series title                                |
| `date`        | yes      | Date (YYYY-MM-DD)                           |
| `cover`       | yes      | Cover image filename in `images/portfolio/` |
| `photos`      | no       | Array of `{ src, alt?, caption? }`          |
| `description` | no       | Short description                           |
| `tags`        | no       | Array of tag strings                        |
| `draft`       | no       | Set `true` to hide                          |

## Local testing

```bash
# 1. Install dependencies (first time or after changing package.json)
npm install

# 2. Start the dev server with hot reload
npm run dev
# → opens http://localhost:4321

# 3. Build for production (catches errors the dev server might miss)
npm run build

# 4. Preview the production build locally
npm run preview
# → opens http://localhost:4321 serving the built dist/ folder
```

**What to check before deploying:**

- All pages load without console errors (`npm run build` exits with 0)
- Navigation links work across all sections
- Dark mode toggle works correctly
- Mobile layout: test at 375px width (iPhone SE) and 768px (tablet)
- Portfolio lightbox opens, swipes, and closes properly
- RSS feed is valid at `/rss.xml`

## Deploy to GitHub Pages

### One-time setup

1. Create a repository named `YOUR-USERNAME.github.io` on GitHub.

2. Update your site URL in two places:
   - `src/utils/site.ts` — the `url` field
   - `astro.config.mjs` — the `site` field

3. Initialize git and push:

   ```bash
   git init
   git add -A
   git commit -m "Initial commit"
   git remote add origin git@github.com:YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git branch -M main
   git push -u origin main
   ```

4. In the GitHub repo, go to **Settings > Pages > Build and deployment** and set the source to **GitHub Actions**.

The included workflow at `.github/workflows/deploy.yml` will automatically build and deploy on every push to `main`.

### Publishing new content

```bash
# 1. Create your content file (see sections above)

# 2. Preview locally
npm run dev

# 3. Commit and push
git add -A
git commit -m "Add new post: My Post Title"
git push
```

The site will be live at `https://YOUR-USERNAME.github.io` within a couple of minutes. Check the **Actions** tab in your GitHub repo to monitor the build.

## Using Cloudflare R2 for images

Large images (especially portfolio photos) should be hosted on Cloudflare R2 instead of the GitHub repo to keep the repo small and fast.

### Setting up R2

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and go to **R2 Object Storage**.

2. **Create a bucket** (e.g. `blog-images`).

3. **Enable public access** — in the bucket settings, either:
   - Turn on the **R2.dev subdomain** (gives you a URL like `https://pub-abc123.r2.dev`), or
   - Connect a **custom domain** (e.g. `images.yourdomain.com`) for a cleaner URL.

4. Note your public bucket URL. You'll use this as the base URL for all images.

### Uploading images

**Via the Cloudflare dashboard:**
1. Open your bucket in the dashboard.
2. Click **Upload** and select your image files.
3. Optionally organize into folders (e.g. `portfolio/`, `work/`).

**Via the Wrangler CLI:**
```bash
# Install wrangler (one time)
npm install -g wrangler
wrangler login

# Upload a single file
wrangler r2 object put blog-images/portfolio/alps-01.jpg --file ./alps-01.jpg

# Upload an entire folder
wrangler r2 object put blog-images/portfolio/ --file ./my-photos/ --recursive
```

### Using R2 images in posts

Once an image is uploaded, reference it by its full URL in your markdown:

**In a work or life post (standard markdown image):**

```md
![Alt text](https://pub-abc123.r2.dev/work/diagram.png)
```

**In a portfolio series frontmatter:**

```md
---
cover: "https://pub-abc123.r2.dev/portfolio/alps-01.jpg"
photos:
  - src: "https://pub-abc123.r2.dev/portfolio/alps-01.jpg"
    alt: "Sunrise over the ridge"
---
```

When using full URLs for portfolio photos, the `photoSrc()` helper in `src/utils/images.ts` is bypassed — the URL is used as-is.

**Tip:** If you use a custom domain like `images.yourdomain.com`, your URLs will look cleaner:
```md
![Diagram](https://images.yourdomain.com/work/diagram.png)
```

### Local images vs R2

| | Local (`public/`) | Cloudflare R2 |
|---|---|---|
| **Best for** | Avatar, favicon, OG image, small assets | Portfolio photos, large images |
| **Path** | `/images/portfolio/photo.jpg` | `https://your-bucket.r2.dev/photo.jpg` |
| **Repo size** | Increases with each image | Stays small |
| **Speed** | Served by GitHub Pages CDN | Served by Cloudflare CDN (global edge) |
| **Cost** | Free (within GitHub limits) | Free tier: 10 GB storage, 10M reads/month |

**Recommendation:** Keep the avatar (`public/images/avatar.png`), favicon, and OG image in the repo. Host all portfolio and post images on R2.

## Commands reference

| Command             | Action                                        |
| :------------------ | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start dev server at `localhost:4321`          |
| `npm run build`     | Build production site to `./dist/`            |
| `npm run preview`   | Preview production build locally              |
| `npm run astro ...` | Run Astro CLI commands (`add`, `check`, etc.) |

## Features

- Markdown / MDX with syntax-highlighted code blocks
- LaTeX math rendering (KaTeX)
- Full Simplified & Traditional Chinese support (Noto Sans/Serif CJK fonts, proper line-breaking)
- Dark mode toggle with system preference detection
- Responsive design: sticky nav on desktop, slide-out drawer on mobile
- Home sidebar with "Now" status, curated links, quote, and location
- Portfolio with masonry grid and touch-swipe lightbox
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Tags, RSS feed (`/rss.xml`), sitemap, Open Graph meta
- GitHub Actions CI/CD to GitHub Pages
- Cloudflare R2 support for external image hosting
