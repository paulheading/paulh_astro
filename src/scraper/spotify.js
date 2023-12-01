import { string, playlist, id, secret, base } from "./spotify/variables.js";
import { get } from "../scripts/helpers.js";

const getSpotify = {};

const client = {
  token: base.token,
  id: id.client,
  secret: secret.client,
};

async function createAccessToken(details) {
  let { token, id, secret } = details;

  let data = await get.JSON(token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(id + ":" + secret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  let { access_token } = await data;

  return access_token;
}

getSpotify.token = () => createAccessToken(client);

function usefulTrackData({ track }) {
  let { name, artists, album, external_urls, popularity } = track;

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

getSpotify.playlist = async function (target) {
  let token = await getSpotify.token();

  let data = await get.JSON(string.playlist(target), {
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
  data.tracks = data.tracks.items.map(usefulTrackData);

  return data;
};

function oldTracks(track, year) {
  let { release_date } = track;

  let release_year = release_date.slice(0, 4);

  let match = year == release_year;

  return match;
}

function artistAndName(track) {
  let { artist, name } = track;

  return { artist: artist.name, name };
}

function thisYearOnly(tracks) {
  let date = new Date();

  let year = date.getFullYear();

  tracks = tracks.filter((track) => oldTracks(track, year));

  tracks = tracks.map(artistAndName);

  return tracks;
}

getSpotify.tracksThisYear = async function (target) {
  let playlist = await getSpotify.playlist(target);

  let { tracks } = await playlist;

  tracks = thisYearOnly(tracks);

  return tracks;
};

getSpotify.data = async () => ({
  _2020: await getSpotify.playlist(playlist._2020),
  _2021: await getSpotify.playlist(playlist._2021),
  _2022: await getSpotify.playlist(playlist._2022),
  _2023: await getSpotify.playlist(playlist._2023),
  _year: await getSpotify.tracksThisYear(playlist._year),
});

export default getSpotify.data;
