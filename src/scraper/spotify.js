import { string, playlist, id, secret, base } from "./spotify/variables.js";
import get from "../scripts/helpers/get.js";

const getSpotify = {};

getSpotify.token = async function () {
  const data = await get.JSON(base.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${id.client}:${secret.client}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  return data.access_token;
};

function trackData({ track }) {
  const { name, artists, album, external_urls, popularity } = track;
  return {
    artist: {
      url: artists[0].external_urls.spotify,
      name: artists[0].name,
    },
    popularity,
    release_date: album.release_date,
    url: external_urls.spotify,
    name,
  };
}

getSpotify.playlist = async (target) => {
  const token = await getSpotify.token();
  const data = await get.JSON(string.playlist(target), {
    headers: { Authorization: "Bearer " + token },
  });

  data.profile = "https://open.spotify.com/user/" + data.owner.display_name;
  data.url = data.external_urls.spotify;
  data.followers = data.followers.total;
  data.image = data.images[0].url;
  data.owner = {
    name: data.owner.display_name,
    url: data.owner.external_urls.spotify,
  };
  data.tracks = data.tracks.items.map(trackData);

  return data;
};

getSpotify.data = async () => ({
  _2020: await getSpotify.playlist(playlist._2020),
  _2021: await getSpotify.playlist(playlist._2021),
  _2022: await getSpotify.playlist(playlist._2022),
});

export default getSpotify.data;
