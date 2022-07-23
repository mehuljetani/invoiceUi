import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import {hp, wp} from '../../components/constants/Responsive';
import {LogoName} from '../../components/index';
import {Component} from '../../components/index';
import {
  addCustomer,
  getCustomerData,
  productAdd,
} from '../../redux/action/index';

const Dashboard = ({navigation}) => {
  const [count, setCount] = useState();
  const [productCount, setProductCount] = useState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const customerData = async () => {
    // const users = await firestore()
    //   .collection('Users')
    //   .doc(auth().currentUser.uid)
    //   .collection('Customer')
    //   .get()
    //   .catch(e => console.log(e));
    // dispatch(addCustomer(users.docs));

    const product = await firestore()
      .collection('Users')
      .doc(auth()?.currentUser?.uid)
      .collection('Product')
      .get()
      .catch(e => console.log(e));
    dispatch(productAdd(product.docs));
  };

  useEffect(() => {
    if (isFocused) {
      counter();
      customerData();
      getData();
    } else {
      return;
    }
  });

  const getData = async () => {
    let request = {
      data: {
        collection: 'Customer',
      },
      onSuccess: res => {
        // console.log('Responnse at screen', res);
      },
      onFail: err => {
        console.log('Error at screen :: ', err);
      },
    };
    dispatch(getCustomerData(request));
  };

  // To be removed
  const counter = () => {
    firestore()
      .collection('Users')
      .doc(auth()?.currentUser?.uid)
      .collection('Customer')
      .get()
      .then(querySnapshot => {
        setCount(querySnapshot.size);
      })
      .catch(e => console.log(e));

    firestore()
      .collection('Users')
      .doc(auth()?.currentUser?.uid)
      .collection('Product')
      .get()
      .then(querySnapshot => {
        setProductCount(querySnapshot.size);
      })
      .catch(e => console.log(e));
  };

  const onInvoice = () => navigation.navigate('Invoice');
  const onCustomer = () => navigation.navigate('Customer');
  const onProduct = () => navigation.navigate('Product');
  const onPayment = () => navigation.navigate('Payment');

  return (
    <View style={styles.container}>
      <LogoName name={'Dashboard'} containerStyle={{marginBottom: hp(7)}} />
      <View style={styles.component1}>
        <Component
          name={'Invoices'}
          color={'#43B8B1'}
          count={0}
          onPress={onInvoice}
        />
        <Component
          name={'Customers'}
          color={'#F07946'}
          count={count}
          onPress={onCustomer}
        />
      </View>
      <View style={styles.component2}>
        <Component
          name={'Products'}
          color={'#8179F9'}
          count={productCount}
          onPress={onProduct}
        />
        <Component
          name={'Payments'}
          color={'#F44F82'}
          count={19}
          onPress={onPayment}
        />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(7),
    marginVertical: hp(12),
  },
  logoNameWrapper: {
    marginBottom: hp(5),
  },
  component1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  component2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp(1.5),
  },
});
