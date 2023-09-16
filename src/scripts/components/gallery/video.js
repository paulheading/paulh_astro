import $ from "~scripts/selectors";
import set from "~scripts/components/gallery/setters";

function clear() {
  const attributes = ["src", "width", "height", "data-ratio"];

  for (let index = 0; index < attributes.length; index++) {
    const name = attributes[index];
    $.overlay_video.removeAttribute(name);
  }

  set.pause($.overlay_play);

  set.mute($.overlay_mute);
  set.loaded("false");
}

function loaded() {
  if ($.overlay_video.readyState >= 3) {
    set.controls();
    set.loaded("true");
  }
}

function select(value) {
  const target = $.thumbnails[value];

  const src = target.getAttribute("data-src");

  const ratio = target.getAttribute("data-ratio");

  clear();

  set.video(src, ratio, value);
}

function prev() {
  const index = $.overlay_video.getAttribute("data-index");

  let prev = Number(index) - 1;

  if (!$.thumbnails[prev]) prev = $.thumbnails.length - 1;

  select(prev);
}

function next() {
  const index = $.overlay_video.getAttribute("data-index");

  let next = Number(index) + 1;

  if (!$.thumbnails[next]) next = 0;

  select(next);
}

export default { clear, loaded, select, prev, next };