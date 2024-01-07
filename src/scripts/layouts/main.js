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
let moveFolders = true;

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

  moveFolders = !moveFolders;

  const setPositionData = (item) => item.setAttribute("data-move", moveFolders);

  $.desktop_singlefolders.forEach(setPositionData);
  $.desktop_groupfolders.forEach(setPositionData);

  wifi();

  time.update();

  count > 0 ? (count = count - 1) : (count = last);
}

time.animate();

timer.add(updateDOM);

setInterval(() => (document.hidden ? timer.pause() : timer.play()), 1000);
