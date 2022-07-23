import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigation/StackNav';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import SplashScreen from 'react-native-splash-screen';

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
