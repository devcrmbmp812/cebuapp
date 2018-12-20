/**
 * Created by Kash.C on 10/25/18.
 */
import * as actions from "../actions/action-types";

export function signup(firstname, lastname, email, password) {
  return {
    type: actions.SIGNUP_ACTION,
    firstname: firstname,
    lastname: lastname,
    username: email,
    password: password
  }
}

export function setError(error) {
  return {
    type: actions.SIGNUP_ERROR,
    error: error
  }
}

export function setSignupSuccess(token, username, password) {
  return {
    type: actions.SIGNUP_SUCCESS,
    token,
    username,
    password
  }
}
