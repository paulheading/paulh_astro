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

  if (open) {
    player.pause();

    player.style.display = "none";

    $.overlay_controls.style.display = "none";

    $.overlay_context.setAttribute("data-state", "visible");
  } else {
    player.play();

    player.removeAttribute("style");

    $.overlay_controls.removeAttribute("style");

    $.overlay_context.setAttribute("data-state", "hidden");

    set.controls();
  }
}

export default { play, mute, info };
