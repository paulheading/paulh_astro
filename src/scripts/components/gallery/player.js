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

const trimPx = (value) => value.slice(0, -2);

function calcMaxWidth(styles) {
  let { width, paddingLeft, paddingRight } = styles;

  width = trimPx(width);
  paddingLeft = trimPx(paddingLeft);
  paddingRight = trimPx(paddingRight);

  return width - paddingLeft - paddingRight;
}

function customFallback(target) {
  const iframeSelector = (value) =>
    target.contentWindow.document.querySelector(value);

  let fallback = iframeSelector(".fallback");

  let fallback_styles = window.getComputedStyle(fallback, null);

  let fallback_hidden = fallback_styles.display == "none";

  if (fallback_hidden) return;

  let size = iframeSelector(".size");

  let content = {};

  content.width = target.getAttribute("content-width");

  content.height = target.getAttribute("content-height");

  let overlay = target.parentElement.parentElement;

  let overlay_styles = window.getComputedStyle(overlay, null);

  let overlay_width = calcMaxWidth(overlay_styles);

  let contentIsTooWide = content.width > overlay_width;

  size.innerText = contentIsTooWide ? "wider" : "taller";
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
    customFallback(target);
    window.addEventListener("resize", () => customFallback(target));
  }
}

export default { clear, select, prev, next, loaded, muted };
