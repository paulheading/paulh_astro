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
    info: `This is an entrance screen for the <a href="https://www.barbican.org.uk/whats-on/2019/series/life-rewired-hub">Life Rewired hub</a>, a cross-arts season exploring the impact of technological and scientific change on what it means to be human. The Hub was home to new writing and short films from artists and thinkers. This animation is based on a glitch concept that we developed in-house and is created using Adobe After Effects.`,
    width: 70,
    content: {
      width: 720,
      height: 1280,
    },
  }),
  create.content({
    src: trailer("life_rewired/plasma"),
    title: "Plasma",
    info: `This is a short trailer for a <a href="https://www.barbican.org.uk/liferewired">Life Rewired event</a>, a cross-arts season exploring the impact of technological and scientific change on what it means to be human. These trailers are displayed on plasma screens throughout the Barbican centre. This animation is based on a glitch concept that we developed in-house and is created using Adobe After Effects.`,
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
