import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../../constants/Responsive';

const Correct = () => {
  const [check, setCheck] = useState(false);

  const Check = () => {
    return (
      <Image
        source={require('../../assets/images/check-mark.png')}
        style={styles.correctStyle}
      />
    );
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => setCheck(!check)}>
        <View style={styles.checkbox}>
          {check === true ? <Check /> : <View />}
        </View>
      </TouchableOpacity>
      <Text style={styles.textStyle}>
        Shipping address is same as billing address
      </Text>
    </View>
  );
};

export default Correct;

const styles = StyleSheet.create({
  container: {},
  checkbox: {
    height: Platform.OS === 'ios' ? hp(2.4) : hp(2.8),
    width: wp(5),
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    marginRight: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctStyle: {
    height: hp(2),
    width: wp(3),
  },
  textStyle: {
    color: 'gray',
  },
});
