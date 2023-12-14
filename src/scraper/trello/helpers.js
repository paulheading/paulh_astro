import { stripHtml } from "string-strip-html";
import showdown from "showdown";
import { list } from "./variables.js";

const create = {};

/**
 * @summary Formats strings into HTML arrays
 * @param {string} target
 * @returns {array} Array of HTML markup
 */
create.html = (target) => new showdown.Converter().makeHtml(target);

/**
 * @summary Create text snippet. Either summary or description html markup
 */
create.snippet = function (target, position) {
  var hr = "---";

  // (loop) if first character is a backtick, remove it
  while (target.slice(0, 1) == "`") target = target.slice(1);
  // (loop) if last character is a backtick, remove it
  while (target.slice(-1) == "`") target = target.slice(0, -1);

  if (!target.includes(hr)) return create.html(target);

  var split = target.split(hr);

  return create.html(split[position]);
};

/**
 * @summary If possible, create text snippet from array position 0
 * @param {string} target - Trello markup
 */
create.summary = function (target) {
  target = create.snippet(target, 0);
  return stripHtml(target).result;
};

/**
 * @summary If possible, create text snippet from array position 1
 * @param {string} target - Trello markup
 */
create.desc = (target) => create.snippet(target, 1);

/**
 * @todo streamline process below
 */

create.type = function (target) {
  const { projects, roles, learning, articles } = list;

  if (target == projects) return "project";
  if (target == roles) return "role";
  if (target == learning) return "learning";
  if (target == articles) return "article";

  return "unknown";
};

const remove = {};

remove.hero = (name) => name.replace("Hero: ", "");

const convert = {};

convert.labelColors = function (labels) {
  return labels.map((label) => {
    let { color } = label;

    if (color == "lime") color = "#94c749";
    if (color == "sky") color = "#6dc4e0";

    return { ...label, color };
  });
};

export { remove, create, convert };
