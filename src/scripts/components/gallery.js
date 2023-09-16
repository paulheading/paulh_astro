import $ from "~scripts/selectors";
import video from "~scripts/components/gallery/video";
import set from "~scripts/components/gallery/setters";
import toggle from "~scripts/components/gallery/toggle";
import overlay from "~scripts/components/gallery/overlay";

for (let index = 0; index < $.thumbnails.length; index++) {
  const $button = $.thumbnails[index];
  $button.addEventListener("click", overlay.open);
}

window.addEventListener("resize", set.controls);

$.overlay_video.addEventListener("loadeddata", video.loaded);

$.overlay_close.addEventListener("click", overlay.close);

$.overlay_play.addEventListener("click", toggle.play);

$.overlay_mute.addEventListener("click", toggle.mute);

$.overlay_next.addEventListener("click", video.next);

$.overlay_prev.addEventListener("click", video.prev);
