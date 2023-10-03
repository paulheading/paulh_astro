import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("generations"),
    title: "Generations",
  }),
  create.content({
    src: trailer("borders_and_boundaries"),
    title: "Borders and Boundaries",
  }),
  create.content({
    src: trailer("more_than_human"),
    title: "More than Human",
  }),
  create.content({
    src: trailer("watch_this_space"),
    title: "Watch this Space",
  })
);

content.push(
  create.content({
    src: trailer("life_rewired/entrance_screen"),
    title: "Entrance Screen",
    width: 70,
    content: {
      width: 720,
      height: 1280,
    },
  }),
  create.content({
    src: trailer("life_rewired/plasma"),
    title: "Plasma",
  }),
  create.content({
    src: trailer("life_rewired/projector"),
    title: "Projector",
    width: 100,
    content: {
      width: 1080,
      height: 1240,
    },
  })
);

content.push(
  create.billboard({ src: "pussy_riot" }),
  create.mpu({ src: "pussy_riot" }),
  create.hpu({ src: "pussy_riot" })
);

content.push(
  create.billboard({ src: "play" }),
  create.mpu({ src: "play" }),
  create.hpu({ src: "play" })
);

content.push(
  create.content({
    src: trailer("archive"),
    title: "Archive",
    width: 70,
    content: {
      width: 720,
      height: 1280,
    },
  })
);

export default content;
