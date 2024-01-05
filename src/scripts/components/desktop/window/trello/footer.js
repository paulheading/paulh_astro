import $ from "~scripts/selectors";

let visibleCards = [0, 1];

function changeCards(page, index) {
  if (visibleCards.includes(index)) {
    page.removeAttribute("style", "display");
  } else {
    page.setAttribute("style", "display: none;");
  }
}

function changeCurrentPage(value) {
  let currentPage = $.trello_currentPage.innerText;
  $.trello_currentPage.innerText = Number(currentPage) + value;
}

function displayButtons() {
  if (visibleCards.includes(1)) {
    $.trello_previous.setAttribute("style", "visibility: hidden;");
  } else {
    $.trello_previous.removeAttribute("style", "visibility");
  }

  if (visibleCards.includes($.trello_pages.length - 1)) {
    $.trello_next.setAttribute("style", "visibility: hidden;");
  } else {
    $.trello_next.removeAttribute("style", "visibility");
  }

  $.trello_status.innerText = `${currentPage} of ${totalPages}`;
}

function prevPage() {
  changeCurrentPage(-1);
  visibleCards = visibleCards.map((item) => item - 2);
  $.trello_pages.forEach(changeCards);
  displayButtons();
}

function nextPage() {
  changeCurrentPage(1);
  visibleCards = visibleCards.map((item) => item + 2);
  $.trello_pages.forEach(changeCards);
  displayButtons();
}

$.trello_previous.addEventListener("click", prevPage);

$.trello_next.addEventListener("click", nextPage);
