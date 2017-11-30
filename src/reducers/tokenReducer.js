export const setTokenToState = (state = {}, action) => {
  switch (action.type) {
    case "setToken":
      return {
        ...state,
        spotifyToken: action.spotifyToken
      };

    default:
      return state;
  }
};

export default setTokenToState;
