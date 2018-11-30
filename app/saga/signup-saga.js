/**
 * created by Kashy.C 26/11/2018
 *
 */
import { call, put, take } from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as signupActions from "../actions/signup-actions";
import * as rootActions from "../actions/root-actions";

function* newcreate(firstname, lastname, username, password) {
  try {
    const token = yield call(
      Api.newcreateUser,
      firstname,
      lastname,
      username,
      password
    );
    if (token && !token.message) {
      yield put(signupActions.setSignupSuccess(token, username, password));
      yield put(rootActions.setToken(token));
      return token;
    } else {
      yield put(signupActions.setError(token));
      return undefined;
    }
  } catch (error) {
    yield put(signupActions.setError(error));
  }
}

export function* signupFlow() {
  while (true) {
    const { firstname, lastname, username, password } = yield take(
      actions.SIGNUP_ACTION
    );
    yield put(rootActions.controlProgress(true));
    yield call(newcreate, firstname, lastname, username, password);
    yield put(rootActions.controlProgress(false));
  }
}
