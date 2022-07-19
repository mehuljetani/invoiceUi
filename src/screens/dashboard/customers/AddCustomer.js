import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {CircleButton, Header, InputField} from '../../../components';
import {hp, wp} from '../../../components/constants/Responsive';

const AddCustomer = ({navigation}) => {
  const [cName, setCName] = useState('ipl');
  const [phoneNo, setPhoneNo] = useState('201518414');
  const [email, setEmail] = useState('ipl@gmail.com');
  const [panNo, setPanNo] = useState('IPL121PL');
  const [gstNo, setGstNo] = useState('5892289');
  const [gstState, setGstState] = useState('BCCI');
  const [gstStateCode, setGstStateCode] = useState('3000');
  const [bAddress, setBAddress] = useState('INDIA');
  const [bTown, setBTown] = useState('BCCI');
  const [bState, setBState] = useState('BCCI');
  const [check, setCheck] = useState(false);
  const [sAddress, setSAddress] = useState('INDIA');
  const [sTown, setSTown] = useState('GAHJ');
  const [sState, setSState] = useState('hkggjk');

  const onCancel = () => navigation.goBack();
  const onCName = name => setCName(name);
  const onPhoneNo = phone => setPhoneNo(phone);
  const onEmail = email => setEmail(email);
  const onPanNo = pan => setPanNo(pan);
  const onGstNo = gstNo => setGstNo(gstNo);
  const onGstState = gstState => setGstState(gstState);
  const onGstStateCode = gstStateCode => setGstStateCode(gstStateCode);
  const onBAddress = bAddress => setBAddress(bAddress);
  const onBTown = bTown => setBTown(bTown);
  const onBState = bState => setBState(bState);
  const onCheck = check => setCheck(check);
  const onSAddress = sAddress => setSAddress(sAddress);
  const onSTown = sTown => setSTown(sTown);
  const onSState = sState => setSState(sState);

  const {navigate} = useNavigation();
  const customerDetail = {
    cName: cName,
    phoneNo: phoneNo,
    email: email,
    panNo: panNo,
    gstNo: gstNo,
    gstState: gstState,
    gstStateCode: gstStateCode,
    bAddress: bAddress,
    bTown: bTown,
    bState: bState,
    sAddress: check === true ? bAddress : sAddress,
    sTown: check === true ? bTown : sTown,
    sState: check === true ? bAddress : sAddress,
  };

  const addData = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('Customer')
      .add(customerDetail)
      .then(() => {
        alert('Customer Data Added');
        console.log('User added!');
        navigate('Dashboard');
      })
      .catch(e => console.log(e));
  };

  const Check = () => {
    return (
      <Image
        source={require('../../../../assets/images/check-mark.png')}
        style={styles.correctStyle}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        screenNname={'Add Customer'}
        leftBtn={'CANCEL'}
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
          <Text style={{color: 'black', fontSize: 16, marginHorizontal: 20}}>
            Customer GST Details
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
          <Text style={{color: 'black', fontSize: 16, marginHorizontal: 20}}>
            Billing Address
          </Text>
          <InputField
            label={'Billing Address'}
            value={bAddress}
            onChangeText={onBAddress}
          />
          <InputField
            label={'Town/City'}
            value={bTown}
            onChangeText={onBTown}
          />
          <InputField label={'State'} value={bState} onChangeText={onBState} />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => onCheck(!check)}
              style={styles.checkbox}>
              {check === true ? <Check /> : <View />}
            </TouchableOpacity>
            <Text style={{color: 'black', fontSize: 16}}>
              Shipping address is same as billing address
            </Text>
          </View>
          <InputField
            label={'Address'}
            value={check === true ? bAddress : sAddress}
            onChangeText={onSAddress}
          />
          <InputField
            label={'Town/City'}
            value={check === true ? bTown : sTown}
            onChangeText={onSTown}
          />
          <InputField
            label={'State'}
            value={check === true ? bState : sState}
            onChangeText={onSState}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonStyle}>
        <CircleButton
          height={85}
          buttonType={'submit'}
          name="SUBMIT"
          onPress={addData}
        />
      </View>
    </View>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    marginTop: 30,
  },
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
    marginHorizontal: 20,
  },
  correctStyle: {
    height: hp(2),
    width: wp(3),
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
