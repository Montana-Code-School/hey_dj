const initialState = {
  musicSet: {
    customValues: {
      emotion: "angry",
      physiological: "basic"
    }
  },
  spotifyPlaylists: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Edit_Music_Set_Custom_Fields":
      return {
        ...state,
        musicSet: {
          customValues: action.musicSetCustomFields
        }
      };
    case "Edit_Music_Set_Custom_Field_Value":
      return {
        ...state,
        musicSet: {
          customValues: action.newCustomFields
        }
      };
    case "Load_Music_Set_From_Spotify":
      console.log("promise", action.promise);
      return {
        ...state,
        spotifyPlaylists: action.promise
      };
    default:
      return state;
  }
};
export default reducer;
