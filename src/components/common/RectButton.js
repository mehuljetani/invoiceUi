import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../constants/Responsive';

const RectButton = ({iconImage, btnName, onPress}) => {
  const NoImage = ({btnName}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>{btnName}</Text>
      </View>
    );
  };

  const WithImage = ({btnName, iconImage}) => {
    return (
      <View style={styles.container}>
        <Image source={iconImage} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{btnName}</Text>
      </View>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        {iconImage === '' ? (
          <NoImage btnName={btnName} />
        ) : (
          <WithImage btnName={btnName} iconImage={iconImage} />
        )}
      </TouchableOpacity>
    </>
  );
};

export default RectButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    padding: 15,
    borderRadius: 15,
  },
  imageStyle: {
    height: hp(3),
    width: hp(3),
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginLeft: 6,
  },
});
