/**
 * Created by Kash.C on 11/29/18.
 */
import {call, put, take} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api";
import * as rootActions from "../actions/root-actions";
import * as listActions from "../actions/list-actions";

function* getList(token, page, limit) {
  try {
    const list = yield call(Api.getDrawresults, token, page, limit);
    //console.warn("list", list);
    if (list) {
      yield put(listActions.setListSuccess(list, page));
      return list;
    } else {
      yield put(listActions.setError(list));
      return undefined
    }
  } catch (error) {
    yield put(listActions.setError(error));
  }
}

export function* listFlow() {
  while (true) {
    const {token, page, limit} = yield take(actions.ACTION_REPOSITORIES_LIST);
    yield put(rootActions.controlProgress(true));
    yield call(getList, token, page, limit);
    yield put(rootActions.controlProgress(false));
  }
}