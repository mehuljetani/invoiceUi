import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {hp} from '../../../components/constants/Responsive';
import {Header, RectButton} from '../../../components';

const Detail = ({label, value}) => {
  return (
    <View style={{padding: 12, flexDirection: 'row'}}>
      <View style={{width: '40%'}}>
        <Text style={{fontSize: 16, color: 'black'}}>{label} </Text>
      </View>
      <View style={{width: '60%'}}>
        <Text style={{fontSize: 16, color: 'black'}}> : {value}</Text>
      </View>
    </View>
  );
};
const CustomerDetail = ({route, navigation}) => {
  const userDocId = route?.params?.userDocId;
  const handleDelete = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('Customer')
      .doc(userDocId)
      .delete()
      .then(() => {
        alert('Deleted !!!');
        navigation.navigate('Dashboard');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const data = route?.params?.customer;

  const onDelete = () => handleDelete();
  const onEdit = (data, userDocId) => {
    navigation.navigate('UpdateCustomer', {
      data: data,
      userDocId: userDocId,
    });
  };

  return (
    <View style={styles.container}>
      <Header leftBtn={'BACK'} onPress={() => navigation.goBack()} />
      <Text style={styles.NameStyle}>{data.cName}</Text>
      <View style={styles.details}>
        <Detail label={'Customer Name '} value={data.cName} />
        <Detail label={'Phone No. '} value={data.phoneNo} />
        <Detail label={'Email Address '} value={data.email} />
        <Detail label={'PAN No. '} value={data.panNo} />
        <Text style={{fontSize: 21}}>GST Details </Text>
        <Detail label={'GST No. '} value={data.gstNo} />
        <Detail label={'GST State '} value={data.gstState} />
        <Detail label={'GST State Code '} value={data.gstStateCode} />
        <Detail label={'Billing Address '} value={data.bAddress} />
        <Detail label={'Shipping Address '} value={data.sAddress} />
      </View>
      <View style={styles.btnWrapper}>
        <RectButton
          btnName={'DELETE'}
          iconImage={require('../../../../assets/images/bin.png')}
          onPress={onDelete}
        />
        <RectButton
          btnName={'EDIT'}
          iconImage={require('../../../../assets/images/pencil.png')}
          onPress={() => onEdit(data, userDocId)}
        />
      </View>
    </View>
  );
};

export default CustomerDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  NameStyle: {
    marginTop: -40,
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  details: {
    marginTop: hp(4),
    marginHorizontal: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 180 : 35,
    justifyContent: 'space-evenly',
  },
});
