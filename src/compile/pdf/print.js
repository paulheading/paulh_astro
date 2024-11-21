import $ from "./helpers.js";

import { personal } from "paully/data";

const summary_copy = await $.readFile("../../markdown/summary_plain.md");

const print = {};

print.name = [personal.name, $.columns[0], $.rows[0] + $.lineHeight];

print.location = [personal.location, $.columns[2], $.rows[0]];

print.email = [
  personal.email,
  $.columns[2],
  $.rows[0] + $.lineHeight,
  { url: "mailto:" + personal.email },
];

print.phone = ["07873 156538", $.columns[2], $.rows[0] + $.lines(2)];

print.summary_title = ["Summary", $.columns[0], $.rows[1]];

print.summary_copy = [
  summary_copy,
  $.columns[0],
  $.rows[1] + 9,
  { maxWidth: $.columns[2] - $.hzPadding - $.gap },
];

print.date_created = [
  $.date_created,
  $.columns[2],
  $.rows[1] + $.lines(3),
  { maxWidth: $.column },
];

print.resume_link = [
  "paul.ly/resume",
  $.columns[2],
  $.rows[1] + $.lines(3.75),
  { url: "https://paul.ly/resume" },
];

print.projects_title = ["Projects", $.columns[0], $.rows[2]];

print.roles_title = ["Roles", $.columns[0], $.rows[3]];

print.learning_title = ["Learning", $.columns[0], $.rows[4]];

export default print;
