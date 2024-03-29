import * as JsSearch from "js-search";
import { gsap } from "gsap";

import { articles } from "~data/layout.json";

let search = new JsSearch.Search("id");

articles.cards.forEach((card) => search.addDocuments({ ...card.local.search }));

let indexes = ["name", "desc", "pathname", "summary", "url", "labels"];

indexes.forEach((item) => search.addIndex(item));

/**
 * @name $rows
 * @param {string} type - Option to filter via the data attribute
 * @returns {HTMLElement}
 */

const $rows = function (type) {
  let query = ".page-row";

  if (type) query += `[data=${type}]`;

  return document.querySelectorAll(query);
};

const $articles = () => document.querySelectorAll("[data-type=articles]");

const $input = () => $submit.previousSibling;

/**
 * Static Selectors
 */

const $submit = document.querySelector("#submit-search");

const $form = $submit.closest("form");

const $clear = $form.querySelector("#clear-search");

const $more = document.querySelector("#see-more");

// const $moreWrap = $more.closest(".wrap");

const $moreContent = $more.querySelector(".content");

const $moreCount = $more.querySelector(".count");

let articlesPerRow = 3;

let initialState = {
  mode: "article",
  search: "",
};

let state = { ...initialState };

// /**
//  * @name dataIs
//  * @param {HTMLElement} element
//  * @param {string} query
//  * @returns {boolean} Indicating whether the data attribute matches the string query
//  */

// function dataIs(element, query) {
//   let data = element.getAttribute("data");
//   return data == query;
// }

/**
 * @name createEmptyRow
 * @param {HTMLElement} row Existing HTML article row markup with content
 * @returns {HTMLElement} Empty HTML search result row markup
 */

function createEmptyRow(row) {
  let clone = row.cloneNode(true);

  let content = clone.querySelector(".row-content");

  clone.setAttribute("data", "search");

  /**
   * @see {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript} for details on loop
   */

  while (content.firstChild) content.removeChild(content.lastChild);

  return clone;
}

/**
 * @name collectResults
 * @param {Array<HTMLElement>} results
 * @return {Array<HTMLElement>} elements
 */

function collectResults(results) {
  let elements = [];

  function getID(article) {
    let id = article.getAttribute("data-id");

    let match = false;

    function matchID(result) {
      if (match) return;

      if (result.id == id) {
        let clone = article.cloneNode(true);

        elements.push(clone);

        results = results.filter((found) => found.id == result.id);

        match = true;
      }
    }

    results.forEach(matchID);
  }

  $articles().forEach(getID);

  return elements;
}

/**
 * @name printResults
 * @param {Array<HTMLElement>} results
 */

function printResults(results) {
  results = collectResults(results);

  let $articleRows = $rows("article");

  let empty = createEmptyRow($articleRows[0]);

  $articleRows.forEach((row) => row.setAttribute("style", "display: none;"));

  let output = [];

  function assignRow(result, index) {
    let newRow = index % articlesPerRow == 0;

    if (newRow) {
      let clone = empty.cloneNode(true);

      if (index > 0) clone.setAttribute("style", "display: none;");

      output.push(clone);
    }

    let lastRow = output[output.length - 1];

    let $lastContent = lastRow.querySelector(".row-content");

    $lastContent.append(result);
  }

  results.forEach(assignRow);

  let articlesRemaining = results.length - articlesPerRow;

  if (articlesRemaining <= 0) {
    setMoreReset();
  } else {
    $moreCount.innerText = `[${articlesRemaining}]`;
  }

  let $pageInner = document.querySelector(".page-inner[data=search]");

  output.forEach((row) => $pageInner.append(row));
}

function resetSearchForm() {
  clearSearchResults();
  $form.removeAttribute("data-error");
}

/**
 * @name searchArticles
 * @param {MouseEvent} event
 */

function searchArticles(event) {
  event.preventDefault;

  let value = $input().value;

  if (!value.length) {
    resetSearchForm();
    return;
  }

  if (value.length) {
    if (state.search == value) {
      return;
    } else {
      if (state.search.length) {
        clearSearchResults();
      }

      state.search = value;
    }

    $clear.removeAttribute("style", "display");
  }

  let results = search.search(value);

  if (results.length) {
    printResults(results);
    $form.removeAttribute("data-error");
    state.mode == "search";
  }

  if (!results.length) {
    $form.setAttribute("data-error", "true");

    const defaults = {
      duration: 0.1,
    };

    const tl = gsap.timeline({
      defaults,
      yoyo: true,
      repeat: 2,
    });

    // prettier-ignore
    tl.to($form, { x: "+=10" })
      .to($form, { x: "-=10" });
  }
}

function resetMoreButton() {
  let articlesRemaining = $articles().length - articlesPerRow;

  if (articlesRemaining <= 0) return;

  $moreContent.innerText = "See more";

  $moreCount.innerText = `[${articlesRemaining}]`;

  $moreCount.removeAttribute("style", "display");
}

function clearSearchResults() {
  $rows("search").forEach(($row) => $row.remove());

  function resetArticleRows($row, index) {
    index > 0
      ? $row.setAttribute("style", "display: none;")
      : $row.removeAttribute("style", "display");
  }

  $rows("article").forEach(resetArticleRows);

  $input().value = "";

  $form.removeAttribute("data-error");

  $clear.setAttribute("style", "display: none;");

  resetMoreButton();

  state = { ...initialState };
}

function setMoreReset() {
  $moreContent.innerText = "Reset";
  $moreCount.setAttribute("style", "display: none;");
  $moreCount.innerText = "";
}

/**
 * @name decreaseMoreCount
 * @description Decrease the number of articles displayed within the see more button
 */

function decreaseMoreCount() {
  let { innerText } = $moreCount;

  innerText = Number(innerText.slice(1, -1));

  innerText = innerText - articlesPerRow;

  $moreCount.innerText = `[${innerText}]`;

  if (innerText <= 0) setMoreReset();
}

/**
 * @name loadNextRow
 * @description Display the next remaining row
 */

function loadNextRow() {
  for (let index = 0; index < $rows(state.mode).length; index++) {
    const $row = $rows(state.mode)[index];

    const hidden = $row.style.getPropertyValue("display") == "none";

    if (hidden) {
      $row.removeAttribute("style", "display");
      break;
    }
  }

  decreaseMoreCount();
}

function handleMoreClick() {
  const needsReset = $moreCount.style.getPropertyValue("display") == "none";
  needsReset ? clearSearchResults() : loadNextRow();
}

$submit.addEventListener("click", searchArticles);

$clear.addEventListener("click", clearSearchResults);

$more.addEventListener("click", handleMoreClick);
