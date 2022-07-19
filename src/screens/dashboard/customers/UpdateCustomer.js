import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {CircleButton, Header, InputField} from '../../../components';

const UpdateCustomer = ({route, navigation}) => {
  const data = route?.params?.data;
  const userDocId = route?.params?.userDocId;

  const [cName, setCName] = useState(data.cName);
  const [phoneNo, setPhoneNo] = useState(data.phoneNo);
  const [email, setEmail] = useState(data.email);
  const [panNo, setPanNo] = useState(data.panNo);
  const [gstNo, setGstNo] = useState(data.gstNo);
  const [gstState, setGstState] = useState(data.gstState);
  const [gstStateCode, setGstStateCode] = useState(data.gstStateCode);
  const [bAddress, setBAddress] = useState(data.bAddress);
  const [sAddress, setSAddress] = useState(data.sAddress);

  const customerDetail = {
    cName: cName,
    phoneNo: phoneNo,
    email: email,
    panNo: panNo,
    gstNo: gstNo,
    gstState: gstState,
    gstStateCode: gstStateCode,
    bAddress: bAddress,
    sAddress: sAddress,
  };

  const handleUpdate = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('Customer')
      .doc(userDocId)
      .update(customerDetail)
      .then(() => {
        alert('Data Updated Successfully');
        navigation.navigate('Dashboard');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onCancel = () => navigation.goBack();
  const onCName = name => setCName(name);
  const onPhoneNo = phone => setPhoneNo(phone);
  const onEmail = email => setEmail(email);
  const onPanNo = pan => setPanNo(pan);
  const onGstNo = gstNo => setGstNo(gstNo);
  const onGstState = gstState => setGstState(gstState);
  const onGstStateCode = gstStateCode => setGstStateCode(gstStateCode);
  const onBAddress = bAddress => setBAddress(bAddress);
  const onSAddress = sAddress => setSAddress(sAddress);

  const onUpdate = () => handleUpdate();

  return (
    <View style={styles.container}>
      <Header
        leftBtn={'CANCEL'}
        screenNname={'Update Customer'}
        onPress={onCancel}
      />
      <ScrollView>
        <View style={styles.inputWrapper}>
          <InputField
            label={'Customer Name '}
            value={cName}
            onChangeText={onCName}
          />
          <InputField
            label={'Phone No.'}
            value={phoneNo}
            onChangeText={onPhoneNo}
          />
          <InputField
            label={'Email Address'}
            value={email}
            onChangeText={onEmail}
          />
          <InputField label={'PAN No.'} value={panNo} onChangeText={onPanNo} />
          <Text style={{fontSize: 21, color: 'black', marginHorizontal: 20}}>
            GST DETAILS
          </Text>
          <InputField label={'GST No.'} value={gstNo} onChangeText={onGstNo} />
          <InputField
            label={'GST State'}
            value={gstState}
            onChangeText={onGstState}
          />
          <InputField
            label={'GST State Code '}
            value={gstStateCode}
            onChangeText={onGstStateCode}
          />
          <InputField
            label={'Billing Address'}
            value={bAddress}
            onChangeText={onBAddress}
          />
          <InputField
            label={'Shipping Address'}
            value={sAddress}
            onChangeText={onSAddress}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <CircleButton name={'Update'} height={80} onPress={onUpdate} />
      </View>
    </View>
  );
};

export default UpdateCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    marginTop: 30,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
