import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("events_project_figma"),
    title: "Prototypes",
  }),
  create.content({
    src: trailer("jobs_platform_figma"),
    title: "Wireframes",
  }),
  // create.content({
  //   src: trailer("web_demo_teams"),
  //   title: "Demos",
  // })
);

export default content;
