import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    index: 0,
    src: trailer("generations"),
    title: "Generations",
  }),
  create.content({
    index: 1,
    src: trailer("borders_and_boundaries"),
    title: "Borders and Boundaries",
  }),
  create.content({
    index: 2,
    src: trailer("more_than_human"),
    title: "More than Human",
  }),
  create.content({
    index: 3,
    src: trailer("watch_this_space"),
    title: "Watch this Space",
  })
);

content.push(
  create.content({
    index: 4,
    src: trailer("life_rewired/entrance_screen"),
    title: "Entrance Screen",
    width: 70,
    content: {
      width: 720,
      height: 1280,
    },
  })
);

content.push(
  create.billboard({ index: 5, src: "pussy_riot" }),
  create.mpu({ index: 6, src: "pussy_riot" }),
  create.hpu({ index: 7, src: "pussy_riot" }),
);

content.push(
  create.billboard({ index: 8, src: "play" }),
  create.mpu({ index: 9, src: "play" }),
  create.hpu({ index: 10, src: "play" }),
);

content.push(
  create.content({
    index: 11,
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
