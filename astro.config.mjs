import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://paul.ly",
  images: {
    domains: ["mosaic.scdn.co", "i.scdn.co", "images-ak.spotifycdn.com"],
  },
  scopedStyleStrategy: "class",
  integrations: [mdx(), sitemap()],
});
