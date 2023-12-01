const id = {
  user: process.env.SPOTIFY_ID_USER,
  client: process.env.SPOTIFY_ID_CLIENT,
};

const playlist = {
  _2020: process.env.SPOTIFY_PLAYLIST_2020,
  _2021: process.env.SPOTIFY_PLAYLIST_2021,
  _2022: process.env.SPOTIFY_PLAYLIST_2022,
  _2023: process.env.SPOTIFY_PLAYLIST_2023,
  _year: process.env.SPOTIFY_PLAYLIST_YEAR,
};

const base = {
  token: "https://accounts.spotify.com/api/token",
  api: "https://api.spotify.com/v1",
};

const secret = {
  client: process.env.SPOTIFY_SECRET_CLIENT,
};

const string = {};

string.base = (target) => base.api + target;

string.playlist = (target) => string.base("/playlists/" + target);

export { string, id, playlist, base, secret };
