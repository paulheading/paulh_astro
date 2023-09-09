import { marked } from "marked";

import create from "./helpers/create.js";
import find from "./helpers/find.js";
import chop from "./helpers/chop.js";
import get from "./helpers/get.js";
import calc from "./helpers/calc.js";
import toggle from "./helpers/toggle.js";
import contains from "./helpers/contains.js";

marked.use({ headerIds: false, mangle: false });

export { find, create, chop, toggle, contains, get, marked, calc };
