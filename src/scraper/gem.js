import get from "../scripts/helpers/get.js";

async function getGemData() {
  const gem = await get.JSON("https://rubygems.org/api/v1/gems/futuro");

  const { name, version, downloads, project_uri } = gem;

  return { name, version, downloads, url: project_uri };
}

export default getGemData;
