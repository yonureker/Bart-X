const initialState = [];

const stationLocationReducer = (state = initialState , action) => {
  switch(action.type) {
    case 'RECEIVE_STATION_LOCATIONS':
      return action.payload;
    default:
      return state;
  }
}

export default stationLocationReducer;