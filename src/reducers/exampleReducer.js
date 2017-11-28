const reducer = (state, action) => {
  switch (action.type) {
    case "Increment":
      console.log("incrementing", state);
      return {
        ...state,
        count: state.count + 1
      };
    case "Decrement":
      return {
        ...state,
        count: state.count - 1
      };
    case "Login":
      return {
        ...state,
        username: action.username
      };

    case "Logout":
      return {
        ...state,
        username: "",
        count: 0
      };
    case "LoadCounter":
      return {
        ...state,
        count: action.value
      };
    default:
      return state;
  }
};
export default reducer;
