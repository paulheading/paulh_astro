function groupContent(folders, group = "") {
  return folders.map(({ name, open = false }) => ({ name, open, group }));
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
  trello: groupContent(trello, "trello"),
  spotify: groupContent(spotify, "spotify"),
  themes: groupContent(themes, "themes"),
  carbon: groupContent(carbon, "carbon"),
};
