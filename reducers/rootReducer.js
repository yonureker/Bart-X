import { combineReducers } from "redux";

import userLocationReducer from './userLocationReducer';
import trainDepartureReducer from './trainDepartureReducer';
import stationLocationReducer from "./stationLocationReducer";

const rootReducer = combineReducers({
  userLocation: userLocationReducer,
  trainDepartures: trainDepartureReducer,
  stationLocations: stationLocationReducer
})

export default rootReducer;