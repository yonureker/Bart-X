import { combineReducers } from "redux";
import userLocationReducer from "./userLocationReducer";
import searchBarReducer from "./searchBarReducer";

const rootReducer = combineReducers({
  userLocation: userLocationReducer,
  searchBar: searchBarReducer
});

export default rootReducer;
