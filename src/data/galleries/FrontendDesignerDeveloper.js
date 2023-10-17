import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("events_project_figma"),
    title: "Prototypes",
    info: `I created these prototypes in <a href="https://www.figma.com/">Figma</a> for the <a href="/project/organising-spaces-with-graphql">Barbican Events Management</a> project. They are really useful for exploring and explaining a hypothetical user journey around a new interface. With prototypes we can also begin collecting user feedback and start testing assumptions before we build the product.`,
  }),
  create.content({
    src: trailer("jobs_platform_figma"),
    title: "Wireframes",
    info: `These <a href="https://www.figma.com/">Figma</a> visuals were created for the <a href="https://work.barbican.org.uk">Barbican Careers Platform</a>. This project aimed to create a more intuitive environment for job applications. The plan was to provide a CMS for both administrators and applications. Applicants could login, make multiple applications and track their progress easily.`,
  }),
  create.content({
    src: trailer("accessibility_provisions_teams"),
    title: "Accessibility demo",
  })
);

export default content;
