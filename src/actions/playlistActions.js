// (Action) Update Playlist
// (Action) Load music set titles from mongoDB
// (Action) Load music set from mongoDB
export function updatePlaylistContent(playlistContent) {
  return {
    type: "Update Playlist",
    playlistContent
  };
}

export function loadMusicSetTitles(titles) {
  return {
    type: "Load Music Set Titles",
    titles
  };
}

export function loadMusicSet(musicSetObj) {
  return {
    type: "Load Music Set",
    musicSetObj
  };
}
