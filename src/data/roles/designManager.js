import { create } from "~scripts/helpers";

const ad = (value = "") => "/ads/" + value;

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.thumb({
    index: 0,
    src: trailer("generations"),
    title: "Generations",
  }),
  create.thumb({
    index: 1,
    src: trailer("borders_and_boundaries"),
    title: "Borders and Boundaries",
  }),
  create.thumb({
    index: 2,
    src: trailer("more_than_human"),
    title: "More than Human",
  }),
  create.thumb({
    index: 3,
    src: trailer("watch_this_space"),
    title: "Watch this Space",
  })
);

content.push(
  create.thumb({
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
  create.thumb({
    index: 5,
    src: ad("pussy_riot/billboard"),
    title: "Billboard",
    height: 60,
    type: "ad",
    content: {
      width: 970,
      height: 250,
    },
  }),
  create.thumb({
    index: 6,
    src: ad("pussy_riot/mpu"),
    title: "MPU",
    width: 80,
    type: "ad",
    content: {
      width: 300,
      height: 250,
    },
  }),
  create.thumb({
    index: 7,
    src: ad("pussy_riot/hpu"),
    title: "HPU",
    type: "ad",
    width: 70,
    content: {
      width: 300,
      height: 600,
    },
  })
);

export default content;
