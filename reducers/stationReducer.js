const initialState = [];

const stationReducer = (state = initialState , action) => {
  switch(action.type) {
    case 'RECEIVE_STATION_DATA':
      return action.payload
    default:
      return state;
  }
}

export default stationReducer;