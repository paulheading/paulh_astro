import $ from "~scripts/selectors";
import set from "~scripts/components/gallery/setters"

function play(event) {
  const { target } = event;
  const state = target.getAttribute('data-state');
  const isPlaying = state == 'playing';

  if (isPlaying) {
    $.video.pause();
    set.play(target);
  } else {
    $.video.play();
    set.pause(target);
  }
}

function mute(event) {
  const { target } = event;
  const state = target.getAttribute('data-state');
  const isMuted = state == 'muted';

  if (isMuted) {
    $.video.muted = false;
    set.loud(target);
  } else {
    $.video.muted = true;
    set.mute(target);
  }
}

export default { play, mute }