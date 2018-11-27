/**
 * Created by saionara1 on 7/21/17.
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
