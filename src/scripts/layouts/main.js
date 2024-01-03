import $ from "~scripts/selectors";
import { projects } from "~data/layout.json";

import timer from "~scripts/animate/timer";
import artwork from "~scripts/components/hero/artwork";
import marquee from "~scripts/components/marquee";
import wifi from "~scripts/animate/wifi";
import time from "~scripts/components/desktop/topbar/time";

let heroes = projects.filter(({ hero }) => hero);
let last = heroes.length - 1;
let count = 0;

function updateDOM() {
  let hero = heroes[count];
  let { name, id, local } = hero;
  let loop = id.slice(0, 5);

  if ($.menu) $.menu.setAttribute("data-loop", loop);

  if ($.hero) $.hero.setAttribute("data-loop", loop);

  if ($.hero_link) {
    $.hero_link.innerHTML = name;
    $.hero_link.href = local.url;
  }

  if ($.hero_svgs) artwork.toggle($.hero_svgs, loop);

  marquee.setup(name, local.url);

  if ($.folders) {
    for (let index = 0; index < $.folders.length; index++) {
      const folder = $.folders[index];
      const position = folder.parentElement.parentElement;
      position.setAttribute("data-count", count);
    }
  }

  wifi();

  time.update();

  count > 0 ? (count = count - 1) : (count = last);
}

time.animate();

timer.add(updateDOM);

setInterval(() => (document.hidden ? timer.pause() : timer.play()), 1000);
