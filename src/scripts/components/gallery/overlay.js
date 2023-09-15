import $ from "~scripts/selectors";
import video from "~scripts/components/gallery/video"
import set from "~scripts/components/gallery/setters"

function close() {
  $.overlay.setAttribute("data-state", "closed");
  video.clear();
  $.body.removeAttribute("style");
}

function open(event) {
  const { target } = event
  const src = target.getAttribute("data-src");

  if (!src) return;

  const ratio = target.getAttribute("data-ratio");

  const index = target.getAttribute("data-index");

  set.video(src, ratio, index);

  $.body.style.overflow = "hidden";

  $.overlay.setAttribute("data-state", "open");
}

export default { close, open }