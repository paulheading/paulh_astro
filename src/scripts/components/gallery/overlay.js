import $ from "~scripts/selectors";
import video from "~scripts/components/gallery/video";
import set from "~scripts/components/gallery/setters";

function close() {
  set.state($.overlay, "closed");
  video.clear();
  set.state($.body, "visible");
}

function open(event) {
  const { target } = event;
  const src = target.getAttribute("data-src");

  if (!src) return;

  const ratio = target.getAttribute("data-ratio");

  const index = target.getAttribute("data-index");

  set.video(src, ratio, index);

  set.state($.body, "hidden");

  set.state($.overlay, "open");
}

export default { close, open };
