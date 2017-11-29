const initialState = {
  musicSet: {
    customValues: { emotion: "angry" }
  }
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
      let thing2 = state.musicSet.customValues[action.newField.editField];
      return {
        ...state,
        thing2: action.newField.newValue
      };
    default:
      return state;
  }
};
export default reducer;
