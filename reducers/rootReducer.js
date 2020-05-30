import { combineReducers } from "redux";
import userLocationReducer from "./userLocationReducer";
import searchTextReducer from "./searchTextReducer";
import searchBarReducer from "./searchBarReducer";

const rootReducer = combineReducers({
  userLocation: userLocationReducer,
  searchText: searchTextReducer,
  searchBar: searchBarReducer
});

export default rootReducer;
