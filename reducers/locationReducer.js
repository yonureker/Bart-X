const initialState = {
  coords: { latitude: null, longitude: null },
};

const locationReducer = (state = initialState , action) => {
  switch(action.type) {
    case 'RECEIVE_LOCATION':
      return {...state, location: action.payload}
    default:
      return state;
  }
}

export default locationReducer;