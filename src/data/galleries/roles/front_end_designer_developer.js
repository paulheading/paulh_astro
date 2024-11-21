import { create } from "paully/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("events_project_figma"),
    title: "Prototypes",
    info: `I created these prototypes in <a href="https://www.figma.com/">Figma</a> for the Barbican <a href="/project/organising-spaces-with-graphql">Events Management</a> project. They're useful for exploring hypothetical user journeys around new interfaces. With prototypes we can also begin collecting user feedback and start testing our assumptions before we build the product.`,
  }),
  create.content({
    src: trailer("jobs_platform_figma"),
    title: "Wireframes",
    info: `These visuals were created in <a href="https://www.figma.com/">Figma</a> for the Barbican <a href="https://work.barbican.org.uk">Careers Platform</a>. This project aims to create a more intuitive environment for job applicants. By providing a CMS for this process, users can make multiple applications, track their progress and upload examples easily.`,
  }),
  create.content({
    src: trailer("accessibility_provisions_teams"),
    title: "Accessibility demo",
    info: `This is a recording of my fortnightly demo on Microsoft Teams. In this example, I'm presenting my work around how accessibility provision is shown during the ticket purchase journey at the Barbican.`,
  })
);

export default content;
