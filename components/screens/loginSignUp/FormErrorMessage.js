import React, {useState} from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import {Overlay} from 'react-native-elements';

const FormErrorMessage = (props) => {
  return (<Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => props.hideErrorOverlay(false)}>
    <Image style={styles.errorLogo} source={require('../../../assets/images/error.png')}/>
    <Text style={styles.errorMsg}>{props.error}</Text>
    <TouchableOpacity style={styles.buttonError} onPress={() => props.hideErrorOverlay(false)}>
      <Text style={{
          color: '#fff'
        }}>Okay!</Text>
    </TouchableOpacity>
  </Overlay>)

  // heyy

}

export default FormErrorMessage;

const styles = StyleSheet.create({
  Overlay: {
    width: '90%',
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorLogo: {
    width: 85,
    height: 72
  },
  errorMsg: {
    marginTop: 10,
    padding: 30,
    textAlign: 'center',
    lineHeight: 30,
    color: 'red'
  },
  buttonError: {
    width: '50%',

    height: 52,
    backgroundColor: '#4632a1',
    borderRadius: 50,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
