import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {CircleButton, Header, InputField} from '../../../components';

const UpdateProduct = ({route, navigation}) => {
  const data = route?.params?.data;
  console.log('image url from data  ', data?.productImage);
  const productDocId = route?.params?.productDocId;

  const [productName, setProductName] = useState(data?.productName);
  const [description, setDesscription] = useState(data?.description);
  const [stock, setStock] = useState(data?.stock);
  const [price, setPrice] = useState(data?.price);
  const [igst, setIgst] = useState(data?.igst);
  const [hsnCode, setHsnCode] = useState(data?.hsnCode);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(null);

  const onCancel = () => navigation.goBack();
  const onProductName = pName => setProductName(pName);
  const onDescription = desc => setDesscription(desc);
  const onStock = stock => setStock(stock);
  const onPrice = price => setPrice(price);
  const onIgst = igst => setIgst(igst);
  const onHsnCode = hsnCode => setHsnCode(hsnCode);

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 480,
      cropping: true,
    })
      .then(image => {
        console.log('image::::', image);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
        console.log('image url ', imageUri);
      })
      .catch(e => {
        alert('');
        console.log(e);
      });
  };

  const uploadImage = async () => {
    if (image === null) {
      alert('Plese Select the Profile Photo');
      return 0;
    }
    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = name + Date.now() + '.' + extension;
    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`photos/${fileName}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      return url;
    } catch (e) {
      alert('Image is not Successfully Uploaded');
      console.log(e);
      return null;
    }
  };

  const handleUpdate = async () => {
    const imageUrl = await uploadImage();
    const product = {
      productName: productName,
      description: description,
      stock: stock,
      price: price,
      igst: igst,
      hsnCode: hsnCode,
      productImage: imageUrl,
    };
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .collection('Product')
      .doc(productDocId)
      .update(product)
      .then(() => {
        alert('Updated Successfully !!! ');
        navigation.navigate('Dashboard');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        btnName={'CANCEL'}
        screenNname={'Update Product'}
        onPress={onCancel}
      />
      <ScrollView>
        <View style={styles.fileWrapper}>
          <Text style={{color: 'black', fontSize: 16}}>Choose File</Text>
          <Text style={{left: -30, color: 'black', fontSize: 16}}>
            {uploading ? (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text>{transferred} % Done!</Text>
                <ActivityIndicator animating={true} color={'#DA5B22'} />
              </View>
            ) : (
              <View></View>
            )}
          </Text>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            style={styles.imageWrapper}>
            <Image
              source={
                image === ''
                  ? require('../../../../assets/images/upload.png')
                  : {uri: image}
              }
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </View>

        <InputField
          label={'Product Name'}
          value={productName}
          onChangeText={onProductName}
        />
        <InputField
          label={'Stock'}
          value={stock}
          onChangeText={onStock}
          keyboardType={'numeric'}
        />
        <InputField
          label={'Description'}
          value={description}
          onChangeText={onDescription}
        />
        <InputField
          label={'Price'}
          value={price}
          onChangeText={onPrice}
          keyboardType={'numeric'}
        />
        <InputField
          label={'IGST'}
          value={igst}
          onChangeText={onIgst}
          keyboardType={'numeric'}
        />
        <InputField
          label={'HSN Code'}
          value={hsnCode}
          onChangeText={onHsnCode}
          keyboardType={'numeric'}
        />
      </ScrollView>
      <View style={styles.updateButton}>
        <CircleButton name={'Update'} height={82} onPress={handleUpdate} />
      </View>
    </View>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fileWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageWrapper: {
    borderWidth: 1,
    height: 85,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  imageStyle: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
  },
  updateButton: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
});
