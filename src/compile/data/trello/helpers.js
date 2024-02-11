import { stripHtml } from "string-strip-html";
import showdown from "showdown";
import { DateTime } from "luxon";

import colors from "./colors.js";

const formatDate = (value) => value.toFormat("MMM yyyy");

function formatDateFromISO(value) {
  let result = DateTime.fromISO(value);

  result = formatDate(result);

  return result;
}

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

create.filename = function (value) {
  let regex = new RegExp("-", "g");
  return value.replace(regex, "_");
};

create.projectTimeline = function ({ start, due, dueComplete }) {
  start = DateTime.fromISO(start);

  due = !dueComplete ? DateTime.now() : DateTime.fromISO(due);

  let diff = due.diff(start, ["year", "month"]);

  let { years, months } = diff.toObject();

  years = years.toFixed(0);

  months = months.toFixed(0);

  let length = "";

  let multipleYears = years > 0;

  if (multipleYears) {
    months = Number(months / 12).toFixed(1);

    years = Number(years) + Number(months);

    length = `${years} ${years != 1 ? "years" : "year"}`;
  }

  if (!multipleYears) length = `${months} ${months != 1 ? "months" : "month"}`;

  return { length, start: formatDate(start), due: formatDate(due) };
};

create.currentStatus = function (labels) {
  let status = "Ongoing";

  labels.forEach(function (label) {
    if (label.name == "Paused") status = label.name;
  });

  return status;
};

create.projectStatus = function ({
  due,
  dueComplete,
  dateLastActivity,
  type,
  labels,
}) {
  if (type == "article") {
    return formatDateFromISO(dateLastActivity);
  }

  return dueComplete ? formatDateFromISO(due) : create.currentStatus(labels);
};

create.projectDetails = function (card) {
  let { start, due, dueComplete, dateLastActivity, type, labels } = card;
  let isArticle = type == "articles";

  if (!start) {
    return {
      length: null,
      start: null,
      due: null,
      status: null,
      labels: null,
    };
  }

  let resultProps = { start, due, dueComplete };

  let result = {
    ...create.projectTimeline({ ...resultProps }),
    status: null,
  };

  if (!isArticle) {
    let statusProps = {
      due,
      dueComplete,
      dateLastActivity,
      type,
      labels,
    };

    result.status = create.projectStatus({ ...statusProps });
  }

  return result;
};

create.localLabels = function (card, local) {
  let { labels, type } = card;
  let { primaryColor, projectDetails } = local;

  let isArticle = type == "articles";

  let extraLabels = {
    color: primaryColor,
    style: "outline",
  };

  labels = labels.filter(function (label) {
    return label.name != "Paused";
  });

  labels = labels.map(function (label, index) {
    label.style = "solid";

    if (index > 0) {
      label.style = "outline";
      label.color = primaryColor;
    }

    delete label.id;
    delete label.idBoard;
    delete label.uses;

    return label;
  });

  if (isArticle) {
    let wordCount = 0;

    let readingTime = 0;

    local.sections.forEach(function (section) {
      let words = section.split(" ");

      words.forEach(() => {
        wordCount++;
      });
    });

    readingTime = Math.ceil(wordCount / 238);

    readingTime = `${readingTime} ${readingTime > 1 ? "mins" : "min"}`;

    labels.push({
      name: readingTime,
      ...extraLabels,
    });

    return labels;
  }

  labels.push({
    name: projectDetails.length,
    ...extraLabels,
  });

  return labels;
};

create.dateCompiled = function (value = "Updated on") {
  let date = DateTime.now().toFormat("dd LLL yyyy");
  return value + " " + date;
};

create.localAttributes = function (card) {
  let { type } = card;
  let isArticle = type == "articles";

  let local = {};

  local.summary = card.desc ? create.summary(card.desc) : null;

  local.desc = card.desc ? create.desc(card.desc) : null;

  local.primaryColor = card.labels[0].color;

  local.sections = local.desc ? create.sections(local.desc) : null;

  local.pathname = card.name
    .replace(/\s+/g, "-")
    .replace(/\//g, "-")
    .replace(/[.]/g, "")
    .replace(/&/g, "")
    .replace("--", "-")
    .replace(/:/g, "")
    .toLowerCase();

  local.url = isArticle
    ? "/blog/" + local.pathname
    : "/" + card.type + "/" + local.pathname;

  local.filename = create.filename(local.pathname);

  local.projectDetails = create.projectDetails(card);

  local.labels = create.localLabels(card, local);

  local.search = create.searchData(card, local);

  return local;
};

create.searchData = function (card, local) {
  let result = { ...local };

  result.id = card.id;

  result.name = card.name;

  result.labels = result.labels.map((label) => label.name);

  delete result.projectDetails;

  delete result.primaryColor;

  return result;
};

export { remove, create, convert };
