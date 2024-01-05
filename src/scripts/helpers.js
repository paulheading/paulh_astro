import create from "./helpers/create.js";
import get from "./helpers/get.js";
import calc from "./helpers/calc.js";
import contains from "./helpers/contains.js";

const toRem = (value) => value * 0.0625 + "rem";

export { create, get, calc, contains, toRem };
