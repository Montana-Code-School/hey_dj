<<<<<<< HEAD
const initialState = {
  username: ""
};

const userReducer = (state = initialState, action) => {
=======
const userReducer = (state, action) => {
>>>>>>> c43d99cfc67c02f9563541bd5b43667ff0829b02
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
