/**
 * Created by Kash.C on 10/24/18.
 */
import * as actions from "../actions/action-types";

export function controlProgress(isShowing) {
  return {
    type: actions.PROGRESS,
    progress: isShowing
  };
}
export function setToken(token) {
  return {
    type: actions.SET_TOKEN,
    token: token
  };
}
export function setLoggedIn(isLoggedIn) {
  return {
    type: actions.SET_LOGIN_STATUS,
    isLoggedIn: isLoggedIn
  };
}
