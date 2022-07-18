import {ADDCUSTOMER} from '../action/type';

const INITIAL_STATE = {
  arr: [],
};

const addCusRedux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDCUSTOMER:
      // let array = state?.arr;
      // console.log('array', array.arr);
      // array.push(action.payload);
      // return {...state, arr: array};
      // console.log('state', action.payload[0].data());
      return {...state, arr: action.payload};
    default:
      return state;
  }
};

export default addCusRedux;
