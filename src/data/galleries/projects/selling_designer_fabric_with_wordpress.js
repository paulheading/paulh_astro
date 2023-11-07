import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("bourne_street_chrome"),
    title: "Rebrand & Website build",
    info: `Website build description`,
  })
);

export default content;
