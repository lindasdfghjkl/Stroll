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

const styles = require('../../styles.js');
import pinImage from '../../assets/icon-assets/big-note-green.png';
import locatorImage from '../../assets/icon-assets/locator.png';
const mapStyle =
    [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#212121"
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
            "stylers": [
                {
                    "color": "#9d9d9e"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#747474"
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
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#1f1f1f"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#555555"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#595a56"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
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
                    "color": "#747474"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#181818"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#606060"
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
            "featureType": "road",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a3a3a3"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#313131"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#bebebe"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#373737"
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
            "stylers": [
                {
                    "color": "#9a9a9a"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
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
                    "color": "#6e6e6e"
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

        /*
        setInterval(
            function () {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        var coords = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
                        this.userLocation = coords;

                        this.setState({
                            markers: items
                        });
                })
            }, 1000);

        */


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

