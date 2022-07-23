import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigation/StackNav';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import SplashScreen from 'react-native-splash-screen';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

rnBiometrics.isSensorAvailable().then(resultObject => {
  const {available, biometryType} = resultObject;

  if (available && biometryType === BiometryTypes.TouchID) {
    console.log('TouchID is supported');
  } else if (available && biometryType === BiometryTypes.FaceID) {
    console.log('FaceID is supported');
  } else if (available && biometryType === BiometryTypes.Biometrics) {
    console.log('Biometrics is supported');
  } else {
    console.log('Biometrics not supported');
  }
});

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNav />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
