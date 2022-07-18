import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TextBox} from '../../../components/index';

const InvoiceHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.menuWrappeer}>
        <TextBox text={'MENU'} />
        <TextBox text={'HELP'} />
      </View>
      <View style={styles.searchWrapper}>
        <Text style={styles.invoiceStyle}>Invoices</Text>
        <TouchableOpacity style={styles.searchBtnStyle}>
          <Image
            source={require('../../../../assets/images/search.png')}
            style={styles.searchStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InvoiceHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  menuWrappeer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchWrapper: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceStyle: {
    fontSize: 40,
    letterSpacing: 1,
    color: '#000',
  },
  searchBtnStyle: {},
  searchStyle: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});
