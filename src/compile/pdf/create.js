import $ from "./helpers.js";

const create = {};

create.twoDigitNumber = (value) => parseFloat(value.toFixed(2));

create.calcWordLines = function (words) {
  words = words.split(" ");

  let lines = [0];

  let index = 0;

  words.forEach(function (word) {
    let length = $.doc.getTextWidth(word);

    let nextStep = lines[index] + length + 1;

    let hasSpace = nextStep < $.column;

    if (hasSpace) {
      lines[index] = create.twoDigitNumber(nextStep);
    } else {
      lines.push(create.twoDigitNumber(length));
      index++;
    }
  });

  return lines;
};

create.underlines = function (text, x, y, callback) {
  y += 1.25;

  let textWidth = $.doc.getTextWidth(text);

  if (textWidth <= $.column) {
    textWidth = create.twoDigitNumber(textWidth);
    $.doc.line(x, y, x + textWidth, y);
    callback && callback(text, [textWidth]);
    return;
  }

  let lines = create.calcWordLines(text);

  function drawWordLines(line, index) {
    y += 6.25 * index;
    $.doc.line(x, y, x + line, y);
  }

  lines.forEach(drawWordLines);

  callback && callback(text, lines);
};

create.link = function (text, x, y, options, callback) {
  y -= 0.25;

  const linkProps = [text, x, y, { ...options }];

  $.doc.textWithLink(...linkProps);

  create.underlines(text, x, y, callback);
};

create.platform_links = function (link, index) {
  const { name, url } = link;
  const y = $.rows[1] + $.lines(index + 1);
  create.link(name, $.columns[2], y, { url });
};

create.title = function (settings) {
  $.doc.setFontSize($.fontSizeH2);
  $.doc.setFont(...$.boldText);
  $.doc.text(...settings);
};

create.labels = function (labels, x, y) {
  let offsets = [];

  labels.forEach((label) => offsets.push($.doc.getTextWidth(label) + 2));

  labels.forEach(function (label, index) {
    if (index > 0) x += offsets[index - 1];
    $.doc.text(label, x, y);
  });
};

create.content_column = function (content, index, y) {
  if (index >= 3) return;

  $.doc.setFontSize($.fontSizeBody);

  let { name, local, dueComplete } = content;

  let { labels, summary, url, projectDetails } = local;

  labels.push(projectDetails.length);

  url = $.website + url;

  let x = $.columns[index];

  let maxWidth = $.column;

  function statusOffset(lines) {
    lines--;

    let offset = 11.25;

    offset += lines * 6.25;

    offset += 2.5;

    return offset;
  }

  function nameCallback(_, lines) {
    let status = dueComplete ? projectDetails.due : "Ongoing";

    let statusY = y + statusOffset(lines.length);

    let statusProps = [status, x, statusY, { maxWidth }];

    let summaryY = statusY + $.lineHeight;

    let summaryProps = [summary, x, summaryY, { maxWidth }];

    $.doc.setFontSize($.fontSizeSmall);

    $.doc.setFont(...$.italicText);

    $.doc.text(...statusProps);

    $.doc.setFontSize($.fontSizeBody);

    $.doc.setFont(...$.normalText);

    $.doc.text(...summaryProps);
  }

  let nameProps = [name, x, y + $.lineHeight, { url, maxWidth }, nameCallback];

  $.doc.setFontSize($.fontSizeSmall);

  create.labels(labels, x, y);

  $.doc.setFontSize($.fontSizeBody);

  $.doc.setFont(...$.boldText);

  create.link(...nameProps);
};

export default create;