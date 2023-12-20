import * as JsSearch from "js-search";

import { articles } from "~data/layout.json";

var search = new JsSearch.Search("id");

search.addDocuments(articles);

search.addIndex("name");
search.addIndex(["local", "desc"]);
search.addIndex(["local", "pathname"]);
search.addIndex(["local", "summary"]);
search.addIndex(["local", "url"]);

/**
 * Dynamic Selectors
 * @description Returns a selector on execution, not during setup
 * @returns {HTMLElement}
 */

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

const $articles = () => document.querySelectorAll("[data-article=true]");

const $input = () => $submit.previousSibling;

const $moreCount = () => $more.querySelector(".count");

/**
 * Static Selectors
 */

const $submit = document.querySelector("#search-submit");

const $form = $submit.parentElement;

const $clear = $form.nextSibling;

const $more = document.querySelector("#see-more");

const $moreWrap = $more.closest(".wrap");

let articlesPerRow = 3;

let state = {
  mode: "article",
};

/**
 * @name dataIs
 * @param {HTMLElement} element
 * @param {string} query
 * @returns {boolean} Indicating whether the data attribute matches the string query
 */

function dataIs(element, query) {
  let data = element.getAttribute("data");
  return data == query;
}

/**
 * @name createEmptyRow
 * @param {HTMLElement} row Existing HTML article row markup with content
 * @returns {HTMLElement} Empty HTML search result row markup
 */

function createEmptyRow(row) {
  let clone = row.cloneNode(true);

  let content = clone.querySelector(".page-content");

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

  let rows = document.querySelectorAll(".page-row[data=article]");

  let empty = createEmptyRow(rows[0]);

  rows.forEach((row) => (row.style.display = "none"));

  let output = [];

  function assignRow(result, index) {
    let newRow = index % articlesPerRow == 0;

    if (newRow) {
      let clone = empty.cloneNode(true);

      if (index > 0) clone.style.display = "none";

      output.push(clone);
    }

    let lastRow = output[output.length - 1];

    let lastContent = lastRow.querySelector(".page-content");

    lastContent.append(result);
  }

  results.forEach(assignRow);

  let articlesRemaining = results.length - articlesPerRow;

  if (articlesRemaining <= 0) $moreWrap.style.display = "none";

  if (articlesRemaining > 0) {
    $moreWrap.removeAttribute("style", "display");
    $moreCount().innerText = `[${articlesRemaining}]`;
  }

  let container = document.querySelector(".container[data=search]");

  output.forEach((row) => container.append(row));
}

/**
 * @name searchArticles
 * @param {MouseEvent} event
 */

function searchArticles(event) {
  event.preventDefault;

  let value = $input().value;

  if (value == "") return clearSearchResults();

  $clear.removeAttribute("style", "display");

  let results = search.search(value);

  if (results.length) printResults(results);

  state.mode == "search";
}

function resetMoreButton() {
  let articlesRemaining = $articles().length - articlesPerRow;

  $moreWrap.removeAttribute("style", "display");

  $moreCount().innerText = `[${articlesRemaining}]`;
}

function clearSearchResults() {
  function removeSearchRows(row) {
    if (dataIs(row, "search")) row.remove();
  }

  $rows().forEach(removeSearchRows);

  for (let index = 0; index < $rows().length; index++) {
    const $row = $rows()[index];

    if (dataIs($row, "article")) {
      $row.removeAttribute("style", "display");
      break;
    }
  }

  $input().value = "";

  $clear.setAttribute("style", "display:none");

  resetMoreButton();
}

/**
 * @name decreaseMoreCount
 * @description Decrease the number of articles displayed within the see more button
 */

function decreaseMoreCount() {
  let { innerText } = $moreCount();

  innerText = Number(innerText.slice(1, -1));

  innerText = innerText - articlesPerRow;

  $moreCount().innerText = `[${innerText}]`;

  if (innerText <= 0) $moreWrap.style.display = "none";
}

/**
 * @name loadNextRow
 * @description Display the next remaining row
 */

function loadNextRow() {
  for (let index = 0; index < $rows(state.mode).length; index++) {
    const $row = $rows(state.mode)[index];

    const hidden = $row.style.display == "none";

    if (hidden) {
      $row.removeAttribute("style", "display");
      break;
    }
  }

  decreaseMoreCount();
}

$submit.addEventListener("click", searchArticles);

$clear.addEventListener("click", clearSearchResults);

$more.addEventListener("click", loadNextRow);
