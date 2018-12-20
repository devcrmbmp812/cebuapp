/**
 * Created by Kashy.C on 12/01/18.
 */

// @flow
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Button, View, Spinner } from "native-base";

import dimens from "../resources/dimens";
import colors from "../resources/colors";
import consts from "../const";
import strings from "../resources/strings";

const { height, width } = Dimensions.get("window");
export default class QuickPickComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      selected: 0,
      firstValue:0,
      secondValue:0,
      thirdValue:0
    };
  }
  _onPress = () => {
    const { navigate } = this.props.navigation;
    navigate(consts.REPOSITORY_DETAILS_SCREEN, {
      repository: this.props.repository
    });
  };
  selectFirst = () => {
    this.setState({ selected: 0 });
  };
  selectSecond = () => {
    this.setState({ selected: 1 });
  };
  onStartPress() {}
  onStopPress() {}
  onSubmitPress = () => {
    alert(this.state.firstValue);
  }
  render() {
    return (
      <View style={itemStyles.itemStyle}>
        <View style={{ alignItems: "center" }}>
          <Text style={itemStyles.generatorStyle}>Generator</Text>
        </View>
        <View style={itemStyles.flexRowStyle}>
          <TouchableOpacity onPress={this.selectFirst}>
            <View style={itemStyles.viewStyle}>
              <View style={itemStyles.outerCircleStyle}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor:
                      this.state.selected == 0 ? "black" : "white"
                  }}
                />
              </View>
              <Text style={itemStyles.radioTextStyle}>Straight</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectSecond}>
            <View style={itemStyles.viewStyle}>
              <View style={itemStyles.outerCircleStyle}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor:
                      this.state.selected == 0 ? "white" : "black"
                  }}
                />
              </View>
              <Text style={itemStyles.radioTextStyle}>Rambolito</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", paddingLeft: width / 6 }}>
          <Button
            style={itemStyles.buttonStartStyle}
            onPress={this.onStartPress}
          >
            <Text style={itemStyles.buttonTextStyle}>{strings.start}</Text>
          </Button>
          <Button style={itemStyles.buttonStopStyle} onPress={this.onStopPress}>
            <Text style={itemStyles.buttonTextStyle}>{strings.stop}</Text>
          </Button>
        </View>
        <View style={itemStyles.container}>
          <View style={itemStyles.circleimage}>
            <TextInput style={itemStyles.numberText} keyboardType="numeric" value={`${this.state.firstValue}`} maxLength={1} onChangeText={(text)=>{this.setState({firstValue:text})}}/>
          </View>
          <View style={itemStyles.circleimage}>
          <TextInput style={itemStyles.numberText} keyboardType="numeric" value={`${this.state.secondValue}`} maxLength={1} onChangeText={(text)=>{this.setState({secondValue:text})}}/>
          </View>
          <View style={itemStyles.circleimage}>
          <TextInput style={itemStyles.numberText} keyboardType="numeric" value={`${this.state.thirdValue}`} maxLength={1} onChangeText={(text)=>{this.setState({thirdValue:text})}}/>
          </View>
        </View>
        <Button style={itemStyles.buttonSubmitStyle} onPress={this.onSubmitPress}>
          <Text style={itemStyles.buttonBoldStyle}>{strings.submit}</Text>
        </Button>
        <Button style={itemStyles.buttonSubmitStyle}>
          <Text style={itemStyles.buttonBoldStyle}>{strings.credits}</Text>
        </Button>
        <Button style={itemStyles.buttonSubmitStyle}>
          <Text style={itemStyles.buttonBoldStyle}>{strings.clearall}</Text>
        </Button>
      </View>
    );
  }
}

const itemStyles = {
  radioTextStyle: { paddingLeft: width / 40, fontSize: 16 },
  outerCircleStyle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#ff00ff",
    justifyContent: "center",
    alignItems: "center"
  },
  flexRowStyle: { flexDirection: "row" },
  generatorStyle: {
    fontStyle: "italic",
    color: "grey",
    fontSize: 48,
    fontWeight: "bold"
  },
  viewStyle: { flexDirection: "row", paddingLeft: width / 5 },
  buttonBoldStyle: {
    color: "black",
    fontSize: dimens.buttontexxt_size
  },
  buttonTextStyle: {
    color: "white",
    fontSize: dimens.buttontexxt_size
  },
  buttonStartStyle: {
    marginTop: dimens.margin_medium,
    marginHorizontal: dimens.margin_large,
    borderRadius: 20,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: colors.circleColor
  },
  buttonSubmitStyle: {
    marginTop: dimens.margin_medium,
    marginHorizontal: dimens.margin_large,
    borderRadius: 20,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: colors.circleColor,
    borderWidth: 1
  },
  buttonStopStyle: {
    marginTop: dimens.margin_medium,
    marginHorizontal: dimens.margin_large,
    borderRadius: 20,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "blue"
  },
  numberText: {
    color: "white",
    fontSize: 28
  },
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: width / 10,
    paddingRight: width / 10,
    height: 100,
    // paddingTop: width / 40,
    backgroundColor: "#ecf0f1"
  },
  circleimage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: colors.circleColor,
    justifyContent: "center",
    alignItems: "center"
  },
  itemStyle: {
    flex: 1,
    backgroundColor: "white"
  },
  itemTitleStyle: {
    color: "black",
    fontSize: 20,
    padding: 10
  },
  itemDescriptionStyle: {
    color: "darkgrey",
    fontSize: 17,
    paddingLeft: 10
  }
};
