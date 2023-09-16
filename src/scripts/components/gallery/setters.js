import $ from "~scripts/selectors";

function play(target) {
  target.setAttribute("data-state", "paused");
  target.innerText = "play";
}

function pause(target) {
  target.setAttribute("data-state", "playing");
  target.innerText = "pause";
}

function mute(target) {
  target.setAttribute("data-state", "muted");
  target.innerText = "unmute";
}

function loud(target) {
  target.setAttribute("data-state", "loud");
  target.innerText = "mute";
}

const controls = () =>
  ($.overlay_controls.style.height = $.overlay_video.offsetHeight + "px");

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
  const targets = [$.overlay_loader, $.overlay_content];
  targets.forEach((target) => target.setAttribute("data-loaded", value));
}

export default { play, pause, mute, loud, controls, video, loaded };
