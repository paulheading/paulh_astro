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

function adjustOffset(value, properties) {
  const styles = getComputedStyle($.overlay);

  properties.forEach(function (property) {
    property = styles.getPropertyValue(property); // fetch property value
    property = property.slice(0, -2); // remove px from string
    property = Number(property); // coerce string value to number
    value -= property; // deduct property value from result
  });

  return value;
}

function resizeIFRAME(player) {
  const content = {};

  content.height = player.getAttribute("content-height");

  content.width = player.getAttribute("content-width");

  content.ratio = content.width / content.height;

  const properties = {};

  properties.height = [
    "border-bottom-width",
    "border-top-width",
    "padding-bottom",
    "padding-top",
  ];

  properties.width = [
    "border-right-width",
    "border-left-width",
    "padding-right",
    "padding-left",
  ];

  const overlay = {};

  overlay.height = adjustOffset($.overlay.offsetHeight, properties.height);

  overlay.width = adjustOffset($.overlay.offsetWidth, properties.width);

  overlay.isTallEnough = overlay.height >= content.height;

  overlay.isWideEnough = overlay.width >= content.width;

  if (!overlay.isWideEnough) {
    player.width = Math.round(overlay.width);
    player.height = Math.round(overlay.width / content.ratio);
  } else if (!overlay.isTallEnough) {
    player.height = Math.round(overlay.height);
    player.width = Math.round(overlay.height * content.ratio);
  } else {
    player.height = content.height;
    player.width = content.width;
  }

  return player;
}

function controls() {
  let player = get.$player();

  if (!player) return;

  let { tagName } = player;

  if (tagName == "IFRAME") player = resizeIFRAME(player);

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

  element.setAttribute("content-height", height);

  element.setAttribute("content-width", width);

  element.setAttribute("data-index", index);

  element.style.outline = "1px solid white";
  element.style.zIndex = 2;

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
