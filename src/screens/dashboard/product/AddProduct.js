import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {CircleButton, Header, InputField} from '../../../components';
import {hp, wp} from '../../../components/constants/Responsive';

const AddProduct = ({navigation}) => {
  const [productName, setProductName] = useState('Blutooth');
  const [description, setDesscription] = useState('Best one...');
  const [stock, setStock] = useState('450');
  const [price, setPrice] = useState('120');
  const [igst, setIgst] = useState('28');
  const [hsnCode, setHsnCode] = useState('262655652548');
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
      })
      .catch(e => console.log(e));
  };

  const uploadImage = async () => {
    if (image === null) {
      Alert.alert('Plese Select the Profile Photo');
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
      Alert.alert('Image is not Successfully Uploaded');
      console.log(e);
      return null;
    }
  };

  const submitProduct = async () => {
    const imageUrl = await uploadImage();
    console.log('image url =======', imageUrl);
    const product = {
      productName: productName,
      description: description,
      stock: stock,
      price: price,
      igst: igst,
      hsnCode: hsnCode,
      productImage: imageUrl,
    };
    if (
      productName === '' ||
      description === '' ||
      stock === '' ||
      price === '' ||
      igst === '' ||
      hsnCode === '' ||
      image === ''
    ) {
      alert('all fields are required...');
      return 0;
    } else {
      firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .collection('Product')
        .add(product)
        .then(() => {
          setProductName('');
          setDesscription('');
          setStock('');
          setPrice('');
          setIgst('');
          setHsnCode('');
          setImage('');
          alert('product added');
          navigation.navigate('Dashboard');
        })
        .catch(e => console.log(e));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header
          btnName={'CANCEL'}
          screenNname={'Add Product'}
          onPress={onCancel}
        />
      </SafeAreaView>
      <Text style={styles.productText}>Product Detail</Text>

      <ScrollView>
        <View style={styles.inputWrapper}>
          <View style={styles.fileWrapper}>
            <Text style={{left: -30, color: 'black', fontSize: 16}}>
              Choose File
            </Text>
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
            <TouchableOpacity onPress={handleChoosePhoto}>
              <View style={styles.imageWrapper}>
                <Image
                  source={
                    image === ''
                      ? require('../../../../assets/images/upload.png')
                      : {uri: image}
                  }
                  style={styles.imageStyle}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <InputField
              label={'Product Name'}
              value={productName}
              onChangeText={onProductName}
            />
            <InputField
              label={'Description'}
              value={description}
              onChangeText={onDescription}
            />
            <InputField
              label={'Stock'}
              value={stock}
              onChangeText={onStock}
              keyboardType={'numeric'}
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
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonStyle}>
        <CircleButton
          name={'SUBMIT'}
          height={80}
          buttonType={'submit'}
          onPress={submitProduct}
        />
      </View>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    marginHorizontal: wp(4),
  },
  productText: {
    fontSize: 21,
    marginHorizontal: 20,
    color: 'black',
  },
  fileWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
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
  buttonStyle: {
    bottom: Platform.OS === 'ios' ? hp(5) : hp(3),
    right: wp(3),
    position: 'absolute',
  },
});
