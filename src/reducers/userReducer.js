const reducer = (state, action) => {
  switch (action.type) {
    case "HeyDj Login":
      return {
        ...state,
        username: action.username
      };

    case "Logout":
      return {
        ...state,
        username: ""
      };
    case "Spotify Login":
      return {
        ...state,
        username: action.username,
        spotifyToken: action.spotifyToken
      };
    default:
      return state;
  }
};
export default reducer;
