import * as types from "../constants";

export function setUserDetails(details) {
  return {
    type: types.SET_USER_DETAILS,
    payload: details,
  };
}

export const setChangePassword = (body) => ({
  type: types.SET_CHANGE_PASSWORD,
  payload: body,
})
