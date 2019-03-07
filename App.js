import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './app/screens/Home';
import Feed from './app/screens/Feed';
//import Routes from './app/routing/routes';


class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  'Home': {
    screen: Home
  },
  'Feed': {
      screen: Feed
  },
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

export default createAppContainer(AppNavigator);
