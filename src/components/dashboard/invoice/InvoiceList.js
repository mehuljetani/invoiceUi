import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const InvoiceList = ({customerName, invoiceNo, days}) => {
  const letter = customerName.charAt(0);
  return (
    <View style={styles.container}>
      <View style={styles.invoiceWrapper}>
        <View style={styles.profile}>
          <Text style={{fontSize: 21, fontWeight: '500'}}>{letter}</Text>
        </View>
        <View style={styles.customerDetail}>
          <Text style={styles.customerStyle}>{customerName}</Text>
          <Text style={[styles.invoiceText, {color: 'gray'}]}>
            #invoice {invoiceNo}
          </Text>
        </View>
        <View style={styles.customerStyle}>
          <Text style={{fontSize: 18, letterSpacing: 1}}>$920.00</Text>
          <Text style={[styles.invoiceText, {color: 'red'}]}>
            Due {days} days ago
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InvoiceList;

const styles = StyleSheet.create({
  invoiceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  profile: {
    backgroundColor: '#F0F3F9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  customerDetail: {
    left: -30,
  },
  customerStyle: {
    fontSize: 18,
    letterSpacing: 1,
  },
  invoiceText: {
    marginTop: 5,
  },
  payment: {},
});
