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

    let name = color;
    let text = "white";
    let fill = "#626f86";

    if (!name) name = "black_dark";

    if (name == "green") {
      text = "#174b35";
      fill = "#4cce97";
    }

    if (name == "green_dark") {
      fill = "#1f845a";
    }

    if (name == "red") {
      text = "#5d1f1a";
      fill = "#f87169";
    }

    if (name == "purple") {
      text = "#352c63";
      fill = "#9f8fef";
    }

    if (name == "blue") {
      text = "#08336c";
      fill = "#579dff";
    }

    if (name == "blue_dark") {
      fill = "#0c66e4";
    }

    color = {
      name,
      text,
      fill,
    };

    let result = { ...label, color };

    console.log("label: ", result);

    return result;
  });
};

export { remove, create, convert };
