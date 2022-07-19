import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {hp, wp, fv} from '../../../components/constants/Responsive';
import {CircleButton, Header} from '../../../components/index';

const Customer = ({navigation}) => {
  const customer = useSelector(state => state);
  const UID = customer?.login?.arr?.UID;
  const isFocused = useIsFocused();
  const user = useSelector(state => state?.addCustomer?.arr);

  useEffect(() => {
    if (isFocused) {
    } else {
      return;
    }
  }, []);

  const onBack = () => navigation.goBack();
  const onAddCustomer = () => navigation.navigate('AddCustomer');
  const onCustomerDetail = (customer, userDocId) => {
    navigation.navigate('CustomerDetail', {
      customer: customer,
      userDocId: userDocId,
    });
  };

  const renderItem = ({item}) => {
    const userDocId = item.ref?._documentPath?._parts[3];
    item = item.data();
    const letter = item?.cName.charAt(0);
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    return (
      <View style={styles.customerWrapper}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => onCustomerDetail(item, userDocId)}>
          <View
            style={[
              styles.btnWrapper,
              {
                borderColor: `rgba(${r},${g},${b},${0.1})`,
                backgroundColor: `rgba(${r},${g},${b},${0.3})`,
              },
            ]}>
            <Text style={styles.letterStyle}>{letter}</Text>
          </View>
          <View style={styles.customerDetail}>
            <Text style={styles.nameStyle}>{item?.cName}</Text>
            <Text style={styles.numberStyle}>{item?.phoneNo}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header screenNname={'Customers'} onPress={onBack} leftBtn={'BACK'} />
      <FlatList data={user} renderItem={renderItem} style={{marginTop: 30}} />
      <View style={styles.buttonStyle}>
        <CircleButton
          height={75}
          buttonType={'Submit'}
          name={''}
          onPress={onAddCustomer}
        />
      </View>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customerWrapper: {
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginVertical: hp(1.4),
  },
  btnWrapper: {
    height: Platform.OS === 'ios' ? hp(7) : hp(8.2),
    width: Platform.OS === 'ios' ? hp(7) : hp(8.2),
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterStyle: {
    fontSize: 25,
    color: 'black',
  },
  customerDetail: {
    marginLeft: wp(3),
  },
  nameStyle: {
    fontSize: 18,
    color: 'black',
  },
  numberStyle: {
    marginTop: hp(1),
    color: 'black',
  },
  buttonStyle: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: wp(8),
    bottom: hp(4),
    borderRadius: 30,
    zIndex: 1,
  },
});
