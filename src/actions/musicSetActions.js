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

export function loadMusicSetFromSpotify() {
  const request = new Request(`https://api.spotify.com/v1/me/playlists`, {
    headers: new Headers({
      Accept: "application/json",
      Authorization:
        "Bearer " +
        "BQBaQxcSkqT6Yavj6GwonU04lHeyHR635nsFcV4GEVd--lvzygHBhc_Erai7ojDcNRzXOjrYPmlPWefwmZ3KssvJYEwcg9BOWkO5bnXEdnvMFhcn8cKymDO_iZ_SVDhNlfnggyaWSHwlXoAHaAt_pOBC7JUKheWSmQ"
    })
  });
  let promise = fetch(request)
    .then(res => res.json())
    .then(res => res);
  return {
    type: "Load_Music_Set_From_Spotify",
    promise
  };
}
