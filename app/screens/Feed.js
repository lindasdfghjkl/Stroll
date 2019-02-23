import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Feed extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Feed</Text>
      </View>
    );
  }
}
export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
