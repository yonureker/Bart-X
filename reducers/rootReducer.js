import { combineReducers } from "redux";

import userLocationReducer from "./userLocationReducer";
import trainDepartureReducer from "./trainDepartureReducer";

const rootReducer = combineReducers({
  userLocation: userLocationReducer,
  trainDepartures: trainDepartureReducer
});

export default rootReducer;
