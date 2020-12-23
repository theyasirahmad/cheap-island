import {combineReducers} from 'redux';
import authReducer from './AuthReducer';
// import userReducer from './userReducer';
const rootReducer = combineReducers({
  authReducer,
  //   userReducer,
});

export default rootReducer;
