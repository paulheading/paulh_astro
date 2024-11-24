import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

let images = {
  domains: ["mosaic.scdn.co", "i.scdn.co", "images-ak.spotifycdn.com"],
};

let vite = {
  ssr: {
    noExternal: ["paully"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
};

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap()],
  scopedStyleStrategy: "class",
  site: "https://paul.ly",
  output: "static",
  images,
  image: {
    service: passthroughImageService(),
  },
  vite,
});
