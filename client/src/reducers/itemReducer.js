import { LOGIN_USER, SIGNUP_USER } from '../actions/types';

const initialState = {
  signup_success:false,
  signup_message:'',
  login_success: false,
  login_message: ''
}

export default function(state = initialState, action){
  switch(action.type){
    case LOGIN_USER:
      return {
        ...state,
        login_success: action.payload.success,
        login_message: action.payload.message
      }
    case SIGNUP_USER:
      console.log(action.payload);
      return {
        ...state,
        signup_success: action.payload.success,
        signup_message: action.payload.message
      }
    default:
      return state;
  }
}