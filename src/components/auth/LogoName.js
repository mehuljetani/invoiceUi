import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fp} from '../constants/Responsive';

const LogoName = ({name, fontStyle}) => {
  return (
    <View style={styles.nameWrapepr}>
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nameWrapepr: {},
  textStyle: {
    fontSize: Platform.OS === 'ios' ? fp(5.3) : fp(6),
    fontWeight: '500',
    color: 'black',
    letterSpacing: 1,
  },
});

export default LogoName;
