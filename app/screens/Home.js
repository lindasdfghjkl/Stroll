/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, { Component } from 'react';
import {
    ReactNative,
    View
} from 'react-native';
import MapView from 'react-native-maps';
const Toolbar = require('../components/Toolbar');
import {Expo, Font, Permissions, TaskManager, Location} from 'expo';



TaskManager.defineTask('BACKGROUND_LOCATION_UPDATES_TASK', ({data, error}) => {
    console.log("--- IN LOCATION TASK ---");
    if(error) {
        console.log("ERROR");
    } else {
        //console.log(data);
    }
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.checkPermissions();
        this.initializeBackgroundLocation();
    }


    async initializeBackgroundLocation(){
        let isRegistered = await TaskManager.isTaskRegisteredAsync('BACKGROUND_LOCATION_UPDATES_TASK')
        if (!isRegistered) await Location.startLocationUpdatesAsync('BACKGROUND_LOCATION_UPDATES_TASK', {
            accuracy: Location.Accuracy.High,
            /* after edit */
            timeInterval: 2500,
            distanceInterval: 2,
        });
    }

    async checkPermissions() {
        const { Permissions } = Expo;
        const { status: statusLoc, expires: expiresLoc, permissions: permissionsLoc } =  await Permissions.getAsync(Permissions.LOCATION);
        if (statusLoc !== 'granted') {
          const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
          if (status !== 'granted') {
              throw new Error('Location permission not granted');
          }
        } 

        const { status: statusNot, expires: expiresNot, permissions: permissionsNot } = Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (statusNot !== 'granted') {
          const { status, permissions } = Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    }


    render() {
        return (  
            <View>
                <Toolbar></Toolbar>
            </View>
        )
    }
}
export default Home;

