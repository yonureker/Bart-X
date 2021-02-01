// const initialState = false;

const initialState = {
  query: '',
  display: false
}

const searchBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_SEARCH_BAR":
      return {...state, display: true};
    case "HIDE_SEARCH_BAR":
      return {...state, display: false};
    case "SET_SEARCH_TEXT":
      return {...state, query: action.payload}
    case "RESET_SEARCH_TEXT":
      return {...state, query: ''}
    default:
      return state;
  }
};

export default searchBarReducer;
