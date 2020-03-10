const initialState = [];

const trainDepartureReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_TRAIN_DEPARTURE_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default trainDepartureReducer;
