function update(args) {
  const { current, page, $prev, $next, $cards } = args;
  const limit = current + page;

  $prev.disabled = current == 0;
  $next.disabled = $cards.length == limit;

  for (let index = 0; index < $cards.length; index++) {
    const $card = $cards[index];

    if (index < current) {
      $card.setAttribute("style", "display: none;");
    } else if (index < limit) {
      $card.removeAttribute("style");
    } else {
      $card.setAttribute("style", "display: none;");
    }
  }
}

function setup($selector, $cards) {
  const $prev = $selector.querySelector(".row-button.prev");
  const $next = $selector.querySelector(".row-button.next");

  let current = 0;
  let page = 3;

  const args = {
    page,
    $prev,
    $next,
    $cards,
  };

  update({ current, ...args });

  $prev.addEventListener("click", function () {
    current--;
    update({ current, ...args });
  });

  $next.addEventListener("click", function () {
    current++;
    update({ current, ...args });
  });
}

export default { setup };
