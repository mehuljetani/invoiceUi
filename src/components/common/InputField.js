import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {fv, hp} from '../constants/Responsive';

const InputField = ({label, value, onChangeText, keyboardType}) => {
  return (
    <View style={styles.inputFieldWrapper}>
      <TextInput
        label={label}
        variant="standard"
        style={styles.emailStyle}
        underlineColor={'black'}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize={'none'}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputFieldWrapper: {},
  emailStyle: {
    marginBottom: hp(1.5),
    backgroundColor: '#F4F4F4',
    fontWeight: Platform.OS === 'ios' ? '400' : '500',
    fontSize: Platform.OS === 'ios' ? fv(14) : fv(16),
  },
});
