import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {CircleButton, InputField, LogoName} from '../../components/index';
import {hp, wp, fv} from '../../components/constants/Responsive';
import {login} from '../../redux/action/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [passVisible, setPassVisible] = useState(true);
  const [password, setPassword] = useState('123456');
  const [email, setEmail] = useState('user@gmail.com');

  const viewPass = require('../../../assets/images/view.png');
  const hidePass = require('../../../assets/images/hidden.png');

  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const onEmail = val => setEmail(val);
  const onPassword = pass => setPassword(pass);
  const onPassVisible = () => setPassVisible(!passVisible);

  const handleLogin = () => {
    if (email === '' || password === '') {
      alert("field can't be empty");
      return 0;
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async data => {
          const userdetail = {
            UID: data?.user?._user?.uid,
            email: data?.user?.email,
          };
          await AsyncStorage.setItem('UID', userdetail.UID);
          dispatch(login(userdetail));
          navigate('Dashboard');
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const loginAsync = async () => {
    const loginId = await AsyncStorage.getItem('UID');
    loginId && navigate('Dashboard');
  };

  useEffect(() => {
    loginAsync();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require(`../../../assets/images/login.png`)}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.logoWrapper}>
        <LogoName name={'ELIT Login'} />
      </View>
      <View style={styles.logoNameWrapper}>
        <InputField
          label={'Email Address'}
          value={email}
          onChangeText={onEmail}
        />
        <TextInput
          label="Password"
          variant="standard"
          secureTextEntry={passVisible ? true : false}
          style={styles.passwordStyle}
          underlineColor={'black'}
          value={password}
          onChangeText={onPassword}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <TouchableOpacity
          onPress={onPassVisible}
          style={{
            position: 'absolute',
            bottom: 9,
            right: 27,
          }}>
          <Image
            source={passVisible === true ? hidePass : viewPass}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nextButtonWrapper}>
        <CircleButton
          name={'NEXT'}
          onPress={handleLogin}
          height={90}
          buttonType={'submit'}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {marginLeft: wp(-6), marginBottom: hp(1)},
  imageStyle: {
    height: hp(40),
    width: wp(50),
    resizeMode: 'contain',
  },
  logoWrapper: {
    marginHorizontal: wp(7),
    marginBottom: hp(2),
  },
  logoNameWrapper: {
    // marginHorizontal: wp(7),
  },
  passwordStyle: {
    fontSize: 16,
    marginHorizontal: 20,
    backgroundColor: '#F4F4F4',
  },
  nextButtonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: wp(7),
    marginVertical: hp(7),
  },
});
