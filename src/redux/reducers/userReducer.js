import * as types from "../constants";

const initialState = {
  details: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
      case types.SET_CHANGE_PASSWORD:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
}
