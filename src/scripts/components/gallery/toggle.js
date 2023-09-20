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

export default { play, mute };
