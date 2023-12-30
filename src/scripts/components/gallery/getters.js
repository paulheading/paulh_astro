import $ from "~scripts/selectors";

const player = {};

const $player = () => $.overlay_controls.nextElementSibling;

const data = (target, value) => target.getAttribute("data-" + value);

player.data = function (target) {
  const attributes = ["src", "width", "height", "index", "type"];

  const result = {};

  const attachAttribute = (attribute) =>
    (result[attribute] = data(target, attribute));

  attributes.forEach(attachAttribute);

  return result;
};

export default { $player, player, data };
