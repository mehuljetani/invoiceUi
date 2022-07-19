import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fp, fv, hp, wp} from '../constants/Responsive';

const Header = ({screenNname, onPress, leftBtn, rightBtn}) => {
  return (
    <>
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.btnTextStyle}>{leftBtn}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.btnTextStyle}>{rightBtn}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerNameStyle}>
        <Text style={styles.textStyle}>{screenNname}</Text>
        <TouchableOpacity>
          <Image
            style={styles.searchImage}
            source={require('../../../assets/images/search.png')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginTop: Platform.OS === 'ios' ? hp(7) : hp(5),
  },
  btnTextStyle: {
    color: 'black',
    fontSize: 20,
    letterSpacing: 1,
  },
  headerNameStyle: {
    marginHorizontal: wp(5),
    flexDirection: 'row',
    marginTop: hp(6),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 50,
    color: 'black',
    letterSpacing: 1,
    fontWeight: '500',
  },
  searchImage: {
    height: 30,
    width: 30,
  },
});

export default Header;
