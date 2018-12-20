/**
 * Created by Travis on 10/28/18.
 */

import { autoRehydrate, persistStore } from "redux-persist-immutable";
import { combineReducers } from "redux-immutable";
import createActionBuffer from "redux-action-buffer";
import { REHYDRATE } from "redux-persist/constants";
import Immutable from "immutable";
import { applyMiddleware, compose, createStore } from "redux";
import { AsyncStorage } from "react-native";
import createSagaMiddleware from "redux-saga";

import loginReducer from "../reducers/loginReducer";
import rootReducer from "../reducers/rootReducer";
import listReducer from "../reducers/listReducer";
import signupReducer from "../reducers/signupReducer";
import detailsReducer from "../reducers/detailsReducer";

import * as loginSaga from "../saga/login-saga";
import * as signupSaga from "../saga/signup-saga";
import * as logoutSaga from "../saga/logout-saga";
import * as listSaga from "../saga/list-saga";
import * as detailsSaga from "../saga/details-saga";

const combinedReducers = combineReducers({
  root: rootReducer,
  login: loginReducer,
  signup: signupReducer,
  list: listReducer,
  details: detailsReducer
});

const initialState = new Immutable.Map({
  root: Immutable.Map({
    loginError: {},
    username: "",
    password: "",
    progress: undefined,
    token: "",
    isLoggedIn: false,
    authorizationId: ""
  }),
  signup: Immutable.Map({
    isLoggedIn: false,
    token: "",
    signupError: {},
    username: "",
    authorizationId: ""
  }),
  login: Immutable.Map({
    isLoggedIn: false,
    token: "",
    loginError: {},
    username: "",
    password: "",
    authorizationId: ""
  }),
  list: Immutable.Map({
    data: []
  }),
  details: Immutable.Map({
    readMe: ""
  })
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combinedReducers,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, createActionBuffer(REHYDRATE)),
      autoRehydrate({ log: true })
    )
  );
  
  persistStore(store, {
    storage: AsyncStorage,
    blacklist: ["root"]
  });
  return {
    ...store,
    runSaga: [
      sagaMiddleware.run(loginSaga.loginFlow),
      sagaMiddleware.run(signupSaga.signupFlow),
      sagaMiddleware.run(listSaga.listFlow),
      sagaMiddleware.run(detailsSaga.detailsFlow),
      sagaMiddleware.run(logoutSaga.logoutFlow)
    ]
  };
}
