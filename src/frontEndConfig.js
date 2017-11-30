export const clientId =
  process.env.SPOTIFY_CLIENT_ID || "aba9ab535c464ffb82414772c566057f";
export const redirectUri =
  process.env.SPOTIFY_REDIRECT_URI || "http://localhost:3000/";
export const scope = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-follow-modify",
  "user-follow-read",
  "user-library-read",
  "user-library-modify"
].join(" ");
