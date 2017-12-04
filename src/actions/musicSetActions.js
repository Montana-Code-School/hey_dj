// (Action) Editing custom field headers
// (Action) Editing custom field content
// (Action) Load music set from spotify

// Music set will be immutable
// Custom fields will be dynamic

export function editMusicSetCustomFields(musicSetCustomFields) {
  return {
    type: "Edit_Music_Set_Custom_Fields",
    musicSetCustomFields
  };
}

export function editMusicSetCustomFieldValue(
  customFields,
  editField,
  newValue
) {
  let newCustomFields = customFields;
  newCustomFields[editField] = newValue;
  return {
    type: "Edit_Music_Set_Custom_Field_Value",
    newCustomFields
  };
}

export function loadMusicSetFromSpotify(spotifyPlaylists) {
  return {
    type: "Load_Music_Set_From_Spotify",
    spotifyPlaylists: spotifyPlaylists
  };
}
