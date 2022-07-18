import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fp, fv, hp, wp} from '../constants/Responsive';

const Header = ({screenNname, onPress, btnName}) => {
  return (
    <View style={styles.btnWrapper}>
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.btnTextStyle}>{btnName}</Text>
      </TouchableOpacity>

      <View style={styles.textWrapper}>
        <Text style={styles.textStyle}>{screenNname}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    marginHorizontal: wp(5),
    marginVertical: hp(3),
  },
  buttonStyle: {},
  btnTextStyle: {
    color: 'black',
    fontSize: 20,
    letterSpacing: 1,
  },
  textWrapper: {
    marginTop: hp(6),
  },
  textStyle: {
    fontSize: 27,
    fontWeight: '500',
    color: 'black',
    letterSpacing: 2,
  },
});

export default Header;
