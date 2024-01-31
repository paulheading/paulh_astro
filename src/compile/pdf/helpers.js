import { promises as fs } from "fs";
import { jsPDF } from "jspdf";

const $ = {};

$.doc = new jsPDF({ lineHeight: 1.35 });

$.title = "paul-heading-resume-front-end-designer-developer";

$.website = "https://paulh.biz";

let date = new Date();

date = String(date).split(":");

date = date[0];

date = date.slice(0, -2);

$.date_created = "Created on " + date;

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

$.rows = [$.vtPadding, 36, 80, 150, 220];

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
