import {ADDCUSTOMER, ADDPRODUCT, CUSCOUNT, LOGIN} from './type';

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
