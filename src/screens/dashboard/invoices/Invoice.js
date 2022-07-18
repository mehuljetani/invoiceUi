import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Invoice = () => {
  return <View style={styles.container}></View>;
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  linearGradient: {
    height: 400,
    width: 400,
  },
  linearGradient2: {
    height: 20,
    opacity: 0.6,
    marginTop: -40,
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instagramButton: {
    height: 450,
  },
  signUpButton: {
    margin: 1,
    width: 200,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
