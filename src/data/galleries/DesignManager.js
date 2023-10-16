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
    info: `This is an entrance screen for the <a href="https://www.barbican.org.uk/whats-on/2019/series/life-rewired-hub">Life Rewired Hub</a>, a cross-arts season exploring the impact of technological and scientific change on what it means to be human. The Hub was home to new writing and short films from artists and thinkers. This animation is based on a glitch concept that we developed in-house and is created using Adobe After Effects.`,
    width: 70,
    content: {
      width: 720,
      height: 1280,
    },
  }),
  create.content({
    src: trailer("life_rewired/plasma"),
    title: "Plasma",
    info: `This is a short trailer for a <a href="https://www.barbican.org.uk/liferewired">Life Rewired event</a>, a cross-arts season exploring the impact of technological and scientific change on what it means to be human. These trailers are displayed on plasma screens inside the Barbican centre. This animation is based on a glitch concept that we developed in-house and is created using Adobe After Effects.`,
  }),
  create.content({
    src: trailer("life_rewired/projector"),
    title: "Projector",
    info: `This trailer was displayed on a projector inside the Barbican centre and directed visitors to the <a href="https://www.barbican.org.uk/whats-on/2019/series/life-rewired-hub">Life Rewired Hub</a>. It showcases <a href="https://www.barbican.org.uk/read-watch-listen/life-rewired-shorts">Life Rewired Shorts</a>, a body of work from filmmakers responding to "what it means to be human when technology is changing everything". The animation is based on a glitch concept that we developed in-house and is created using Adobe After Effects.`,
    width: 100,
    content: {
      width: 1080,
      height: 1240,
    },
  })
);

let riotDays = {
  src: "pussy_riot",
  info: `This animated HTML5 banner was created to advertise Pussy Riot's performance of <a href="https://www.barbican.org.uk/whats-on/2017/event/pussy-riot-theatre-riot-days">Riot Days</a> at the Barbican. I wrote the animation in javascript using the <a href="https://gsap.com/">GSAP</a> animation library.`,
};

content.push(
  create.billboard(riotDays),
  create.mpu(riotDays),
  create.hpu(riotDays)
);

let play = {
  src: "play",
  info: `This animated HTML5 banner was created to advertise an orchestral performance of <a href="https://www.barbican.org.uk/whats-on/2018/event/play">Play!</a> at the Barbican. I created the original artwork, animated it for video and wrote the animation in javascript using the <a href="https://gsap.com/">GSAP</a> animation library.`,
};

content.push(create.billboard(play), create.mpu(play), create.hpu(play));

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
