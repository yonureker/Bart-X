const initialState = false;

const searchBarReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SHOW_SEARCH_BAR":
      return true;
    case "HIDE_SEARCH_BAR":
      return false;
    default:
      return state;
  }
}

export default searchBarReducer;