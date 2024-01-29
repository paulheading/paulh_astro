import { jsPDF } from "jspdf";
import $ from "~scripts/selectors";
import row from "~scripts/components/page/row";

row.setup($.projects_row);
row.setup($.roles_row);
row.setup($.learning_row);

const button = document.querySelector("#saveAsPDF");

function query({ parent, value }) {
  parent = parent ? parent : document;
  return parent.querySelector(value);
}

function queryText({ parent, value }) {
  parent = parent ? parent : document;
  return query({ parent, value }).innerText;
}

function queryAll({ parent, value }) {
  parent = parent ? parent : document;
  return parent.querySelectorAll(value);
}

const fontSize = (value) => value * 0.75;

function createPDF() {
  const doc = new jsPDF({ lineHeight: 1.35 });

  let date = new Date();

  date = String(date).split(":");

  date = date[0];

  date = date.slice(0, -2);

  const compile_date = "Created on " + date;

  const $ = {
    name: queryText({ value: ".name" }),
    location: queryText({ value: ".location" }),
    email: query({ value: ".email a" }),
    bio_title: queryText({ value: ".title.biography" }),
    bio_copy: queryText({ value: ".copy.biography" }),
    platform_links: queryAll({ value: ".platforms a" }),
    projects: query({ value: "#projects_row" }),
    roles: query({ value: "#roles_row" }),
    learning: query({ value: "#learning_row" }),
    title: queryText({ value: "title" }),
  };

  $.projects.title = queryText({ parent: $.projects, value: ".row-title" });

  $.projects.content = queryAll({
    parent: $.projects,
    value: ".container[data-type='projects']",
  });

  $.roles.title = queryText({ parent: $.roles, value: ".row-title" });

  $.roles.content = queryAll({
    parent: $.roles,
    value: ".container[data-type='roles']",
  });

  $.learning.title = queryText({ parent: $.learning, value: ".row-title" });

  $.learning.content = queryAll({
    parent: $.learning,
    value: ".container[data-type='learning']",
  });

  const unit = 4;

  const units = (value) => unit * value;

  // const pageWidth = units(52.5);

  const hzPadding = units(2.25);
  const vtPadding = units(3.5);
  const column = units(14.5);
  const gap = units(2.25);
  const lineHeight = units(2);

  // const pageInner = pageWidth - hzPadding * 2;
  // const columnSpace = pageInner - gap * 2;

  const columns = [
    hzPadding,
    column + gap + hzPadding,
    column * 2 + gap * 2 + hzPadding,
  ];

  const rows = [units(9), units(20.5), units(38.25), units(58)];

  const fontSizeBody = fontSize(20);
  const fontSizeSmall = fontSizeBody * 0.8;
  const fontSizeH1 = fontSize(45);
  const fontSizeH2 = fontSize(30);

  const fontFamily = "helvetica";

  const boldText = [fontFamily, "bold"];
  const normalText = [fontFamily, "normal"];
  const boldItalicText = [fontFamily, "bolditalic"];

  const black = [0, 0, 0];
  const grey = [73, 80, 87];

  const create = {};

  const print = {
    name: [$.name, columns[0], vtPadding + 6],
    location: [$.location, columns[2], vtPadding],
    email: [
      $.email.innerText,
      columns[2],
      vtPadding + lineHeight,
      { url: $.email.href },
    ],
    phone: ["07873 156538", columns[2], rows[0] - 5],
    bio_title: [$.bio_title, columns[0], rows[0]],
    bio_copy: [
      $.bio_copy,
      columns[0],
      rows[0] + gap,
      { maxWidth: columns[2] - hzPadding - gap },
    ],
    projects_title: [$.projects.title, columns[0], rows[1]],
    roles_title: [$.roles.title, columns[0], rows[2]],
    learning_title: [$.learning.title, columns[0], rows[3]],
    compile_date: [
      compile_date,
      columns[2],
      rows[0] + lineHeight * 3,
      { maxWidth: column },
    ],
    resume_link: [
      "paulh.biz/resume",
      columns[2],
      rows[0] + lineHeight * 3.8,
      { url: "https://paulh.biz/resume" },
    ],
  };

  create.underlines = function (innerText, x, y) {
    y += 1;

    let textWidth = doc.getTextWidth(innerText);

    if (textWidth <= column) {
      doc.line(x, y, x + textWidth, y);
      return;
    }

    let letters = innerText.split(" ");

    let lines = [0];

    let currentIndex = 0;

    letters.forEach(function (letter) {
      let length = doc.getTextWidth(letter);

      length = Number(length.toFixed(2));

      let nextStep = lines[currentIndex] + length + 1;

      let hasSpace = nextStep < column;

      if (hasSpace) {
        lines[currentIndex] = nextStep;
      } else {
        lines.push(length);
        currentIndex++;
      }
    });

    lines.forEach(function (line, index) {
      y += lineHeight * index;

      doc.line(x, y, x + line, y);
    });
  };

  create.link = function (innerText, x, y, options) {
    if (options.url) {
      options.url = options.url.replace(
        "http://localhost:4321",
        "https://paulh.biz"
      );
    }

    const linkProps = [innerText, x, y, { ...options }];

    doc.textWithLink(...linkProps);

    create.underlines(innerText, x, y);
  };

  create.platform_links = function (link, index) {
    const { innerText, href } = link;
    const nudge = index + 1;
    const y = rows[0] + lineHeight * nudge;

    create.link(innerText, columns[2], y, { url: href });
  };

  create.due = function (innerText, x, y) {
    doc.setTextColor(...grey);
    doc.setFont(...boldItalicText);
    doc.text(innerText, x, y);
  };

  create.content_column = function (content, index, y) {
    if (index >= 3) return;

    doc.setFontSize(fontSizeBody);

    let name = query({ parent: content, value: ".name" });

    let nameWidth = doc.getTextWidth(name.innerText);

    let nameOffset = lineHeight;

    while (nameWidth > column) {
      nameWidth -= column;
      nameOffset += lineHeight;
    }

    const due = query({ parent: content, value: ".due" });

    const summary = query({ parent: content, value: ".summary" });

    const nameProps = [
      name.innerText,
      columns[index],
      y,
      { url: name.href, maxWidth: column },
    ];

    let dueProps = [due.innerText, columns[index], y + nameOffset];

    const summaryProps = [
      summary.innerText,
      columns[index],
      y + lineHeight + nameOffset,
      { maxWidth: column },
    ];

    doc.setFont(...boldText);

    create.link(...nameProps);

    create.due(...dueProps, nameWidth);

    doc.setTextColor(...black);

    doc.setFont(...normalText);

    doc.text(...summaryProps);
  };

  create.title = function (settings) {
    doc.setFontSize(fontSizeH2);
    doc.setFont(...boldText);
    doc.text(...settings);
  };

  doc.setFont(...boldText);
  doc.setFontSize(fontSizeH1);
  doc.text(...print.name);

  doc.setFontSize(fontSizeBody);

  doc.text(...print.location);
  create.link(...print.email);
  doc.text(...print.phone);

  doc.setFontSize(fontSizeH2);
  doc.text(...print.bio_title);

  doc.setFont(...normalText);
  doc.setFontSize(fontSizeBody);
  doc.text(...print.bio_copy);

  doc.setFont(...boldText);

  $.platform_links.forEach(create.platform_links);

  doc.setFontSize(fontSizeSmall);
  doc.setFont(...normalText);
  doc.text(...print.compile_date);
  doc.setFont(...boldText);
  create.link(...print.resume_link);
  doc.setFontSize(fontSizeBody);
  doc.setFont(...normalText);

  create.title(print.projects_title);

  $.projects.content.forEach(function (content, index) {
    const y = rows[1] + 10;
    create.content_column(content, index, y);
  });

  create.title(print.roles_title);

  $.roles.content.forEach(function (content, index) {
    const y = rows[2] + 10;
    create.content_column(content, index, y);
  });

  create.title(print.learning_title);

  $.learning.content.forEach(function (content, index) {
    const y = rows[3] + 10;
    create.content_column(content, index, y);
  });

  $.title = $.title
    .toLowerCase()
    .replaceAll("|", "")
    .replaceAll(" ", "-")
    .replaceAll("--", "-");

  doc.save($.title + ".pdf");
}

button.addEventListener("click", createPDF);
