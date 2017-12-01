export const setSpotifySongsToState = (state = {}, action) => {
  switch (action.type) {
    case "Update Spotify Songs":
      return {
        ...state,
        spotifySongs: action.spotifySongs
      };

    default:
      return state;
  }
};

export default setSpotifySongsToState;
