import $ from "~scripts/selectors";

const { pathname } = window.location;
const links = $.menu.querySelector(".links").children;

for (let index = 0; index < links.length; index++) {
  const link = links[index];
  const { innerText } = link;
  const content = innerText.toLowerCase();
  const disabled = "disabled";

  link.classList.remove(disabled);

  if (content == pathname.slice(1)) link.classList.add(disabled);
}
