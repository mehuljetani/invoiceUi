import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Header} from '../../../components/index';
import {fv, wp, hp} from '../../../components/constants/Responsive';
import {RectButton} from '../../../components/index';
import {useSelector} from 'react-redux';

const Product = ({navigation}) => {
  const product = useSelector(state => state?.productAdd?.arr);

  const onBack = () => navigation.goBack();
  const onAddProduct = () => navigation.navigate('AddProduct');
  const onProductDetail = (item, productDocId) => {
    navigation.navigate('ProductDetail', {
      data: item,
      productDocId: productDocId,
    });
  };

  const renderItem = ({item}) => {
    const productDocId = item.ref?._documentPath?._parts[3];
    item = item.data();
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    const letter = item.productName.charAt(0);

    return (
      <View style={styles.customerWrapper}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => onProductDetail(item, productDocId)}>
          <View
            style={[
              styles.btnWrapper,
              {
                borderColor: `rgba(${r},${g},${b},${0.1})`,
                backgroundColor: `rgba(${r},${g},${b}, ${0.3})`,
              },
            ]}>
            <Text style={styles.letterStyle}>{letter}</Text>
          </View>
          <View style={styles.customerDetail}>
            <Text style={styles.nameStyle}>{item.productName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header screenNname={'Products'} btnName={'BACK'} onPress={onBack} />
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{marginTop: 30}}
      />
      <View style={styles.buttonStyle}>
        <RectButton
          btnName={'Add Product'}
          iconImage={require('../../../../assets/images/add-product.png')}
          onPress={onAddProduct}
        />
      </View>
    </View>
  );
};

export default Product;

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
    marginVertical: hp(1.4),
  },
  btnWrapper: {
    height: Platform.OS === 'ios' ? hp(5) : hp(5.8),
    width: Platform.OS === 'ios' ? hp(5) : hp(5.8),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterStyle: {
    textAlign: 'center',
    fontSize: 21,
    color: 'black',
  },
  customerDetail: {
    marginLeft: wp(3),
  },
  nameStyle: {
    fontSize: 18,
    color: 'black',
    letterSpacing: 1,
    textAlign: 'center',
  },
  numberStyle: {
    marginTop: hp(1),
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    position: 'absolute',
    bottom: hp(7),
    right: 110,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
