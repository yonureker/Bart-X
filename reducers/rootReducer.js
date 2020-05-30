import { combineReducers } from "redux";
import userLocationReducer from "./userLocationReducer";
import trainDepartureReducer from "./trainDepartureReducer";
import searchTextReducer from './searchTextReducer';
import searchBarReducer from "./searchBarReducer";

const rootReducer = combineReducers({
  userLocation: userLocationReducer,
  trainDepartures: trainDepartureReducer,
  searchText: searchTextReducer,
  searchBar: searchBarReducer
});

export default rootReducer;
