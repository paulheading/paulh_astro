import $ from "~scripts/selectors";
import player from "~scripts/components/gallery/player";
import set from "~scripts/components/gallery/setters";
import get from "~scripts/components/gallery/getters";

function close() {
  set.state($.overlay, "closed");

  player.clear();

  set.state($.body, "visible");
}

function update(target) {
  let settings = get.player.data(target);

  let { type } = settings;

  let context = target.querySelector(".context").innerHTML;

  if (context) $.context_copy.innerHTML = context;

  context
    ? $.overlay_info.style.removeProperty("display")
    : ($.overlay_info.style.display = "none");

  if (type == "video") set.video(settings);

  if (type == "ad") set.iframe(settings);
}

function open(event) {
  const { target } = event;

  update(target);

  set.state($.body, "hidden");

  set.state($.overlay, "open");
}

export default { close, open, update };
