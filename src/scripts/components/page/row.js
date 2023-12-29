import controls from "~scripts/components/page/controls";

function setup($selector) {
  const $content = $selector.querySelector(".row-content");
  const $controls = $selector.querySelector(".row-controls");
  const $cards = $content.children;

  if ($controls) controls.setup($controls, $cards);
}

export default { setup };
