import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  image: {
    domains: ["https://i.scdn.co"],
  },
  scopedStyleStrategy: "class",
  integrations: [mdx()],
});
