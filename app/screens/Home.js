/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
const firebase = require('firebase');
const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const ListItem = require('../components/ListItem');
const Toolbar = require('../components/Toolbar');
const styles = require('../../styles.js');

import userMarker from '../../assets/userMarker.png';
import pinImage from '../../assets/pin.png';

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
} = ReactNative;

const geo_options = {
    enableHighAccuracy: true
}

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDgqKzsdVgTX5h7MuY0Iq6PFsbndLTEpdY",
    authDomain: "stroll-1e680.firebaseapp.com",
    databaseURL: "https://stroll-1e680.firebaseio.com",
    projectId: "stroll-1e680",
    storageBucket: "stroll-1e680.appspot.com",
    messagingSenderId: "457693989749"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: []
        };
        this.itemsRef = this.getRef().child('items');
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get all current pins
            var items = [];
            snap.forEach((child) => {
                items.push({
                    message: child.val().message,
                    location: child.val().location,
                    _key: child.key
                });
            });

            this.setState({
                markers: items
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <View style={styles.container}>

                <MapView
                    style={
                        {
                            height: '85%',
                            width: '100%',
                        }
                    }
                    followsUserLocation={true}
                    showsUserLocation={true}
                    loadingEnabled={true}    
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            key={marker._key}
                            coordinate={marker.location}
                            title={marker.message}
                            image={pinImage}
                        />
                    ))}
                </MapView>

                <Toolbar onPress={this._addItem.bind(this)} items={this.itemsRef}/>
            </View>
        )
    }

    _addItem() {
        AlertIOS.prompt(
            'Add New Pin',
            null,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Post',
                    onPress: (text) => {
                        var coordinates = {};
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude }
                                console.log(coordinates);

                                this.itemsRef.push({ message: text, location: coordinates });
                            },
                            (error) => this.setState({ error: error.message }),
                            { enableHighAccuracy: true, timeout: 20000 },
                        )
                    }
                },
            ],
            'plain-text'
        );
    }
}
export default Home;
//AppRegistry.registerComponent('FirebaseReactNativeSample', () => FirebaseReactNativeSample);
