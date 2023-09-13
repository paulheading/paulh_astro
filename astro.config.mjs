import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  images: {
    domains: ["mosaic.scdn.co", "i.scdn.co", "images-ak.spotifycdn.com"],
  },
  scopedStyleStrategy: "class",
  integrations: [mdx()],
});
