/**
 * Created by Kash.C on 11/2/18.
 */

// @flow
import React from "react";
import {
  Text,
  TouchableHighlight,
  View,
  Image,
  Dimensions
} from "react-native";
import consts from "../const";
//import circleImage from "../images/circle.png";
import logoImage from "../images/logo.png";
const { height, width } = Dimensions.get("window");
export default class RepositoryListItem extends React.PureComponent {
  _onPress = () => {
    const { navigate } = this.props.navigation;
    navigate(consts.REPOSITORY_DETAILS_SCREEN, {
      repository: this.props.repository
    });
  };

  render() {
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={itemStyles.itemStyle} {...this.props}>
          <View style={itemStyles.rightpanel}>
            <Image
              style={itemStyles.logoimage}
              resizeMode='center'
              source={logoImage}
            />
          </View>
          <View style={itemStyles.leftpanel}>
            <Text style={itemStyles.itemTitleStyle}>{this.props.title}</Text>
            <View style={itemStyles.container}>
              <View style={itemStyles.circleimage}>
                <Text style={{color:'white'}}>5</Text>
              </View>
              <View style={itemStyles.circleimage}>
                <Text style={{color:'white'}}>5</Text>
              </View>
              <View style={itemStyles.circleimage}>
                <Text style={{color:'white'}}>5</Text>
              </View>
            </View>
            <Text style={itemStyles.itemDescriptionStyle}>
              {this.props.title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const itemStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: width / 40,
    paddingRight: width / 40,
    paddingTop: width / 40,
    backgroundColor: "#ecf0f1"
  },
  rightpanel: {
    paddingLeft: width/40,
  },
  leftpanel: {
    paddingLeft: width/30,
  },
  logoimage: {
    height: 70,
    width: 70,
    flex: 1,    
  },
  circleimage: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor:'#ff00ff',
    justifyContent: 'center',
    alignItems: 'center'

  },
  itemStyle: {
    marginHorizontal: 4,
    borderColor: "lightgrey",
    elevation: 4,
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
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
