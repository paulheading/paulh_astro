function labelContent(content, label = "") {
  return content.map(({ name, open = false }) => ({ name, open, label }));
}

const trello = [{ name: "trello", open: true }];

const spotify = [
  { name: "2020" },
  { name: "2021" },
  { name: "2022" },
  { name: "2023", open: true },
];

const themes = [{ name: "reset", open: true }, { name: "futuro" }];

const carbon = [{ name: "carbon", open: true }];

export default {
  trello: labelContent(trello, "trello"),
  spotify: labelContent(spotify, "spotify"),
  themes: labelContent(themes, "themes"),
  carbon: labelContent(carbon, "carbon"),
};
