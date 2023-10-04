import $ from "~scripts/selectors";
import set from "~scripts/components/gallery/setters";
import overlay from "~scripts/components/gallery/overlay";

import player from "~scripts/components/gallery/player";
import toggle from "~scripts/components/gallery/toggle";

function createThumbnails() {
  if (!$.thumbnails) return;

  for (let index = 0; index < $.thumbnails.length; index++) {
    const $button = $.thumbnails[index];
    $button.addEventListener("click", overlay.open);
  }

  $.overlay_play.addEventListener("click", toggle.play);

  $.overlay_mute.addEventListener("click", toggle.mute);

  $.overlay_next.addEventListener("click", player.next);

  $.overlay_prev.addEventListener("click", player.prev);

  $.overlay_close.addEventListener("click", overlay.close);

  window.addEventListener("resize", set.controls);
}

createThumbnails();
