const initialState = {
  username: "gabe",
  error: "",
  userId: "5a205111477de213a0c7be43"
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HeyDj Login":
      return {
        ...state,
        userId: action.userId,
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
