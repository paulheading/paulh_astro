import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("art_of_change"),
    title: "Identities",
  }),
  create.content({
    src: trailer("mountains_and_waves"),
    title: "Plasmas",
  })
);

export default content;
