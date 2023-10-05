import { create, remove } from "./trello/helpers.js";
import { string, list } from "./trello/variables.js";
import { contains, get } from "../scripts/helpers.js";

const getTrello = {};

/**
 * @function getTrelloJSON
 * @summary Wrapper function for getJSON(). Limited to Trello urls
 * @param {string} target - Trello path
 * @returns {object}
 */
getTrello.JSON = async (target) => await get.JSON(string.url(target)); // string.url is the default trello url path

/**
 * @function getTrelloAttachments
 * @summary Wrapper function for getTrelloJSON(). Limited to attachment urls
 * @param {string} target - Trello path
 * @returns {object}
 */
getTrello.attachments = async (target) => {
  if (!target) return;

  // string.attachments is the default trello attachments path
  const results = await getTrello.JSON(string.attachments(target));

  if (!results.length) return [];

  return results.map(({ id, name, url }) => ({ id, name, url }));
};

/**
 * @function getTrelloActions
 * @summary Wrapper function for getTrelloJSON(). Limited to action urls
 * @param {string} target - Trello path
 * @returns {object}
 */
getTrello.actions = async function (target) {
  if (!target) return;

  // string.attachments is the default trello actions path
  return await await getTrello.JSON(string.actions(target));
};

/**
 * @function getTrelloSvgs
 * @summary Filters the attached actions for svgs. Returns either the first svg or null
 * @param {array} actions
 * @returns {object | null}
 * @deprecated Providing artwork locally instead of running it through trello
 */

getTrello.svgs = function (actions) {
  if (!actions.length) return null;
  // Filter content for svg tags.
  const svg = actions.filter(({ data }) => {
    const { text } = data;
    return text ? text.startsWith("`<svg") : false;
  });
  // If svg exists, return the first. Else return null.
  return svg.length ? svg[0].data.text : null;
};

async function processCard(card, list) {
  var isHero = card.name.startsWith("Hero: ") ? true : false;

  card.name = remove.hero(card.name);
  card.marquee = card.name;
  card.hero = isHero;
  card.type = create.type(list);
  card.attachments = card.id ? await getTrello.attachments(card.id) : null;
  card.actions = card.id ? await getTrello.actions(card.id) : null;
  card.local = {}; // locally interpreted formatting of data
  card.local.summary = card.desc ? create.summary(card.desc) : null;
  card.local.desc = card.desc ? create.desc(card.desc) : null;

  if (card.type == "education") return card;

  card.local.pathname = card.name
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/[.]/g, "")
    .replace(/&/g, "")
    .replace("--", "-")
    .toLowerCase();
  card.local.url = "/" + card.type + "/" + card.local.pathname;

  return card;
}

getTrello.cards = async (list, type) => {
  var cards = await getTrello.JSON(string.cards(list), type);

  if (!cards.length) return [];

  cards = cards.map((card) => processCard(card, list));

  return await Promise.all(cards);
};

getTrello.data = async function (type) {
  if (type == "projects") {
    var cards = await getTrello.cards(list.projects);

    cards = cards.filter(({ labels }) => !contains.label(labels, "Local")); // remove local projects in production

    return cards;
  }

  if (type === "roles") return await getTrello.cards(list.roles);

  if (type === "education") return await getTrello.cards(list.education);
};

export default getTrello.data;
