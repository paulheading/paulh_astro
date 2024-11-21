import $ from "./helpers.js";
import create from "./create.js";
import print from "./print.js";

import { personal } from "paully/data";

import layout from "../../data/layout.json" assert { type: "json" };
import resume from "../../data/resume.json" assert { type: "json" };

const { projects } = layout;
const { roles, learning } = resume;

const filepath = "../../../public/";

$.doc.setFont(...$.boldText);
$.doc.setFontSize($.fontSizeH1);
$.doc.text(...print.name);
$.doc.setFontSize($.fontSizeBody);

$.doc.text(...print.location);
create.link(...print.email);
$.doc.text(...print.phone);

$.doc.setFontSize($.fontSizeH2);
$.doc.text(...print.summary_title);

$.doc.setFont(...$.normalText);
$.doc.setFontSize($.fontSizeBody);
$.doc.text(...print.summary_copy);

$.doc.setFont(...$.boldText);

personal.platforms.forEach(create.platform_links);

$.doc.setFontSize($.fontSizeSmall);
$.doc.setFont(...$.normalText);
$.doc.text(...print.date_created);

$.doc.setFont(...$.boldText);
create.link(...print.resume_link);
$.doc.setFontSize($.fontSizeBody);
$.doc.setFont(...$.normalText);

$.doc.setFontSize($.fontSizeBody);
create.title(print.projects_title);

projects.cards.forEach(function (content, index) {
  const y = $.rows[2] + $.lineHeight;
  $.doc.setFontSize($.fontSizeSmall);
  $.doc.setFont(...$.normalText);
  create.content_column(content, index, y);
});

$.doc.setFontSize($.fontSizeBody);
create.title(print.roles_title);

roles.cards.forEach(function (content, index) {
  const y = $.rows[3] + $.lineHeight;
  $.doc.setFontSize($.fontSizeSmall);
  $.doc.setFont(...$.normalText);
  create.content_column(content, index, y);
});

$.doc.setFontSize($.fontSizeBody);
create.title(print.learning_title);

learning.cards.forEach(function (content, index) {
  const y = $.rows[4] + $.lineHeight;
  $.doc.setFontSize($.fontSizeSmall);
  $.doc.setFont(...$.normalText);
  create.content_column(content, index, y);
});

$.doc.save(filepath + $.title + ".pdf");

console.log("pdf compiled!");
