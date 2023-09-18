import $ from "~scripts/selectors";

function state(target, value) {
  return target.setAttribute("data-state", value);
}

function paused() {
  $.overlay_video.pause();
  state($.overlay_play, "paused");
}

function playing() {
  $.overlay_video.play();
  state($.overlay_play, "playing");
}

function muted() {
  $.overlay_video.muted = true;
  state($.overlay_mute, "muted");
}

function unmuted() {
  $.overlay_video.muted = false;
  state($.overlay_mute, "unmuted");
}

function controls() {
  const video = $.overlay_video;
  const close = $.overlay_close;

  const videoIsTiny = video.offsetWidth < 160;
  const adjust = "adjust";

  !videoIsTiny ? close.classList.add(adjust) : close.classList.remove(adjust);

  $.overlay_controls.style.height = video.offsetHeight + "px";
}

function video(src, ratio, index) {
  const portrait = ratio > 1;
  const size = 1280;

  $.overlay_video.setAttribute(
    "data-ratio",
    portrait ? "portrait" : "landscape"
  );

  $.overlay_video.setAttribute("data-index", index);

  if (portrait) {
    $.overlay_video.height = size;
    $.overlay_video.width = size / ratio;
  } else {
    $.overlay_video.width = size;
    $.overlay_video.height = size * ratio;
  }

  $.overlay_video.src = src;
}

function loaded(value) {
  value = value ? "loaded" : "not-loaded";
  const targets = [$.overlay_loader, $.overlay_content];
  targets.forEach((target) => state(target, value));
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
};
