import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Invoice = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0.85, y: 0}}
        end={{x: 0.65, y: 1}}
        colors={[
          '#F2D642',
          '#3FC7AD',
          '#C2E8D9',
          '#D1ECE1',
          '#CEEADD',
          'white',
        ]}
        locations={[0.1, 0.39, 0.8, 0.89, 1, 1]}
        style={{height: 300, width: 400}}></LinearGradient>
      <LinearGradient
        style={{height: 90}}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#CEEADE', '#FFFFFF']}></LinearGradient>
    </View>
  );
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
