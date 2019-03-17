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

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

class Home extends Component {
    map = null;

    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            region: {
                latitude: -37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            ready: true,
        };
        this.itemsRef = this.getRef().child('items');
    }

    setRegion(region) {
        if(this.state.ready) {
          setTimeout(() => this.map.animateToRegion(region), 10);
        }
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
        this.getCurrentPosition();
        this.listenForItems(this.itemsRef);
    }

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
            },
            (error) => {
              Alert.alert("Error Loading Map");
            }
          );
        } catch(e) {
          alert(e.message || "");
        }
      };
    
      onMapReady = (e) => {
        if(!this.state.ready) {
          this.setState({ready: true});
        }
      };
    
    //   onRegionChange = (region) => {
    //     console.log('onRegionChange', region);
    //   };
    
    //   onRegionChangeComplete = (region) => {
    //     console.log('onRegionChangeComplete', region);
    //   };

    render() {
        const { region } = this.state;
        const { children, renderMarker, markers } = this.props;
        return (
            <View style={styles.container}>

                <MapView
                    provider="google"
                    ref={ map => { this.map = map }}
                    style={
                        {
                            height: '85%',
                            width: '100%',
                        }
                    }
                    followsUserLocation={true}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    renderMarker={renderMarker}
                    onMapReady={this.onMapReady}
                    showsMyLocationButton={false}
                    //onRegionChange={this.onRegionChange}
                    //onRegionChangeComplete={this.onRegionChangeComplete}   
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

                <Toolbar items={this.itemsRef}/>
            </View>
        )
    }
}
export default Home;

