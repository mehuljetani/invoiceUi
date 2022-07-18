import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import {getStatusBarHeight} from 'react-native-status-bar-height';

export const wp = val => widthPercentageToDP(val);

export const hp = val => heightPercentageToDP(val);

export const fp = val => RFPercentage(val);

export const fv = val => RFValue(val);

export const statusBarHeight = getStatusBarHeight();
