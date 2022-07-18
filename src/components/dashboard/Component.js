import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fp, fv, hp, wp} from '../constants/Responsive';

const Component = ({name, color, count, onPress}) => {
  // console.log(name, color, count);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.componentWrapper}>
        <View
          style={[
            styles.componentStyle,
            {
              backgroundColor: color,
            },
          ]}>
          <View style={styles.textWrapper}>
            <Text style={styles.textStyle1}>{count}</Text>
            <Text style={styles.textStyle2}>{name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Component;

const styles = StyleSheet.create({
  componentWrapper: {},
  componentStyle: {
    height: Platform.OS === 'ios' ? hp(12) : hp(14),
    width: Platform.OS === 'ios' ? wp(40) : wp(39),
    borderRadius: 12,
    padding: 5,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: wp(6),
    marginVertical: hp(1),
  },
  textStyle1: {
    flex: 1,
    color: 'white',
    fontSize: Platform.OS === 'ios' ? fp(4) : fp(5),
    fontWeight: 'bold',
  },
  textStyle2: {
    color: 'white',
    fontSize: Platform.OS === 'ios' ? fv(16) : fv(18),
    fontWeight: 'bold',
  },
});
