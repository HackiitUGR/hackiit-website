import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { site as siteData } from "../data/site";

export async function get() {
    const posts = await getCollection("blog");
    return rss({
        title: siteData.rssTitle,
        description: siteData.description,
        site: "http://hackiit.org",
        items: posts.map((post) => ({
            link: `/blog/${post.slug}`,
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
        })),
    });
}
