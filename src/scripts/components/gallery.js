import $ from "~scripts/selectors";
import video from "~scripts/components/gallery/video"
import set from "~scripts/components/gallery/setters"
import toggle from "~scripts/components/gallery/toggle"
import overlay from "~scripts/components/gallery/overlay"

for (let index = 0; index < $.thumbnails.length; index++) {
  const $button = $.thumbnails[index];
  $button.addEventListener("click", overlay.open);
}

window.addEventListener("resize", set.controls);

$.video.addEventListener("loadeddata", video.loaded);

$.close.addEventListener("click", overlay.close);

$.play.addEventListener("click", toggle.play)

$.mute.addEventListener("click", toggle.mute)

$.next.addEventListener("click", video.next)

$.prev.addEventListener("click", video.prev)