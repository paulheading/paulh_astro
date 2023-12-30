import { stripHtml } from "string-strip-html";
import showdown from "showdown";
import { list } from "./variables.js";
import colors from "./colors.js";

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

/**
 * @name create.sections
 * @param {string} content
 * @returns {[string]} An array of html strings
 */

create.sections = function (content) {
  if (!content) return [];
  return content.split("<p><br></p>");
};

const remove = {};

remove.hero = (name) => name.replace("Hero: ", "");

const convert = {};

/**
 * @name convert.labelColors
 * @param {[object]} labels
 * @returns Label with a modified color object that contains trello hex values
 */

convert.labelColors = function (labels) {
  return labels.map((label) => {
    let { color } = label;

    let name = color ? color : "black_dark";

    for (let index = 0; index < colors.length; index++) {
      let item = colors[index];

      if (name == item.name) {
        color = item;
        break;
      }
    }

    return { ...label, color };
  });
};

export { remove, create, convert };
