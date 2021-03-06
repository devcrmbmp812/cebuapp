/**
 * Created by kash.C on 10/20/18.
 */
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import configureStore from "../store/configureStore.js";
import {StackNavigator} from "react-navigation";

import Login from "./Login";
import Signup from "./Signup";
import DrawResult from "./DrawResult";
import RepositoriesList from "./RepositoriesList";
import RepositoryDetails from "./RepositoryDetails";

const store = configureStore();

const Routes = {
  Login: {screen: Login},
  Signup: {screen: Signup},
  DrawResult: {screen: DrawResult},
  RepositoriesList: {screen: RepositoriesList},
  RepositoryDetails: {screen: RepositoryDetails}
};

const Navigator = StackNavigator(Routes, {
  headerMode: 'screen'
});

export class Navigation extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }

}

function mapStateToProps(state) {
  return {
    login: state.login,
    signup: state.signup
  }
}
export default connect(
  mapStateToProps)(Navigation);
