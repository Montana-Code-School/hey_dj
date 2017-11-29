const initialState = {
  username: ""
};

const reducer = (state = initialState, action) => {
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
        spotifyToken: action.spotifyToken
      };
    default:
      return state;
  }
};
export default reducer;
