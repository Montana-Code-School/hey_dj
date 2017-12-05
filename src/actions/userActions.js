export function heyDjLogin(username, userId) {
  return {
    type: "HeyDj Login",
    username,
    userId
  };
}

export function spotifyLogin(spotifyToken) {
  return {
    type: "Spotify Login",
    spotifyToken
  };
}

export function logout() {
  return {
    type: "Logout"
  };
}
