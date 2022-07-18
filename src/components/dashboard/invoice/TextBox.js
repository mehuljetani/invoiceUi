import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const TextBox = ({text}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  container: {},
  textStyle: {
    fontSize: 18,
    color: '#000',
  },
});
