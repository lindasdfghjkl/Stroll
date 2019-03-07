'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createAppContainer } from 'react-navigation';
//const styles = require('../../styles.js')
import toolbarStyle from '../styles/toolbarStyle';
import Feed from '../../app/screens/Feed';
const { StyleSheet, Text, View} = ReactNative;

class Toolbar extends Component {
  render() {
    return (
      <View>
        <View style={toolbarStyle.navbar}>
          <Ionicons name="ios-list" size={50} color="white"/>
          <Ionicons name="ios-add-circle" size={50} color="white" onPress={this.props.onPress}/>
        </View>
      </View>
    );
  }
}


module.exports = Toolbar;
