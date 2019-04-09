'use strict';
import React, {Component} from 'react';
import {
    ReactNative, 
    Modal, 
    View, 
    Text, 
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    StyleSheet
  } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Header, Content, Card, CardItem, Body, Left, Right } from 'native-base';
import {Expo, Font, Permissions, TaskManager, Location} from 'expo';

// Styles
import toolbarStyle from '../styles/toolbarStyle';
import addPinModalStyle from '../styles/addPinModalStyle';
import feedModalStyle from '../styles/feedModalStyle';

TaskManager.defineTask('GEO_TRACK_LOCATION', ({ data: { eventType, region }, error }) => {
    console.log("--- IN GEOFENCING TASK ---");
    if (error) {
        console.log('GEO_TRACK_LOCATION - ERROR ' + error.message);
        return;
    } else {
        //console.log("NO GEOFENCING ERROR");
    }


    if (eventType === Location.GeofencingEventType.Enter) {
        console.log('GEO_TRACK_LOCATION - ENTER: ', region );
    } else if (eventType === Location.GeofencingEventType.Exit) {
        console.log('GEO_TRACK_LOCATION - EXIT: ', region);
    }
});

TaskManager.defineTask('BACKGROUND_LOCATION_UPDATES_TASK', ({data, error}) => {
    console.log("--- IN LOCATION TASK ---");
    if(error) {
        console.log("ERROR");
    } else {
        //console.log(data);
    }
});

class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addPinModalVisible: false,
            feedModalVisible: false,
            fontLoaded: false,
            titleValue: '',
            messageValue: '',
            noteIsOpen: false,
            noteTitle: '',
            noteMessage: '',
            noteLocation: { latitude: null, longitude: null },
            notes: [],
            geofencingRegions: [],
        };


        this.itemsRef = this.props.items;
    }

//    async handleLocationUpdate({data, error}) {
//         if(error) {
//             console.log("ERROR");
//         } else {
//             console.log(data);
//         }
//    }

   async initializeBackgroundLocation(){
        let isRegistered = await TaskManager.isTaskRegisteredAsync('BACKGROUND_LOCATION_UPDATES_TASK')
        if (!isRegistered) await Location.startLocationUpdatesAsync('BACKGROUND_LOCATION_UPDATES_TASK', {
            accuracy: Location.Accuracy.High,
            /* after edit */
            timeInterval: 2500,
            distanceInterval: 2,
        });
    }

    async componentDidMount() {
        
        this.initializeBackgroundLocation();
        this.listenForItems();

        await Font.loadAsync({
            'asap-bold': require('../../assets/fonts/Asap-Bold.ttf'),
            'asap-bold-italic': require('../../assets/fonts/Asap-BoldItalic.ttf'),
            'asap-italic': require('../../assets/fonts/Asap-Italic.ttf'),
            'asap-medium': require('../../assets/fonts/Asap-Medium.ttf'),
            'asap-medium-italic': require('../../assets/fonts/Asap-MediumItalic.ttf'),
            'asap-regular': require('../../assets/fonts/Asap-Regular.ttf'),
            'asap-semi-bold': require('../../assets/fonts/Asap-SemiBold.ttf'),
            'asap-semi-bold-italic': require('../../assets/fonts/Asap-SemiBoldItalic.ttf'),
        });
        
        this.setState({fontLoaded: true})
    }

    listenForItems() {
        var items = [];
        var geofencingObjs = [];

        this.itemsRef.on('value', (snap) => {
            // get all current notes
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    message: child.val().message,
                    location: child.val().location,
                    _key: child.key
                });

                //console.log("Pusing LAT: " + child.val().location.latitude);
                //console.log("Pusing LONG: " + child.val().location.longitude);
                geofencingObjs = [];
                geofencingObjs.push({
                    latitude: child.val().location.latitude,
                    longitude: child.val().location.longitude,
                    radius: 1,
                    notifyOnEnter: true,
                    notifyOnExit: false
                });
            });

        

            this.setState({
                notes: items.reverse()
            });

            this.setState({
                geofencingRegions: geofencingObjs
            });

            // geofencingObjs.forEach(function(element) {
            //     console.log(element);
            // });
            
           
            Location.startGeofencingAsync('GEO_TRACK_LOCATION', geofencingObjs);
            //Location.stopGeofencingAsync('GEO_TRACK_LOCATION');
            if(Location.hasStartedGeofencingAsync('GEO_TRACK_LOCATION')){
                console.log("Geofencing Started");
            }
        });
    }


    openNoteModal(title, message) {
        this.setState({ noteIsOpen: true, noteTitle: title, noteMessage: message });
        this.setFeedModalVisible(false);
    }

    closeNoteModal() {
        this.setState({ noteIsOpen: false });
        this.setState({ feedModalVisible: true });
    }

    setAddPinModalVisible(visible) {
        this.setState({ addPinModalVisible: visible });
    }

    setFeedModalVisible(visible) {
        this.listenForItems();
        this.setState({ feedModalVisible: visible });
    }

    closeAddPinModal() {
        this.setAddPinModalVisible(!this.state.addPinModalVisible);
    }

    closeFeedModal() {
        this.setFeedModalVisible(!this.state.feedModalVisible);
    }

    openAddPinModal() {
        // Reset the text box to empty, and when that is done open the modal
        this.setState({ titleValue: '', messageValue: '' }, () => this.setAddPinModalVisible(true));
    }

    openFeedModal() {
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
            { enableHighAccuracy: false, timeout: 20000 },
        )
        this.closeAddPinModal();
    }



    render() {
        return (
            <View>
                {/* Modal to add a new note/pin */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.addPinModalVisible}
                >
                    <KeyboardAvoidingView behavior="padding" style={addPinModalStyle.modalContent}>
                        <KeyboardAvoidingView behavior="padding" style={addPinModalStyle.modal}>
                            <View style={addPinModalStyle.modalHeader}>
                                {this.state.fontLoaded == true ? (
                                <Text style={addPinModalStyle.modalTitle}>Add Note</Text>
                                ) : null }
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
                                placeholder={'Enter title here'}
                                placeholderTextColor='white'
                                onChangeText={(text) => this.setState({ titleValue: text })}
                                onEndEditing={(e) => {
                                    this.setState({ titleValue: e.nativeEvent.text })
                                }
                                }
                                onSubmitEditing={Keyboard.dismiss}
                                value={this.state.titleValue}
                                multiline={false}
                                keyboardAppearance={'dark'}
                                maxLength={30} // maximum charachters
                            />
                            <TextInput
                                style={addPinModalStyle.noteInput}
                                placeholder={'Enter note here'}
                                placeholderTextColor='white'
                                onChangeText={(text) => this.setState({ messageValue: text })}
                                onEndEditing={(e) => {
                                    this.setState({ messageValue: e.nativeEvent.text })}
                                }
                                onSubmitEditing={Keyboard.dismiss}
                                value={this.state.messageValue}
                                multiline={true}
                                keyboardAppearance={'dark'}
                                keyboardDismissMode={'onDrag'}
                            />
                            <TouchableHighlight style={{width: 35, height: 38, alignSelf: 'flex-end'}} onPress={() => { this.sendNoteToDB() }}>
                                <Image
                                    style={addPinModalStyle.postIcon}
                                    source={require('../../assets/icon-assets/enabled-post-button-3x.png')}
                                />
                            </TouchableHighlight>
                        </KeyboardAvoidingView>
                    </KeyboardAvoidingView>
                </Modal>



                {/* Feed Modal */}
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
                                    onPress={() => {this.closeFeedModal(); }}
                                    style={feedModalStyle.closeIcon}
                                />
                                <ScrollView style={{height: '100%'}}>
                                        {
                                            this.state.notes.map((note, index) => {
                                                return (
                                                   <View style={{flex: 1}} key={index}>
                                                    <Card key={index} style={feedModalStyle.cardStyle}>
                                                        <CardItem
                                                            style={feedModalStyle.cardItemStyle}
                                                            button={true}
                                                            onPress={() => {
                                                                this.openNoteModal(note.title, note.message);
                                                            }}>
                                                            <Body>
                                                                {this.state.fontLoaded == true ? (
                                                                <Text style={feedModalStyle.cardTextStyle}>
                                                                    {note.title}
                                                                </Text> ) : null }
                                                            </Body>
                                                            <Ionicons name="ios-arrow-forward" color="#4AE779" size={30} style={feedModalStyle.iconStyle} />
                                                        </CardItem>
                                                    </Card>
                                                   </View>
                                                )
                                            })
                                         }
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>



                {/* note modal */}
                <Modal
                    animationType="slide"
                    visible={this.state.noteIsOpen}
                >
                    <View style={feedModalStyle.modalContent}>
                        <View style={feedModalStyle.modal}>
                            <View>
                                <Ionicons
                                    name="ios-arrow-back"
                                    color="#EFEFF4"
                                    size={50}
                                    onPress={() => { this.closeNoteModal(); }}
                                    style={{ padding: '3%'}}
                                />

                                <ScrollView style={{ height: '100%' }}>
                                    {this.state.fontLoaded == true ? (
                                    <Text style={feedModalStyle.expandedFeedTitle}>
                                        {this.state.noteTitle}
                                    </Text> ) : null }
                                    
                                    {this.state.fontLoaded == true ? (
                                    <Text style={feedModalStyle.expandedFeedText}>
                                        {this.state.noteMessage}
                                    </Text> ) : null }
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>


               { /* Main Toolbar with two icons */}
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