import $ from "~scripts/selectors";

function play(target) {
  target.setAttribute('data-state', 'paused');
  target.innerText = 'play'
}

function pause(target) {
  target.setAttribute('data-state', 'playing');
  target.innerText = 'pause'
}

function mute(target) {
  target.setAttribute('data-state', 'muted');
  target.innerText = "unmute"
}

function loud(target) {
  target.setAttribute('data-state', 'loud');
  target.innerText = "mute"
}

const controls = () => $.controls.style.height = $.video.offsetHeight + 'px'

function video(src, ratio, index) {
  const portrait = ratio > 1;
  const size = 1280;

  $.video.setAttribute("data-ratio", portrait ? "portrait" : "landscape");

  $.video.setAttribute("data-index", index)

  if (portrait) {
    $.video.height = size;
    $.video.width = size / ratio;
  } else {
    $.video.width = size;
    $.video.height = size * ratio;
  }

  $.video.src = src;
}

export default { play, pause, mute, loud, controls, video }