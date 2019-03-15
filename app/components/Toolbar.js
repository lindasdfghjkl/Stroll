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


class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      modalVisible: false,
      textValue: '', 
    };

    this.itemsRef = this.props.items;
  }
  

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  closeModal() {
    this.setModalVisible(!this.state.modalVisible);
  }

  openModal(){
    // Reset the text box to empty, and when that is done open the modal
    this.setState({textValue: ''}, () => this.setModalVisible(true));
  }

  sendNoteToDB() {
    var coordinates = {};
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        console.log(coordinates);
        this.itemsRef.push({ message: this.state.textValue, location: coordinates });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000 },
    )
    this.closeModal();
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
                  size={50} color="#4AE779" 
                  style={addPinModalStyle.closeIcon}
                  onPress={() => {
                    this.closeModal();
                  }}
                />
              </View>
              <TextInput
                style={addPinModalStyle.noteInput}
                placeholder={'Enter note here'}
                onChangeText={(text) => this.setState({textValue: text})}
                onEndEditing={(e) =>
                  {
                    this.setState({textValue: e.nativeEvent.text})
                  }
                }
                onSubmitEditing={Keyboard.dismiss}
                value={this.state.textValue}
                multiline={true}
              />
              <Button
                  color="white"
                  title="Post"
                  buttonStyle={addPinModalStyle.postButton}
                  onPress={() => {this.sendNoteToDB()}}
              />
            </KeyboardAvoidingView>
          </KeyboardAvoidingView>
        </Modal>

        {/* Main Toolbar with two icons */}
        <View style={toolbarStyle.navbar}>
          <Ionicons name="ios-list" size={50} color="white"/>
          <Ionicons name="ios-add-circle" size={50} color="white" onPress={() => {
            this.openModal();
          }}/>
        </View>
      </View>
    );
  }
}


module.exports = Toolbar;
