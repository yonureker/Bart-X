const initialState = {
  coords: { latitude: null, longitude: null }
};

const userLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_USER_LOCATION":
      return {...state, coords: action.payload};
    default:
      return state;
  }
};

export default userLocationReducer;
