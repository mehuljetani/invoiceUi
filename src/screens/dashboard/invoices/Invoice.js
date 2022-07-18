import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Header, InvoiceHeader} from '../../../components';
import {useState} from 'react';

const Invoice = () => {
  const [paid, setPaid] = useState(false);

  const onUnPaid = () => {
    setPaid(!paid);
  };
  const onPaid = () => {
    setPaid(!paid);
  };

  return (
    <View style={styles.container}>
      <Header btnName={''} />
      <View style={styles.toggleWrapper}>
        <TouchableOpacity onPress={onUnPaid} style={styles.unPaidWrapper}>
          <Text style={{fontSize: 16, color: '#000', textAlign: 'center'}}>
            UnPaid
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPaid} style={styles.paidWrapper}>
          <Text style={{fontSize: 16, color: '#000', textAlign: 'center'}}>
            Paid
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toggleWrapper: {
    backgroundColor: '#F0F3F9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  unPaidWrapper: {
    //backgroundColor: 'gray',
    margin: 10,
    padding: 10,
    borderRadius: 12,
  },
  paidWrapper: {
    // backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    // width: '49%',
    borderRadius: 12,
  },
});
