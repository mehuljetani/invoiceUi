import {ADDCUSTOMER, ADDPRODUCT, CUSCOUNT, LOGIN} from './type';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const login = data => {
  return dispatch => {
    dispatch({
      type: LOGIN,
      payload: data,
    });
  };
};

export const addCustomer = data => {
  return dispatch => {
    dispatch({
      type: ADDCUSTOMER,
      payload: data,
    });
  };
};

export const productAdd = data => {
  return dispatch => {
    dispatch({
      type: ADDPRODUCT,
      payload: data,
    });
  };
};

export const getCustomerData = request => async dispatch => {
  console.log('request?.data?.collectionName :: ', request?.data?.collection);
  await firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .collection(request?.data?.collection)
    .get()
    .then(users => {
      console.log('Response :: ', users);
      dispatch(addCustomer(users.docs));
      if (request?.onSuccess) {
        request?.onSuccess(users.docs);
      }
    })
    .catch(e => console.log(e));
};
