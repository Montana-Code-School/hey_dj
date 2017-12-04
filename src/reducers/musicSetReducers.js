const initialState = {
  musicSet: {
    customValues: {}
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
      return {
        ...state,
        spotifyPlaylists: action.spotifyPlaylists
      };
    case "Update_Spotify_Title":
      return {
        ...state,
        spotifyTitle: action.spotifyTitle
      };
    default:
      return state;
  }
};
export default reducer;
