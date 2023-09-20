import $ from "~scripts/selectors";

const player = {};

const $player = () => $.overlay_controls.nextElementSibling;

const data = (target, value) => target.getAttribute("data-" + value);

player.data = function (target) {
  const result = {
    src: data(target, "src"),
    width: data(target, "width"),
    height: data(target, "height"),
    index: data(target, "index"),
    type: data(target, "type"),
  };

  return result;
};

export default { $player, player, data };
