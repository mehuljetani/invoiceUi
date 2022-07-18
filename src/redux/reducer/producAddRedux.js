import {ADDPRODUCT} from '../action/type';

const INITIAL_STATE = {
  arr: [],
};

const productAddRedux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDPRODUCT:
      return {...state, arr: action.payload};
    default:
      return state;
  }
};

export default productAddRedux;
