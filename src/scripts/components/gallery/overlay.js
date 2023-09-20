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
  const settings = get.player.data(target);

  const { type } = settings;

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
