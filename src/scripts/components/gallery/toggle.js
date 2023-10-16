import $ from "~scripts/selectors";
import get from "~scripts/components/gallery/getters";
import set from "~scripts/components/gallery/setters";
import player from "~scripts/components/gallery/player";

function play(event) {
  const { target } = event;
  const state = target.getAttribute("data-state");
  const isPlaying = state == "playing";
  isPlaying ? set.paused() : set.playing();
}

function mute() {
  const isMuted = player.muted;
  isMuted ? set.unmuted() : set.muted();
}

function info(state) {
  let { open } = state;

  let player = get.$player();

  let { tagName } = player;

  let isVideo = tagName == "VIDEO";

  let previous = [player, $.overlay_controls];

  if (open) {
    if (isVideo) player.pause();

    previous.forEach((item) => (item.style.display = "none"));

    $.overlay_context.setAttribute("data-state", "visible");
  } else {
    if (isVideo) player.play();

    previous.forEach((item) => item.style.removeProperty("display"));

    $.overlay_context.setAttribute("data-state", "hidden");

    set.controls();
  }
}

export default { play, mute, info };
