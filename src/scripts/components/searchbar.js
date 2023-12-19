import * as JsSearch from "js-search";

import { articles } from "~data/layout.json";

var search = new JsSearch.Search("id");

search.addDocuments(articles);

search.addIndex("name");
search.addIndex(["local", "desc"]);
search.addIndex(["local", "pathname"]);
search.addIndex(["local", "summary"]);
search.addIndex(["local", "url"]);

let submit = document.querySelector("#search-submit");

let form = submit.parentElement;

let clear = form.nextSibling;

let articlesPerRow = 3;

let seeMore = document.querySelector("#see-more");

let wrapMore = seeMore.closest(".wrap-more");

let seeMoreCount = seeMore.querySelector(".count");

/**
 * @name createEmptyRow
 * @param {HTMLElement} row Existing HTML article row markup with content
 * @returns {HTMLElement} Empty HTML search result row markup
 */

function createEmptyRow(row) {
  let clone = row.cloneNode(true);

  let content = clone.querySelector(".page-content");

  clone.setAttribute("data", "search-results");

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
  let articles = document.querySelectorAll("[data-article=true]");

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

  articles.forEach(getID);

  return elements;
}

/**
 * @name printResults
 * @param {Array<HTMLElement>} results
 */

function printResults(results) {
  results = collectResults(results);

  let test = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  let rows = document.querySelectorAll(".page-row[data=articles]");

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

  test.forEach(assignRow);

  let articlesRemaining = test.length - articlesPerRow;

  if (articlesRemaining > 0) {
    wrapMore.removeAttribute("style", "display");
    seeMoreCount.innerHTML = `[${articlesRemaining}]`;
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

  let { target } = event;

  let input = target.previousSibling;

  if (input.value == "") return clearSearchResults(clear);

  clear.removeAttribute("style", "display");

  let results = search.search(input.value);

  if (results.length) printResults(results);
}

function clearSearchResults(target) {
  let input = submit.previousSibling;

  let rows = document.querySelectorAll(".page-row");

  function removeOrDisplay(row) {
    let rowData = row.getAttribute("data");

    let isSearchResult = rowData == "search-results";

    isSearchResult ? row.remove() : row.removeAttribute("style", "display");
  }

  rows.forEach(removeOrDisplay);

  input.value = "";

  target.style.display = "none";
}

/**
 * @name decreaseMoreCount
 * @description Decrease the number of articles displayed within the see more button
 */

function decreaseMoreCount() {
  let currentCount = seeMoreCount.innerHTML;

  currentCount = Number(currentCount.slice(1, -1));

  currentCount = currentCount - articlesPerRow;

  seeMoreCount.innerHTML = `[${currentCount}]`;

  if (currentCount <= 0) seeMore.style.display = "none";
}

/**
 * @name loadNewRow
 * @description Display the next remaining row
 */

function loadNewRow() {
  let rows = document.querySelectorAll(".page-row[data=search-results]");

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];

    const hidden = row.style.display == "none";

    if (hidden) {
      row.removeAttribute("style", "display");
      break;
    }
  }

  decreaseMoreCount();
}

submit.addEventListener("click", searchArticles);

clear.addEventListener("click", ({ target }) => clearSearchResults(target));

seeMore.addEventListener("click", loadNewRow);
