import {LOGIN} from '../action/type';

const INITIAL_STATE = {
  arr: [],
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      // console.log('action payload ', action?.payload?.UID);
      return {...state, arr: action.payload};
    default:
      return state;
  }
};

export default loginReducer;
