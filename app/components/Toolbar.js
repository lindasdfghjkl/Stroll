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
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import { Callout } from 'react-native-maps';

import { Ionicons } from '@expo/vector-icons';
import { Header, Content, Card, CardItem, Body, Left, Right } from 'native-base';
import {Expo, Font, TaskManager, Location} from 'expo';

// Styles
import toolbarStyle from '../styles/toolbarStyle';
import addPinModalStyle from '../styles/addPinModalStyle';
import feedModalStyle from '../styles/feedModalStyle';
import mapCalloutStyle from '../styles/mapCalloutStyle';
import pinImage from '../../assets/icon-assets/big-note-green.png';
import viewedPinImage from '../../assets/icon-assets/big-note-blue.png';
import locatorImage from '../../assets/icon-assets/locator.png';

var LATITUDE_DELTA = 0.0025;
const LONGITUDE_DELTA = 0.0025;
const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c3138"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "color": "#606f88"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#a7a8ba"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.government",
      "elementType": "labels",
      "stylers": [
        {
          "color": "#2e363f"
        }
      ]
    },
    {
      "featureType": "poi.medical",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#42435e"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#a7a6b3"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "labels.icon",
      "stylers": [
        {
          "color": "#bfbfbf"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#606488"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#dddddd"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#b5bbca"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#c0bfcc"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4b73ff"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ]


// Initialize Firebase
const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyDgqKzsdVgTX5h7MuY0Iq6PFsbndLTEpdY",
    authDomain: "stroll-1e680.firebaseapp.com",
    databaseURL: "https://stroll-1e680.firebaseio.com",
    projectId: "stroll-1e680",
    storageBucket: "stroll-1e680.appspot.com",
    messagingSenderId: "457693989749"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
global.firebaseRef = firebaseApp.database().ref().child('items');





function removeDuplicates(arr, prop){
    const unique = arr
          .map(e => e[prop])

        // store the keys of the unique objects
       .map((e, i, final) => final.indexOf(e) === i && i)

       // eliminate the dead keys & store unique objects
       .filter(e => arr[e]).map(e => arr[e]);

      return unique;
}

function removeFromArray(arr, obj) {
    var index = arr.indexOf(obj);
    if (index >= 0) {
      arr.splice( index, 1 );
    }
    return arr;
}




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
        queryFirebase(region.latitude, region.longitude);
    } else if (eventType === Location.GeofencingEventType.Exit) {
        console.log('GEO_TRACK_LOCATION - EXIT: ', region);
    }
});

global.feed_items = [];
global.marker_items = [];
global.geofencingObjs = [];
global.noteQueryObjs = [];

global.queryFirebase = function queryFirebase(lat, long) {
    //console.log(global.firebaseRef);
    
    // Query the DB based on the region
    var query = global.firebaseRef//.orderByChild("time");

    var childrenCount = 0;

    query.on("child_added", function(snapshot) {
      childrenCount++;
    });

    query.on("child_removed", function(snapshot) {
        var deletedNote = {
            title: snapshot.val().title,
            message: snapshot.val().message,
            location: snapshot.val().location,
            time: snapshot.val().time,
            _key: snapshot.key
        }
        console.log("Deleted note: " + deletedNote.title);

        global.noteQueryObjs.forEach(function(item) { 
            if (item._key == deletedNote._key) {
                try { global.noteQueryObjs.splice(global.noteQueryObjs.indexOf(item), 1);} 
                catch {}
            } 
        })

        global.feed_items.forEach(function(item) { 
            if (item._key == deletedNote._key) {
               try { global.feed_items.splice(global.feed_items.indexOf(item), 1); }
               catch {}
            } 
        })
        childrenCount--;
    });

    query.once('value', (snapshot) => {
        console.log("firebaseRef snap from queryFirebase()");

        // get all current notes
        snapshot.forEach((child) => {

            if (child.val().location.latitude == lat && child.val().location.longitude == long) {
                var obj = {
                    title: child.val().title,
                    message: child.val().message,
                    location: child.val().location,
                    time: child.val().time,
                    _key: child.key
                };

               // if (global.feed_items.length < childrenCount && global.feed_items.length < marker_items.length) {
                    global.noteQueryObjs.push(obj);
                //} 
            }
        });
    });

    // set feed list
    global.feed_items = removeDuplicates(noteQueryObjs, "_key");


    // set geofenced markers
    global.toolbarRef.setState({
        markers: global.feed_items,
    })

    // remove duplicate notes
    console.log("Total notes in feed: " + global.feed_items.length);
};




global.toolbarRef;
class Toolbar extends Component {
    map = null;

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            userLocation: {},
            addPinModalVisible: false,
            feedModalVisible: false,
            fontLoaded: false,
            titleValue: '',
            messageValue: '',
            noteIsOpen: false,
            noteTitle: '',
            noteMessage: '',
            noteLocation: { latitude: null, longitude: null },
            geofencingRegions: [],
            markers: [],
            feedScrollPosition: 0,
        };
    }


    setRegion(region) {
        if(this.state.ready) {
          setTimeout(() => this.map.animateToRegion(region), 10);
        }
    }


    onMapReady = (e) => {
      if(!this.state.ready) {
        this.setState({ready: true});
      }
    };


    getCurrentPosition() {
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              };
                this.setRegion(region);
                this.state.userLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            },
            (error) => {
              Alert.alert("Error Loading Map");
            }
          );
        } catch(e) {
          alert(e.message || "");
        }
      };

    async componentDidMount() {
        global.toolbarRef = this;
        this.getCurrentPosition();
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
        var noteItems = [];
        var childrenCount = 0;

        var ref = global.firebaseRef//.orderByChild("time");
       
        ref.on("child_added", function(snap) {
           childrenCount++;
        });

  
        ref.on("child_changed", function(snap) {

        });

        ref.on("child_removed", function(snapshot) {
            var deletedNote = {
              title: snapshot.val().title,
              message: snapshot.val().message,
              location: snapshot.val().location,
              time: snapshot.val().time,
              _key: snapshot.key
            }
            console.log("Deleted note: " + deletedNote.title);

            global.marker_items.forEach(function(marker) { 
                if (marker._key == deletedNote._key) {
                    try { global.marker_items.splice(global.marker_items.indexOf(marker), 1); }
                    catch {}
                }
            })

            noteItems.forEach(function(note) { 
               if (note._key == deletedNote._key) {
                    noteItems.splice(noteItems.indexOf(note), 1);
               }
            })

            global.geofencingObjs.forEach(function(item) { 
               if (item._key == deletedNote._key) {
                    try {global.geofencingObjs.splice(global.geofencingObjs.indexOf(item), 1); }
                    catch {}
               } 
            })
            
            childrenCount--;
            //console.log(childrenCount);
        });



        ref.on('value', (snap) => {
            console.log("firebaseRef snap from listenForItems()");

            // get all current notes
            snap.forEach((child) => {
                var geofenceObj = {
                      identifier: child.val().title + child.key,
                      latitude: child.val().location.latitude,
                      longitude: child.val().location.longitude,
                      radius: 0.5,
                      notifyOnEnter: true,
                      notifyOnExit: false
                }

                var noteObj = {
                    title: child.val().title,
                    message: child.val().message,
                    location: child.val().location,
                    time: child.val().time,
                    _key: child.key
                }

                if (global.marker_items.length < childrenCount) {
                    noteItems.push(noteObj);  
                    global.geofencingObjs.push(geofenceObj);
                } 
            });


            global.marker_items = removeDuplicates(noteItems, "_key");
            this.setState({
                markers: global.marker_items
            });

            var geofence = removeDuplicates(global.geofencingObjs, "identifier");
            Location.startGeofencingAsync('GEO_TRACK_LOCATION', geofence);
            if(Location.hasStartedGeofencingAsync('GEO_TRACK_LOCATION')){
                console.log("Geofencing Started");
            }
        });
    }


    viewNote(note) {
        this.setFeedModalVisible(false);
        const region = {
          latitude: note.location.latitude + 0.00065,
          longitude: note.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setRegion(region);
    }

    setAddPinModalVisible(visible) {
        this.setState({ addPinModalVisible: visible });
    }

    setFeedModalVisible(visible) {
        //this.listenForItems();
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
                global.firebaseRef.push({ title: this.state.titleValue, message: this.state.messageValue, location: coordinates, time: Date.now() });
                this.closeAddPinModal();

            },
            (error) => this.setState({ error: "ERROR UPLOADING NOTE: " + error.message }),
            { enableHighAccuracy: false, timeout: 20000 },
        )
    }

    goToUserPosition() {
        var userPos = {
            latitude: this.state.userLocation.latitude,
            longitude: this.state.userLocation.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }

        this.setRegion(userPos);
    }



    formatDate(datenow){
        var date = new Date(datenow);
        var options = {
                year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'
            };
        var result = date.toLocaleDateString('en', options);
        return result;
    }


    render() {
        const { region } = this.state;
        const { children, renderMarker, markers } = this.props;
        return (
            <View>
                <MapView
                    provider="google"
                    ref={ map => { this.map = map }}
                    style={
                        {
                            height: '90%',
                            width: '100%',
                        }
                    }
                    customMapStyle={mapStyle}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    renderMarker={renderMarker}
                    onMapReady={this.onMapReady}
                    showsMyLocationButton={false}
                    //onRegionChange={this.onRegionChange}
                    //onRegionChangeComplete={this.onRegionChangeComplete}   
                >
                    {this.state.markers.map(item => (
                        <MapView.Marker
                            key={item._key}
                            ref={ref => { this["marker" + item._key] = ref; }}
                            coordinate={item.location}
                            title={item.title}
                            description={item.message}
                            onPress={() => {
                                this.viewNote(item);
                            }}
                            image={pinImage}
                        >

                            <MapView.Callout key={item._key} style={{backgroundColor: 'transparent'}}> 
                                <View style={mapCalloutStyle.container}>
                                    <View style={mapCalloutStyle.bubble}>
                                        <View style={mapCalloutStyle.amount}>
                                            {this.props.children}
                                            <Text style={mapCalloutStyle.title}>{item.title}</Text>
                                            <Text style={mapCalloutStyle.message}>{item.message}</Text>
                                        </View>
                                    </View>    
                                    <View style={mapCalloutStyle.arrowBorder} />
                                <View style={mapCalloutStyle.arrow} />
                                    <Text style={mapCalloutStyle.date}>{this.formatDate(item.time)}</Text>
                                </View>
                            </MapView.Callout>
                   
                        </MapView.Marker>
                    ))}


                </MapView>



                {/* Modal to add a new note */}
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
                                <ScrollView 
                                  ref={feedScrollView => {
                                    // check if this reference exists
                                    if(feedScrollView !== null && this.feedScrollView !== feedScrollView){
                                        this.feedScrollView = feedScrollView
                                         // scroll to last position
                                        feedScrollView.scrollTo({x: 0, y: this.state.feedScrollPosition, animated: false});
                                    }}
                                  }
                                  style={{height: '100%'}} 
                                  onScroll={event => { 
                                    this.yOffset = event.nativeEvent.contentOffset.y;
                                    this.setState({
                                        feedScrollPosition: this.yOffset,
                                    })
                                    //console.log(this.state.feedScrollPosition);
                                  }}
                                  scrollEventThrottle={16}
                                >
                                
                                    {global.feed_items.map((item) => {
                                            return (
                                               <View style={{flex: 1}} key={item._key}>
                                                    <Card key={item._key} style={feedModalStyle.cardStyle}>
                                                        <CardItem
                                                            style={feedModalStyle.cardItemStyle}
                                                            button={true}
                                                            onPress={() => {
                                                                this.viewNote(item);
                                                                this["marker" + item._key].showCallout();

                                                            }}>
                                                            <Body>
                                                                {this.state.fontLoaded == true ? (
                                                                <Text style={feedModalStyle.cardTextStyle}>
                                                                    {item.title}
                                                                </Text> ) : null }
                                                            </Body>
                                                            <Ionicons name="ios-arrow-forward" color="#4AE779" size={30} style={feedModalStyle.iconStyle} />
                                                        </CardItem>
                                                    </Card>
                                               </View>
                                            )
                                        })}
                                     
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
                        style={toolbarStyle.buttonWrapper}
                    >
                        <Image
                            style={toolbarStyle.feedIcon}
                            source={require('../../assets/icon-assets/unselected-home-2x.png')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => {
                            this.goToUserPosition();
                        }}
                        style={toolbarStyle.buttonWrapper}
                    >
                        <Image
                            style={toolbarStyle.feedIcon}
                            source={require('../../assets/icon-assets/selected-find-my-loctaion-3x.png')}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => {
                            this.openAddPinModal();
                        }}
                        style={toolbarStyle.buttonWrapper}
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