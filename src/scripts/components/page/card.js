function toggleText(event) {
  const { target } = event;
  const $parent = target.parentElement;
  const $extra = $parent.querySelector(".extra");
  const hidden = $extra.style.display == "none";

  if (hidden) {
    $extra.removeAttribute("style");
    target.innerHTML = "less";
  } else {
    target.innerHTML = "more";
    $extra.style.display = "none";
  }
}

function readmore(index, $cards) {
  const $card = $cards[index];
  const $summary = $card.querySelector(".summary");
  const $extra = $summary.querySelector(".extra");

  if (!$extra) return;

  const $button = $summary.querySelector("button");

  $button.addEventListener("click", toggleText);
}

export default { readmore };
