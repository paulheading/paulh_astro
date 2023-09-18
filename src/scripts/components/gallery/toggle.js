import set from "~scripts/components/gallery/setters";

function play(event) {
  const { target } = event;
  const state = target.getAttribute("data-state");
  const isPlaying = state == "playing";
  isPlaying ? set.paused() : set.playing();
}

function mute(event) {
  const { target } = event;
  const state = target.getAttribute("data-state");
  const isMuted = state == "muted";
  isMuted ? set.unmuted() : set.muted();
}

export default { play, mute };
