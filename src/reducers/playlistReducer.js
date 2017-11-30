const playlistReducer = (state, action) => {
  switch (action.type) {
    case "Update Playlist":
      return {
        ...state,
        playlist: {...state.playlist/*make sure the ... works*/
                    content: action.playlistContent}
      };
      case "Load Music Set Titles":
        return {
          ...state,
          titles
        };
      case "Load Music Set":
        return {
          ...state,
          musicSetObj
        };

    default:
      return state;
  }
};
export default reducer;
