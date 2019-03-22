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
    ScrollView,
    Image
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
      titleValue: '',
      messageValue: '',
      
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
    this.setState({titleValue: '', messageValue: ''}, () => this.setAddPinModalVisible(true));
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
          this.itemsRef.push({ title: this.state.titleValue, message: this.state.messageValue, location: coordinates });
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
                <Text style={addPinModalStyle.modalTitle}>Add Note</Text>
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
                    style={addPinModalStyle.titleInput}
                    placeholder={'Enter note here'}
                    placeholderTextColor='white'
                    onChangeText={(text) => this.setState({ titleValue: text })}
                    onEndEditing={(e) =>
                        {
                        this.setState({ titleValue: e.nativeEvent.text })
                        }
                    }
                    onSubmitEditing={Keyboard.dismiss}
                    value={this.state.titleValue}
                    multiline={true}
                    keyboardAppearance={'dark'}
              />
              <TextInput
                style={addPinModalStyle.noteInput}
                placeholder={'Enter note here'}
                placeholderTextColor='white'
                onChangeText={(text) => this.setState({ messageValue: text})}
                onEndEditing={(e) =>
                  {
                    this.setState({ messageValue: e.nativeEvent.text})
                  }
                }
                onSubmitEditing={Keyboard.dismiss}
                value={this.state.messageValue}
                multiline={true}
                keyboardAppearance={'dark'}
              />
              <TouchableHighlight onPress={() => {this.sendNoteToDB()}}>
                  <Image
                    style={addPinModalStyle.postIcon}
                    source={require('../../assets/icon-assets/enabled-post-button-3x.png')}
                  />
              </TouchableHighlight>
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
                            Study group for BIO 100 is meeting
                            tonight at "The Hub," 7PM.
                          </Text>
                        </Body>
                        <Ionicons name="ios-arrow-forward" color="#4AE779" size={30} style={feedModalStyle.iconStyle}/>
                      </CardItem>
                    </Card>

                    <Card style={feedModalStyle.cardStyle}>
                      <CardItem style={feedModalStyle.cardItemStyle}>
                        <Body>
                          <Text style={feedModalStyle.cardTextStyle}>
                            Try the vanilla iced chai tea at Cartel Coffee, it's SO GOOD!
                          </Text>
                        </Body>
                        <Ionicons name="ios-arrow-forward" color="#FF32B1" size={30} style={feedModalStyle.iconStyle}/>
                      </CardItem>
                    </Card>

                    <Card style={feedModalStyle.cardStyle}>
                      <CardItem style={feedModalStyle.cardItemStyle}>
                        <Body>
                          <Text style={feedModalStyle.cardTextStyle}>
                            "Music produces a kind of pleasure human nature can not fully appreciate until  ...
                          </Text>
                        </Body>
                        <Ionicons name="ios-arrow-forward" color="#4B73FF" size={30} style={feedModalStyle.iconStyle}/>
                      </CardItem>
                    </Card>

                    <Card style={feedModalStyle.cardStyle}>
                      <CardItem style={feedModalStyle.cardItemStyle}>
                        <Body>
                          <Text style={feedModalStyle.cardTextStyle}>
                            CASA is having 25% off drinks from 11pm to 2am ... LIT!
                          </Text>
                        </Body>
                        <Ionicons name="ios-arrow-forward" color="#4AE779" size={30} style={feedModalStyle.iconStyle}/>
                      </CardItem>
                    </Card>

                    <Card style={feedModalStyle.cardStyle}>
                      <CardItem style={feedModalStyle.cardItemStyle}>
                        <Body>
                          <Text style={feedModalStyle.cardTextStyle}>
                            Looking to make new friends on campus? Come hang out on the Hayden lawn 5-8!
                          </Text>
                        </Body>
                        <Ionicons name="ios-arrow-forward" color="#FF32B1" size={30} style={feedModalStyle.iconStyle}/>
                      </CardItem>
                    </Card>

                    <Card style={feedModalStyle.cardStyle}>
                      <CardItem style={feedModalStyle.cardItemStyle}>
                        <Body>
                          <Text style={feedModalStyle.cardTextStyle}>
                            Today is the beginning of a better life for all of us!
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
          <TouchableHighlight
            onPress={() => {
              this.openFeedModal();
            }}
          >
            <Image
              style={toolbarStyle.feedIcon}
              source={require('../../assets/icon-assets/unselected-home-2x.png')}
            />
          </TouchableHighlight>

          <Image
            style={toolbarStyle.feedIcon}
            source={require('../../assets/icon-assets/selected-find-my-loctaion-3x.png')}
          />

          <TouchableHighlight
            onPress={() => {
              this.openAddPinModal();
            }}
          >
            <Image
              style={toolbarStyle.feedIcon}
              source={require('../../assets/icon-assets/unselected-add-note-3x.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


module.exports = Toolbar;
