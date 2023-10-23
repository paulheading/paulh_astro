import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("nyo"),
    title: "Brand Moment",
    info: `This is an animated brand moment for the <a href="https://www.nyo.org.uk/">NYO</a>. It expresses the core intentions of the orchestra; incredible musical performances, inspiring young people and being open to the nation. I created the animation using Adobe After Effects and worked from original sketched concepts.`,
  })
);

export default content;
