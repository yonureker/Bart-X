const initialState = '';

const searchTextReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SET_SEARCH_TEXT":
      return action.payload;
    case "RESET_SEARCH_TEXT":
      return action.payload;
    default:
      return state;
  }
}

export default searchTextReducer;