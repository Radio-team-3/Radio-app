import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';

class Favourite extends Component {
    render() {
        return (
            <View style={styles.container}>
              <Text>View your favourites!</Text>
            </View>
        );
    }
}

export default Favourite;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });