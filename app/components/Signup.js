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
// import * as Toast from "@remobile/react-native-toast";
import * as signupActions from "../actions/signup-actions";
import * as rootActions from "../actions/root-actions";
import backImage from "../images/home.png";
import { is } from "immutable";

//const {width, height} = Dimensions.get('window');
export class Signup extends Component {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  isGoneAlready: boolean;

  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.firstname = "";
    this.lastname = "";
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
    let isLoggedIn = this.props.root.get("isLoggedIn");
    let token = this.props.root.get("token");
    if (!isLoggedIn && token != "") {
      this.props.dispatch(rootActions.setLoggedIn(true));
      this.props.navigation.navigate(consts.DRAWRESULT_SCREEN);
    } else if (token == "") {
      this.props.dispatch(rootActions.setLoggedIn(false));
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
            label={strings.firstname}
            onChangeText={text => (this.firstname = text)}
            style={loginStyles.emailStyle}
            color={colors.accentColor}
          />
          <ValidationTextInput
            validate={this.validateEmail}
            label={strings.lastname}
            onChangeText={text => (this.lastname = text)}
            style={loginStyles.emailStyle}
            color={colors.accentColor}
          />
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
          <Button style={loginStyles.buttonStyle} onPress={this.onSignupPress}>
            <Text style={loginStyles.buttonTextStyle}>{strings.sign_up}</Text>
          </Button>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1
            }}
          />
          <Text style={loginStyles.donotaccountTextStyle}>
            {strings.already_account}
            <Text
              style={loginStyles.loginTextStyle}
              onPress={this.onSigninPress}
            >
              {strings.sign_in}
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

  onSignupPress = () => {
    this.props.dispatch(
      signupActions.signup(
        this.firstname,
        this.lastname,
        this.email,
        this.password
      )
    );
  };

  onSigninPress = () => {
    this.props.navigation.navigate(consts.LOGIN_SCREEN);
  };
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
    marginHorizontal: dimens.margin_medium
  },
  statusBarStyle: {
    backgroundColor: colors.primaryColor
  },
  emailStyle: {
    alignSelf: "stretch",
    marginHorizontal: dimens.margin_large
  },
  buttonStyle: {
    marginTop: dimens.margin_small,
    marginHorizontal: dimens.margin_large,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: colors.accentColor
  },
  buttonTextStyle: {
    color: "white",
    fontSize: dimens.buttontexxt_size
  },
  donotaccountTextStyle: {
    color: "black",
    fontSize: dimens.text_size_label
  },
  signupTextStyle: {
    color: "black",
    fontSize: dimens.text_size_Signup
  },
  loginTextStyle: {
    color: "red",
    fontSize: dimens.text_size_label
  },
  imageStyle: {
    width: 120,
    height: 120
  }
};

const mapStateToProps = state => ({
  signup: state.get("signup"),
  root: state.get("root")
});

export default connect(mapStateToProps)(Signup);
