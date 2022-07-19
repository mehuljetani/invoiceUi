import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {CircleButton, Header, InvoiceList} from '../../../components';
import {useState} from 'react';

const Invoice = () => {
  const [paid, setPaid] = useState(true);

  const onPaidPress = () => setPaid(!paid);

  const UnPaid = () => {
    return (
      <ScrollView>
        <Text style={styles.overDue}>OVERDUE</Text>
        <InvoiceList
          customerName={'Jonah Gulek'}
          invoiceNo={'0028'}
          days={20}
        />
        <InvoiceList
          customerName={'Mike Edward'}
          invoiceNo="0032"
          days={'30'}
        />
        <Text style={styles.overDue}>VIEWED</Text>
        <InvoiceList
          customerName={'Mike Edward'}
          invoiceNo={'0028'}
          days={20}
        />
        <InvoiceList
          customerName={'Mike Wilson'}
          invoiceNo={'0028'}
          days={20}
        />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header leftBtn={'MENU'} rightBtn="HELP" screenNname={'Invoices'} />
      <View style={styles.toggleWrapper}>
        <TouchableOpacity
          style={[
            styles.unPaidStyle,
            {
              backgroundColor: paid ? 'white' : '#F0F3F9',
            },
          ]}
          onPress={onPaidPress}>
          <Text style={{textAlign: 'center', fontSize: 18}}>Unpaid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paidStyle,
            {
              backgroundColor: paid ? '#F0F3F9' : 'white',
            },
          ]}
          onPress={onPaidPress}>
          <Text style={{textAlign: 'center', fontSize: 18}}>Paid</Text>
        </TouchableOpacity>
      </View>

      {paid === true ? (
        <UnPaid />
      ) : (
        <Text style={{textAlign: 'center', fontSize: 21, marginTop: 20}}>
          No Data Found
        </Text>
      )}
      <View style={styles.addBtnWrapper}>
        <CircleButton height={80} name={''} onPress={{}} />
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
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 10,
  },
  unPaidStyle: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
  },
  paidStyle: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
  },
  overDue: {
    fontSize: 16,
    letterSpacing: 2,
    color: 'gray',
    marginTop: 20,
    marginHorizontal: 20,
  },
  addBtnWrapper: {
    right: 20,
    position: 'absolute',
    bottom: 40,
  },
});
