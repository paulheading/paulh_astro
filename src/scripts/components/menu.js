import $ from "~scripts/selectors";

const { pathname } = window.location;
const links = $.menu.querySelector(".links").children;

for (let index = 0; index < links.length; index++) {
  const link = links[index];
  const { innerText } = link;
  const content = innerText.toLowerCase();
  const path = pathname.slice(1);
  const disabled = "disabled";

  console.log("content: ", content);
  console.log("path: ", path);

  link.classList.remove(disabled);

  if (content == path) link.classList.add(disabled);
}
