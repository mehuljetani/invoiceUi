import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import {ActivityIndicator} from 'react-native-paper';
import {hp} from '../../../components/constants/Responsive';
import {Header, InputField, RectButton} from '../../../components';

const Detail = ({label, value}) => {
  return (
    <View style={{padding: 12, flexDirection: 'row', marginLeft: 30}}>
      <View style={{width: '40%'}}>
        <Text style={{fontSize: 16, color: 'black'}}>{label} </Text>
      </View>
      <View style={{width: '60%'}}>
        <Text style={{fontSize: 16, color: 'black'}}> : {value}</Text>
      </View>
    </View>
  );
};

const ProductDetail = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const data = route?.params?.data;

  useEffect(() => {
    fetch(route?.params?.data?.productImage).then(result => {
      setIsLoading(false);
    });
  }, []);

  const onBack = () => navigation.goBack();
  const onStock = stock => setStock(stock);
  const onEdit = (data, productDocId) => {
    navigation.navigate('UpdateProduct', {
      data: data,
      productDocId: productDocId,
    });
  };

  const productDocId = route?.params?.productDocId;
  const [stock, setStock] = useState(data.stock);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const addStock = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('Product')
      .doc(productDocId)
      .update({
        stock: stock,
      })
      .then(() => navigation.navigate('Dashboard'))
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.container}>
      <Header leftBtn={'BACK'} onPress={onBack} />
      <Text style={styles.NameStyle}>{data.productName}</Text>
      <View style={styles.imageWrapper}>
        {isLoading ? (
          <View style={{height: 130}}>
            <ActivityIndicator size={'large'} animating={true} />
          </View>
        ) : (
          <Image source={{uri: data?.productImage}} style={styles.imageStyle} />
        )}
      </View>
      <Detail label={'Product Name  '} value={data.productName} />
      <Detail label={'Stock  '} value={data.stock} />
      <Detail label={'Description  '} value={data.description} />
      <Detail label={'Price  '} value={data.price} />
      <Detail label={'IGST  '} value={data.igst} />
      <Detail label={'HSN Code  '} value={data.hsnCode} />
      <Modal
        animationInTiming={1000}
        isVisible={isModalVisible}
        style={{backgroundColor: 'white'}}
        animationOut={'zoomOut'}
        animationOutTiming={1000}
        animationIn={'zoomIn'}>
        <TouchableOpacity onPress={toggleModal} style={styles.toggleButton}>
          <Text style={{color: 'white', fontSize: 16}}>Close</Text>
        </TouchableOpacity>
        <InputField
          keyboardType={'numeric'}
          label={'Add Stock'}
          value={stock}
          onChangeText={onStock}
        />
        <RectButton btnName={'ADD STOCK '} iconImage={''} onPress={addStock} />
      </Modal>
      <View style={styles.btnWrapper}>
        <RectButton
          btnName={'Add Stock'}
          iconImage={''}
          onPress={toggleModal}
        />
        <RectButton
          btnName={'EDIT'}
          iconImage={require('../../../../assets/images/pencil.png')}
          onPress={() => onEdit(data, productDocId)}
        />
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  NameStyle: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
  },
  imageWrapper: {
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 130,
    width: 130,
  },
  btnWrapper: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 170 : 50,
    justifyContent: 'space-evenly',
  },
  toggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
    borderRadius: 9,
    padding: 5,
    backgroundColor: 'black',
  },
});
