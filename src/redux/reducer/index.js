import {combineReducers} from 'redux';
import addCusRedux from './addCusRedux';
import loginReducer from './loginReducer';
import productAddRedux from './producAddRedux';

const reducers = combineReducers({
  login: loginReducer,
  addCustomer: addCusRedux,
  productAdd: productAddRedux,
});

export default reducers;
