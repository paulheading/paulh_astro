import { get } from "#helpers";

async function getGemData() {
  const gem = await get.JSON("https://rubygems.org/api/v1/gems/futuro");

  const { name, version, downloads, project_uri } = gem;

  return { name, version, downloads, url: project_uri, color: "dodgerblue" };
}

export default getGemData;
