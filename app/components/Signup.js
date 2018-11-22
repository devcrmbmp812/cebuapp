/**
 * Created by saionara1 on 6/21/17.
 */

//@flow
import React, { Component } from "react";
import { Image, StatusBar, Text } from "react-native";
import { Button, Container, Content, View, Spinner } from "native-base";
import colors from "../resources/colors";
import ValidationTextInput from "./ValidationTextInput";
import { connect } from "react-redux";
import consts from "../const";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import * as actions from "../actions/action-types";
import styles from "../resources/styles";
import * as Toast from "@remobile/react-native-toast";
import * as loginActions from "../actions/login-actions";
import * as rootActions from "../actions/root-actions";
import backImage from "../images/home.png";
import logoImage from "../images/logo.png";

export class Signup extends Component {
  password: string;
  email: string;
  isGoneAlready: boolean;

  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.password = "";
    this.email = "";
    this.isGoneAlready = false;
  }

  componentDidMount() {
    this.props.dispatch(rootActions.controlProgress(false));
  }

  componentDidUpdate() {
    this.proceed();
  }

  proceed() {
    const loginError = this.props.login.get("loginError");
    const isLoggedIn = this.props.login.get("isLoggedIn");

    if (
      this.isObject(loginError) &&
      loginError &&
      this.isObject(loginError.message) &&
      loginError.message
    ) {
      Toast.showShortBottom(loginError.message);
      this.props.dispatch(loginActions.setError({}));
    } else if (isLoggedIn && !this.isGoneAlready) {
      this.props.navigation.navigate(consts.REPOSITORY_LIST_SCREEN);
      this.isGoneAlready = true;
    }
  }

  isObject(obj) {
    return typeof obj === "object";
  }

  //noinspection JSMethodCanBeStatic
  render() {
    return (
      <Container style={loginStyles.containerStyle}>
        <StatusBar style={loginStyles.statusBarStyle} />
        <Image
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0
          }}
          source={backImage}
        />
        <Content contentContainerStyle={loginStyles.contentStyle}>
          <Text style={loginStyles.signupTextStyle}>{strings.sign_up}</Text>
          <ValidationTextInput
            validate={this.validateEmail}
            label={strings.github_email}
            onChangeText={text => (this.email = text)}
            style={loginStyles.emailStyle}
            color={colors.accentColor}
          />
          <ValidationTextInput
            secureTextEntry={true}
            validate={this.validatePassword}
            onChangeText={text => (this.password = text)}
            label={strings.password}
            style={loginStyles.emailStyle}
            color={colors.accentColor}
          />
          <Button style={loginStyles.buttonStyle} onPress={this.onLoginPress}>
            <Text style={loginStyles.buttonTextStyle}>{strings.sign_in}</Text>
          </Button>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 100
            }}
          />
          <Text style={loginStyles.donotaccountTextStyle}>
            {strings.donot_account}
            <Text style={loginStyles.signupTextStyle} onPress={this.onSignupPress}>
              {strings.sign_up}
            </Text>
          </Text>
          {this.renderProgress()}
        </Content>
      </Container>
    );
  }

  renderProgress() {
    if (this.props.root.get("progress")) {
      return this.spinner();
    } else {
      return null;
    }
  }

  spinner() {
    return (
      <Spinner
        color={colors.accentColor}
        animating={true}
        size={"large"}
        style={styles.progressStyle}
      />
    );
  }

  validateEmail = (text: string): boolean => consts.EMAIL_REGEX.test(text);

  validatePassword = (text: string): boolean =>
    text.length >= consts.MIN_PASSWORD_LENGTH;

  onLoginPress = () =>
    this.props.dispatch(loginActions.login(this.email, this.password));

  onSignupPress = () =>
    this.props.navigation.navigate(consts.SIGNUP_SCREEN);
}

const loginStyles = {
  containerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  contentStyle: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: dimens.margin_large
  },
  statusBarStyle: {
    backgroundColor: colors.primaryColor
  },
  emailStyle: {
    alignSelf: "stretch"
  },
  buttonStyle: {
    marginTop: dimens.margin_medium,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: colors.accentColor
  },
  buttonTextStyle: {
    color: "white",
    fontSize: dimens.text_size_button
  },
  donotaccountTextStyle: {
    color: "black",
    fontSize: dimens.text_size_label
  },
  signupTextStyle: {
    color: "red",
    fontSize: dimens.text_size_label
  },
  imageStyle: {
    width: 120,
    height: 120
  }
};

const mapStateToProps = state => ({
  login: state.get("login"),
  root: state.get("root")
});

export default connect(mapStateToProps)(Signup);
