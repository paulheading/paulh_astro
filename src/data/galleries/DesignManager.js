import { create } from "~scripts/helpers";

const trailer = (value = "") => "/trailers/" + value;

const content = [];

content.push(
  create.content({
    src: trailer("generations"),
    title: "Generations",
    info: `This is a cinema trailer for a <a href="https://www.barbican.org.uk/whats-on/2018/series/generations-russian-cinema-of-change">film season at the Barbican</a>. I created the trailer using Adobe After Effects with stock footage, images and purchased audio.`,
  }),
  create.content({
    src: trailer("borders_and_boundaries"),
    title: "Borders and Boundaries",
    info: `This is a cinema trailer for a <a href="https://www.barbican.org.uk/whats-on/2019/series/borders-and-boundaries">film season at the Barbican</a>. I created the trailer using Adobe After Effects with stock footage, images and purchased audio.`,
  }),
  create.content({
    src: trailer("more_than_human"),
    title: "More than Human",
    info: `This is a cinema trailer for a <a href="https://www.barbican.org.uk/whats-on/2019/event/ai-more-than-human">major centre-wide exhibition</a> exploring creative and scientific developments in AI. I created the trailer using Adobe After Effects, adapting original artwork.`,
  }),
  create.content({
    src: trailer("watch_this_space"),
    title: "Watch this Space",
    info: `This is a cinema trailer for the cinema at the Barbican. I created the trailer using Adobe After Effects, adapting original artwork.`,
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
