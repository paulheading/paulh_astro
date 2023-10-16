import PocketCasts from "pocketcasts";

async function getPocketcastsData() {
  let pocketcasts = new PocketCasts(
    process.env.POCKETCAST_USER,
    process.env.POCKETCAST_PASS
  );

  let results = pocketcasts.login().then(() => pocketcasts.getHistory());

  return results;
}

export default getPocketcastsData;
