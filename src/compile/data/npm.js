import { get } from "#helpers";

async function getNpmData() {
  const name = "barbican-reset";
  const url = "https://www.npmjs.com/package/" + name;

  const registry = await get.JSON("https://registry.npmjs.org/" + name);
  const last_year = await get.JSON(
    "https://api.npmjs.org/downloads/point/last-year/" + name
  );

  const { latest } = registry["dist-tags"];
  const downloads = last_year["downloads"];

  return { name, version: latest, downloads, url, color: "red" };
}

export default getNpmData;
