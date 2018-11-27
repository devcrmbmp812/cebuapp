/**
 * create by Kashy.C on 11.27/2018
 * 
 */
import React, {Component} from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import consts from "../const";
import * as rootActions from "../actions/root-actions";
export default class DrawResult extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text>Hello DrawResult</Text>
        )
        
    }

    componentDidMount() {
        // this.props.dispatch(rootActions.controlProgress(false));
    }
}
