import $ from "~scripts/selectors";
import get from "~scripts/components/gallery/getters";
import set from "~scripts/components/gallery/setters";
import overlay from "~scripts/components/gallery/overlay";

const target = () => get.$player();

const index = () => get.player.data(target()).index;

let muted = true;

function clear() {
  const player = get.$player();

  player.remove();

  set.loaded(false);
}

function select(value) {
  const target = $.thumbnails[value];

  clear();

  overlay.update(target);
}

function prev() {
  let prev = Number(index()) - 1;

  if (!$.thumbnails[prev]) prev = $.thumbnails.length - 1;

  select(prev);
}

function next() {
  let next = Number(index()) + 1;

  if (!$.thumbnails[next]) next = 0;

  select(next);
}

function hasAudio(video) {
  return (
    video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length)
  );
}

function loaded(event) {
  const { target } = event;

  if (target.readyState < 2) return;

  const { tagName } = target;

  set.controls();

  set.loaded(true);

  if (tagName == "VIDEO") {
    $.overlay_play.removeAttribute("style");

    if (hasAudio(target)) $.overlay_mute.removeAttribute("style");
    else $.overlay_mute.style.display = "none";

    set.playing();
  }

  if (tagName == "IFRAME") {
    let test = target.contentWindow.document.querySelector(".size");

    test.innerText = "wider";

    console.log("test: ", test);
  }
}

export default { clear, select, prev, next, loaded, muted };
