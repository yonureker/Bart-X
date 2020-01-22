import { combineReducers } from "redux";
import locationReducer from './locationReducer';
import stationReducer from './stationReducer';

const rootReducer = combineReducers({
  location: locationReducer,
  stationData: stationReducer
})

export default rootReducer;