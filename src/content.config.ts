import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.string().default("en"),
  }),
});

const life = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/life" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.string().default("en"),
    /** "poem" | "essay" — controls layout variant */
    style: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Cover image filename (relative to /images/portfolio/) */
    cover: z.string(),
    /** Array of photos in the series */
    photos: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().optional().default(""),
          caption: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { work, life, portfolio };
