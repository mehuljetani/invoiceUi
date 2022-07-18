import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fv, wp} from '../constants/Responsive';

const CircleButton = ({name, onPress, height}) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={[styles.buttonStyle, {height: height, width: height}]}
        onPress={onPress}>
        {name === '' ? (
          <Image
            source={require('../../../assets/images/plus.png')}
            style={{height: 40, width: 60, resizeMode: 'contain'}}
          />
        ) : (
          <Text style={styles.btnTextStyle}>{name}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  buttonWrapper: {},
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
  },
  btnTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? fv(12) : fv(13),
    letterSpacing: 3,
    fontWeight: '400',
  },
});
