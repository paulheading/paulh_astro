import { promises as fs } from "fs";
import { jsPDF } from "jspdf";
import { DateTime } from "luxon";

const $ = {};

$.doc = new jsPDF({ lineHeight: 1.35 });

$.title = "paul-heading-resume-front-end-designer-developer";

$.website = "https://paul.ly";

$.date_created = "Created on " + DateTime.now().toFormat("dd LLL yyyy");

$.readFile = async function (path) {
  const data = await fs.readFile(path, "utf8");
  return data.trim();
};

$.calcColumns = function (value) {
  if (value <= 1) return $.hzPadding;

  value = value - 1;

  let gap = value * $.gap;
  let column = value * $.column;

  return column + gap + $.hzPadding;
};

$.lines = (value) => $.lineHeight * value;

$.hzPadding = 8;
$.vtPadding = 14;
$.column = 58;
$.gap = 8;
$.lineHeight = 7.5;

$.columns = [$.calcColumns(1), $.calcColumns(2), $.calcColumns(3)];

$.rows = [$.vtPadding, 36, 78, 150, 222];

$.fontSizeBody = 13;
$.fontSizeSmall = 10;
$.fontSizeH1 = 32;
$.fontSizeH2 = 21;

$.fontFamily = "helvetica";

$.boldText = [$.fontFamily, "bold"];
$.normalText = [$.fontFamily, "normal"];
$.italicText = [$.fontFamily, "italic"];
$.boldItalicText = [$.fontFamily, "bolditalic"];

$.black = [0, 0, 0];
$.grey = [73, 80, 87];

export default $;
