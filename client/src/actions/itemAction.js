import axios from "axios";
import { LOGIN_USER, SIGNUP_USER } from './types';

export const loginUser = login_User =>dispatch => {
  axios
    .post('/api/items/login', login_User)
    .then(res=>
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      })
  );
}

export const signupUser = newUser => dispatch => {
  axios
    .post('/api/items/signup', newUser)
    .then(res=>
      dispatch({
        type: SIGNUP_USER,
        payload: res.data
      })
  );
}