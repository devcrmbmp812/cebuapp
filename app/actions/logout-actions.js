/**
 * Created by saionara1 on 7/21/17.
 */
import * as actions from "../actions/action-types";

export function logout(token) {
  return {
    type: actions.LOGOUT_ACTION,
    token: token
  }
}

export function setLogoutSuccess() {
  return {type: actions.LOGOUT_SUCCESS}
}

export function setError(error) {
  return {
    type: actions.LOGOUT_ERROR,
    error: error
  }
}