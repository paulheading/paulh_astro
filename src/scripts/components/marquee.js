import $ from "~scripts/selectors";
import animate from "~scripts/animate/marquee";

function spanWrap({ content, className, style }) {
  let span = `<span`;

  if (className) span += ` class="${className}"`;

  if (style) span += ` style="${style}"`;

  span += `>${content}</span>`;

  return span;
}

function prepWords(words) {
  const wordWraps = (content) =>
    spanWrap({ content, className: "word", style: "opacity: 0;" });

  words = words.split(" ").map(wordWraps).join(" ");

  let sentence = spanWrap({ content: words, className: "sentence" });

  let sentences = "";

  for (let index = 0; index < 10; index++) sentences += sentence;

  return sentences;
}

function setup(name, url) {
  if ($.marquee_tab_link) $.marquee_tab_link.setAttribute("href", url);

  if ($.marquee_row_link) {
    $.marquee_row_link.setAttribute("href", url);
    $.marquee_link_content.innerHTML = prepWords(name);

    animate.stagger($.marquee_row_link).restart();
    animate.scroll($.marquee_link_content).restart();
  }
}

export default { setup };
