import * as types from '../types';

const initalState = {
  isLoading: false,
  isResendCodeLoading: false,
  isResendCodeSuccess: true,
  user: null,
  isError: false,
  errorMessage: null,
  userMode: null,
};

const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        ...action.payload,
      };

    case types.CREATE_USER_ACCOUNT_SUCCESS:
    case types.CREATE_USER_ACCOUNT_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case types.RESET_AUTH:
      return initalState;

    default:
      return state;
  }
};

export default authReducer;

// const authReducer = (state = initalState, action) => {
//   switch (action.type) {
//     case types.LOADING:
//       return {
//         ...state,
//         ...action.payload,
//       };

//     case types.CREATE_USER_ACCOUNT_SUCCESS:
//     case types.CREATE_USER_ACCOUNT_ERROR:
//       return {
//         ...state,
//         ...action.payload,
//       };
