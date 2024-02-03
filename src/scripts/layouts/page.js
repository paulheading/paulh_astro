import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);

let code_targets = document.querySelectorAll("code");

let pre_targets = document.querySelectorAll("pre");

let targets = [...code_targets, ...pre_targets];

targets.forEach((target) => hljs.highlightBlock(target));
