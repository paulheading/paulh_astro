const by_name = (pages, title) => pages.filter(({ name }) => name == title)[0];

function sibling_windows(element) {
  const parent = element.closest(".window");
  const grandpa = parent.parentElement;
  const children = [...grandpa.children];
  return children.filter((child) => child != parent);
}

function paragraph(value, text) {
  text = text.split("<p>");
  text = text.filter((_, index) => index == value);
  return "<p>" + text;
}

export default { by_name, sibling_windows, paragraph };
