import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@/utils/site";

export async function GET(context: APIContext) {
  const work = (await getCollection("work")).filter((p) => !p.data.draft);
  const life = (await getCollection("life")).filter((p) => !p.data.draft);

  const items = [...work, ...life]
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => {
      const section = work.includes(post) ? "work" : "life";
      return {
        title: post.data.title,
        description: post.data.description ?? "",
        pubDate: post.data.date,
        link: `/${section}/${post.id}/`,
      };
    });

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!.toString(),
    items,
  });
}
