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
    case "Error Message":
      return {
        ...state,
        error: action.message
      };
    default:
      return state;
  }
};
export default userReducer;
