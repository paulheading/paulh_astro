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
 * @param {*} results
 */

function printResults(results) {
  results = collectResults(results);

  // let test = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  let rows = document.querySelectorAll(".page-row[data=articles]");

  let empty = createEmptyRow(rows[0]);

  rows.forEach((row) => (row.style.display = "none"));

  let output = [];

  function assignRow(result, index) {
    let newRow = index % 3 == 0;

    if (newRow) output.push(empty.cloneNode(true));

    let lastRow = output[output.length - 1];

    let lastContent = lastRow.querySelector(".page-content");

    lastContent.append(result);
  }

  results.forEach(assignRow);

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

  if (input.value == "") return;

  clear.removeAttribute("style", "display");

  let results = search.search(input.value);

  if (results.length) printResults(results);
}

function clearSearchResults(event) {
  let { target } = event;

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

submit.addEventListener("click", searchArticles);

clear.addEventListener("click", clearSearchResults);
