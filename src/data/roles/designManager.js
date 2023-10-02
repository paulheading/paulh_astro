import { create } from "~scripts/helpers";

const ad = (value = "") => "/ads/" + value;

const trailer = (value = "") => "/trailers/" + value;

const content = [];

function billboard({ index, src }) {
  return create.thumb({
    index,
    src: ad(src + "/billboard"),
    title: "Billboard",
    height: 50,
    type: "ad",
    content: {
      width: 970,
      height: 250,
    },
  });
}

function mpu({ index, src }) {
  return create.thumb({
    index,
    src: ad(src + "/mpu"),
    title: "MPU",
    width: 85,
    type: "ad",
    content: {
      width: 300,
      height: 250,
    },
  });
}

function hpu({ index, src }) {
  return create.thumb({
    index,
    src: ad(src + "/hpu"),
    title: "HPU",
    type: "ad",
    width: 70,
    content: {
      width: 300,
      height: 600,
    },
  });
}

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
  billboard({ index: 5, src: "pussy_riot" }),
  mpu({ index: 6, src: "pussy_riot" }),
  hpu({ index: 7, src: "pussy_riot" }),
);

content.push(
  billboard({ index: 8, src: "play" }),
  mpu({ index: 9, src: "play" }),
  hpu({ index: 10, src: "play" }),
);

content.push(
  create.thumb({
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
