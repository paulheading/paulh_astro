import $ from "~scripts/selectors";

const $body = document.querySelector("body");
const $thumbnails = $.gallery.querySelectorAll(".thumbnail");
const $overlay = $.gallery.querySelector(".overlay");
const $controls = $overlay.querySelector(".controls");
const $video = $overlay.querySelector(".video");
const $close = $overlay.querySelector(".close");
const $play = $overlay.querySelector(".play");
const $mute = $overlay.querySelector(".mute");
const $prev = $overlay.querySelector(".prev");
const $next = $overlay.querySelector(".next");

const resizeControls = () => $controls.style.height = $video.offsetHeight + 'px'

function videoLoaded() {
  if ($video.readyState >= 3) {
    resizeControls();
  }
}

function clearVideo() {
  const attributes = ["src", "width", "height", "data-ratio"];

  for (let index = 0; index < attributes.length; index++) {
    const name = attributes[index];
    $video.removeAttribute(name);
  }

  setPause($play);
  setMute($mute);
}

function setupVideo(src, ratio, index) {
  const portrait = ratio > 1;
  const size = 1280;

  $video.setAttribute("data-ratio", portrait ? "portrait" : "landscape");

  $video.setAttribute("data-index", index)

  if (portrait) {
    $video.height = size;
    $video.width = size / ratio;
  } else {
    $video.width = size;
    $video.height = size * ratio;
  }

  $video.src = src;
}

function closeOverlay() {
  $overlay.setAttribute("data-state", "closed");
  clearVideo();
  $body.removeAttribute("style");
}

function openOverlay(event) {
  const { target } = event
  const src = target.getAttribute("data-src");

  if (!src) return;

  const ratio = target.getAttribute("data-ratio");

  const index = target.getAttribute("data-index");

  setupVideo(src, ratio, index);

  $body.style.overflow = "hidden";

  $overlay.setAttribute("data-state", "open");
}

for (let index = 0; index < $thumbnails.length; index++) {
  const $button = $thumbnails[index];
  $button.addEventListener("click", openOverlay);
}

function setPlay(target) {
  target.setAttribute('data-state', 'paused');
  target.innerText = 'play'
}

function setPause(target) {
  target.setAttribute('data-state', 'playing');
  target.innerText = 'pause'
}

function togglePlay(event) {
  const { target } = event;
  const state = target.getAttribute('data-state');
  const isPlaying = state == 'playing';

  if (isPlaying) {
    $video.pause();
    setPlay(target);
  } else {
    $video.play();
    setPause(target);
  }
}

function setMute(target) {
  target.setAttribute('data-state', 'muted');
  target.innerText = "muted"
}

function setLoud(target) {
  target.setAttribute('data-state', 'loud');
  target.innerText = "not muted"
}

function toggleMute(event) {
  const { target } = event;
  const state = target.getAttribute('data-state');
  const isMuted = state == 'muted';

  if (isMuted) {
    $video.muted = false;
    setLoud(target);
  } else {
    $video.muted = true;
    setMute(target);
  }
}

function selectVideo(value) {
  const target = $thumbnails[value];

  const src = target.getAttribute("data-src");

  const ratio = target.getAttribute("data-ratio");

  clearVideo();

  setupVideo(src, ratio, value);
}

function prevVideo() {
  const index = $video.getAttribute('data-index');

  let prev = Number(index) - 1;

  if (!$thumbnails[prev]) prev = $thumbnails.length - 1

  selectVideo(prev);
}

function nextVideo() {
  const index = $video.getAttribute('data-index');

  let next = Number(index) + 1;

  if (!$thumbnails[next]) next = 0

  selectVideo(next)
}

$video.addEventListener("loadeddata", videoLoaded);

window.addEventListener("resize", resizeControls);

$close.addEventListener("click", closeOverlay);

$play.addEventListener("click", togglePlay)

$mute.addEventListener("click", toggleMute)

$next.addEventListener("click", nextVideo)

$prev.addEventListener("click", prevVideo)