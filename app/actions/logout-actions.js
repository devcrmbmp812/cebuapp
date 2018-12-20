/**
 * Created by Kash.C on 10/21/18.
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