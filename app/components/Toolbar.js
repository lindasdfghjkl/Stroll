'use strict';
import React, {Component} from 'react';
import {
    ReactNative, 
    Modal, 
    View, 
    Text, 
    TouchableHighlight,
    TextInput,
    Keyboard,
    KeyboardAvoidingView
  } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Styles
import toolbarStyle from '../styles/toolbarStyle';
import addPinModalStyle from '../styles/addPinModalStyle';

import Feed from '../../app/screens/Feed';
//const { StyleSheet, Text, View} = ReactNative;

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalVisible: false,
      text: '', 
    };
  }
  // state = {
  //   modalVisible: false,
  // };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setTextEmpty() {
    this.setState({text: ''});
  }

  closeModal() {
    this.setModalVisible(!this.state.modalVisible);
    this.setTextEmpty();
  }


  render() {
    return (
      <View>
        {/* Modal to add a new note/pin */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <KeyboardAvoidingView behavior="padding" style={addPinModalStyle.modalContent}>
            <KeyboardAvoidingView behavior="padding" style={addPinModalStyle.modal}>
              <View style={addPinModalStyle.modalHeader}>
                <Text style={addPinModalStyle.modalTitle}>Add Pin</Text>
                <Ionicons
                  name="ios-close" 
                  size={50} color="#1EC142" 
                  style={addPinModalStyle.closeIcon}
                  onPress={() => {
                    this.closeModal();
                  }}
                />
              </View>
              <TextInput
                style={addPinModalStyle.noteInput}
                placeholder={'Enter note here'}
                onChangeText={(text) => this.setState({text})}
                onSubmitEditing={Keyboard.dismiss}
                value={this.state.text}
                multiline={true}
              />
              <Button
                  color="white"
                  title="Post"
                  buttonStyle={addPinModalStyle.postButton}
              />
            </KeyboardAvoidingView>
          </KeyboardAvoidingView>
        </Modal>

        {/* Main Toolbar with two icons */}
        <View style={toolbarStyle.navbar}>
          <Ionicons name="ios-list" size={50} color="white"/>
          <Ionicons name="ios-add-circle" size={50} color="white" onPress={() => {
            this.setModalVisible(true);
          }}/>
        </View>
      </View>
    );
  }
}


module.exports = Toolbar;
