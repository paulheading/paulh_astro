import $ from "~scripts/selectors";
import player from "~scripts/components/gallery/player";
import get from "~scripts/components/gallery/getters";

const state = (target, value) => target.setAttribute("data-state", value);

function paused() {
  const video = get.$player();

  if (!video) return;

  video.pause();

  state($.overlay_play, "paused");
}

function playing() {
  const video = get.$player();

  if (!video) return;

  video.play();

  state($.overlay_play, "playing");
}

function muted() {
  const target = get.$player();

  if (!target) return;

  target.muted = true;

  player.muted = true;

  state($.overlay_mute, "muted");
}

function unmuted() {
  const target = get.$player();

  if (!target) return;

  target.muted = false;

  player.muted = false;

  state($.overlay_mute, "unmuted");
}

function controls() {
  const player = get.$player();

  if (!player) return;

  const close = $.overlay_close;

  const playerIsTiny = player.offsetWidth < 160;

  const adjust = "adjust";

  !playerIsTiny ? close.classList.add(adjust) : close.classList.remove(adjust);

  $.overlay_controls.style.height = player.offsetHeight + "px";
}

function build(element, data) {
  const { src, index, width, height } = data;

  element.src = src;
  element.height = height;
  element.width = width;

  element.setAttribute("data-index", index);

  element.style.border = "1px solid white";

  return element;
}

function video(data) {
  let { height, width } = data;

  let element = document.createElement("video");

  data.src += ".mp4";

  let settings = [element, data];

  let ratio = height / width;

  let portrait = ratio > 1;

  element = build(...settings);

  if (portrait) {
    element.setAttribute("data-ratio", "portrait");
    element.style.height = "100%";
    element.style.width = "auto";
  } else {
    element.setAttribute("data-ratio", "landscape");
    element.style.width = "100%";
    element.style.height = "auto";
  }

  element.style.maxHeight = "100%";
  element.style.maxWidth = "100%";
  element.style.display = "block";

  element.muted = player.muted;
  element.controls = false;
  element.autoplay = true;
  element.loop = true;

  $.overlay_content.appendChild(element);

  element.addEventListener("loadeddata", player.loaded);

  // prettier-ignore
  $.overlay_video_controls.forEach((control) => control.removeAttribute("style"));
}

function loaded(value) {
  value = value ? "loaded" : "not-loaded";
  const targets = [$.overlay_loader, $.overlay_content];
  targets.forEach((target) => state(target, value));
}

function iframe(data) {
  let element = document.createElement("iframe");

  data.src += "/index.html";

  let settings = [element, data];

  element = build(...settings);

  $.overlay_content.appendChild(element);

  element.addEventListener("load", player.loaded);

  // prettier-ignore
  $.overlay_video_controls.forEach((control) => (control.style.display = "none"));
}

export default {
  controls,
  video,
  loaded,
  state,
  paused,
  playing,
  muted,
  unmuted,
  iframe,
};
