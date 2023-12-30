import $ from "~scripts/selectors";
import get from "~scripts/components/gallery/getters";
import set from "~scripts/components/gallery/setters";
import overlay from "~scripts/components/gallery/overlay";
import contains from "~scripts/helpers/contains";
import calc from "~scripts/helpers/calc";

const index = () => get.player.data(get.$player()).index;

let muted = true;

function clear() {
  const player = get.$player();

  player.remove();

  $.context_copy.innerHTML = "";

  set.loaded(false);

  window.removeEventListener("resize", customFallback);
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

function customFallback() {
  let target = get.$player();

  let iframeSelector = (value) =>
    target.contentWindow.document.querySelector(value);

  let fallback = iframeSelector(".fallback");

  let fallback_styles = window.getComputedStyle(fallback, null);

  let fallback_hidden = fallback_styles.display == "none";

  if (fallback_hidden) return;

  let size = iframeSelector(".size");

  let content_width = target.getAttribute("content-width");

  let overlay_styles = window.getComputedStyle($.overlay, null);

  let overlay_width = calc.inner_width(overlay_styles);

  let isTooWide = content_width > overlay_width;

  size.innerText = isTooWide ? "wider" : "taller";
}

function loaded(event) {
  let { target } = event;

  if (target.readyState < 2) return;

  let { tagName } = target;

  let isVideo = tagName == "VIDEO";

  set.controls();

  set.loaded(true);

  if (isVideo) {
    $.overlay_play.removeAttribute("style");

    if (contains.audio(target)) $.overlay_mute.removeAttribute("style");
    else $.overlay_mute.setAttribute("style", "display: none;");

    set.playing();
  }

  if (!isVideo) {
    customFallback();
    window.addEventListener("resize", customFallback);
  }
}

export default { clear, select, prev, next, loaded, muted };
