// (Action) Editing custom field headers
// (Action) Editing custom field content
// (Action) Load music set from spotify

// Music set will be immutable
// Custom fields will be dynamic

export function editMusicSetCustomFields(musicSetCustomFields) {
  return {
    type: "Edit_Music_Set_Custom_Field",
    musicSetCustomFields
  };
}

export function editMusicSetCustomFieldValue(editField, newValue) {
  let newField = { editField: editField, newValue: newValue };
  return {
    type: "Edit_Music_Set_Custom_Field_Value",
    newField
  };
}
