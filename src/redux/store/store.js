import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer/index';

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;
