import "dotenv/config";
import fs from "fs";

import getTrelloData from "#trello/index";
import getSpotifyData from "#spotify/index";
import getGemData from "#gem";
import getNpmData from "#npm";
// import getHashnodeData from "#hashnode/index";
import getPocketcastsData from "#pocketcasts";

async function getLayoutData() {
  const pocketcasts = await getPocketcastsData();
  // const hashnode = await getHashnodeData();
  const projects = await getTrelloData("projects");
  const articles = await getTrelloData("articles");
  const spotify = await getSpotifyData();
  const gem = await getGemData();
  const npm = await getNpmData();

  return {
    pocketcasts,
    // hashnode,
    projects,
    articles,
    spotify,
    themes: {
      futuro: gem,
      reset: npm,
    },
  };
}

async function getResumeData() {
  const learning = await getTrelloData("learning");
  const roles = await getTrelloData("roles");

  return {
    learning,
    roles,
  };
}

const outputFolder = "../../data/";

const layout = [
  outputFolder + "layout.json",
  JSON.stringify(await getLayoutData(), null, 2),
  function (error) {
    if (error) console.log("there was an error: ", error);
  },
];

const resume = [
  outputFolder + "resume.json",
  JSON.stringify(await getResumeData(), null, 2),
  function (error) {
    if (error) console.log("there was an error: ", error);
  },
];

fs.writeFile(...layout);

fs.writeFile(...resume);

console.log("data compiled!");
