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
    KeyboardAvoidingView,
    ScrollView
  } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Header, Content, Card, CardItem, Body, Left, Right } from 'native-base';

// Styles
import toolbarStyle from '../styles/toolbarStyle';
import addPinModalStyle from '../styles/addPinModalStyle';
import feedModalStyle from '../styles/feedModalStyle';


class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      addPinModalVisible: false,
      feedModalVisible: false,
      textValue: '', 
    };

    this.itemsRef = this.props.items;
  }
  

  setAddPinModalVisible(visible) {
    this.setState({addPinModalVisible: visible});
  }

  setFeedModalVisible(visible) {
    this.setState({feedModalVisible: visible});
  }

  closeAddPinModal() {
    this.setAddPinModalVisible(!this.state.addPinModalVisible);
  }

  closeFeedModal() {
    this.setFeedModalVisible(!this.state.feedModalVisible);
  }

  openAddPinModal(){
    // Reset the text box to empty, and when that is done open the modal
    this.setState({textValue: ''}, () => this.setAddPinModalVisible(true));
  }

  openFeedModal(){
    this.setFeedModalVisible(true);
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
    this.closeAddPinModal();
  }



  render() {
    return (
      <View>
        {/* Modal to add a new note/pin */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addPinModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <KeyboardAvoidingView behavior="padding" style={addPinModalStyle.modalContent}>
            <KeyboardAvoidingView behavior="padding" style={addPinModalStyle.modal}>
              <View style={addPinModalStyle.modalHeader}>
                <Text style={addPinModalStyle.modalTitle}>Add Pin</Text>
                <Ionicons
                  name="ios-close-circle-outline" 
                  size={30} color="#8E8E93" 
                  style={addPinModalStyle.closeIcon}
                  onPress={() => {
                    this.closeAddPinModal();
                  }}
                />
              </View>
              <TextInput
                style={addPinModalStyle.noteInput}
                placeholder={'Enter note here'}
                placeholderTextColor='white'
                onChangeText={(text) => this.setState({textValue: text})}
                onEndEditing={(e) =>
                  {
                    this.setState({textValue: e.nativeEvent.text})
                  }
                }
                onSubmitEditing={Keyboard.dismiss}
                value={this.state.textValue}
                multiline={true}
                keyboardAppearance={'dark'}
              />
              <Ionicons 
                name="ios-paper-plane" 
                size={35} 
                color="#4AE779" 
                onPress={() => {this.sendNoteToDB()}}
                style={addPinModalStyle.postIcon}
              />
            </KeyboardAvoidingView>
          </KeyboardAvoidingView>
        </Modal>

        

        {/* Feed Modal */}
        {/* Hard Coded */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.feedModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={feedModalStyle.modalContent}>
            <View style={feedModalStyle.modal}>
              <View>
                  <Ionicons 
                    name="ios-arrow-down" 
                    color="#EFEFF4" 
                    size={50} 
                    onPress={() => {
                      this.closeFeedModal();
                    }}
                    style={feedModalStyle.closeIcon}
                  />
                 
                 <ScrollView style={{height: '100%'}}>
                    <Card style={feedModalStyle.cardStyle}>
                      <CardItem style={feedModalStyle.cardItemStyle}>
                        <Body>
                          <Text style={feedModalStyle.cardTextStyle}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </Text>
                        </Body>
                        <Ionicons name="ios-arrow-forward" color="#4AE779" size={30} style={feedModalStyle.iconStyle}/>
                      </CardItem>
                    </Card>

                    <Card style={feedModalStyle.cardStyle}>
                      <CardItem style={feedModalStyle.cardItemStyle}>
                        <Body>
                          <Text style={feedModalStyle.cardTextStyle}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </Text>
                        </Body>
                        <Ionicons name="ios-arrow-forward" color="#FF32B1" size={30} style={feedModalStyle.iconStyle}/>
                      </CardItem>
                    </Card>

                    <Card style={feedModalStyle.cardStyle}>
                      <CardItem style={feedModalStyle.cardItemStyle}>
                        <Body>
                          <Text style={feedModalStyle.cardTextStyle}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </Text>
                        </Body>
                        <Ionicons name="ios-arrow-forward" color="#4B73FF" size={30} style={feedModalStyle.iconStyle}/>
                      </CardItem>
                    </Card>
                  </ScrollView>
                  
                </View>
            </View>
          </View>
        </Modal>


        {/* Main Toolbar with two icons */}
        <View style={toolbarStyle.navbar}>
          <Ionicons name="ios-list" size={50} color="#4AE779" onPress={() => {
            this.openFeedModal();
          }}/>
          <Ionicons name="ios-add-circle-outline" size={50} color="#4AE779" onPress={() => {
            this.openAddPinModal();
          }}/>
        </View>
      </View>
    );
  }
}


module.exports = Toolbar;
