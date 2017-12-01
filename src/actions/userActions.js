// (Action) Login
// (Action) Logout
// (Action) No user profile pages allowed!

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
//spotify logout not needed? at least for now
