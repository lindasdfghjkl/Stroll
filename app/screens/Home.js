/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, { Component } from 'react';
import {
    ReactNative,
    View, 
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
const Toolbar = require('../components/Toolbar');
import styles from '../../styles.js';




class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.checkPermissions();
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
            <View style={styles.container}>
                <MapView
                    provider="google"
                    style={
                        {
                            height: '0%',
                            width: '100%',
                        }
                    }
                ></MapView>

                <Toolbar></Toolbar>
            </View>
        )
    }
}
export default Home;

