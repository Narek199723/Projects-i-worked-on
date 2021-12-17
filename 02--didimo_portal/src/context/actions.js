import { USER_SET_TOKEN, SAVE_USER_LOGIN, USER_LOGOUT } from './constants';

export const setUserToken = (userToken) => {
  let localData = JSON.parse(localStorage.getItem('PersistStore')); 
  localData.user.accessToken = userToken.accessToken;
  localStorage.setItem('PersistStore',JSON.stringify(localData));
  return {
    type: USER_SET_TOKEN,
    payload: userToken.accessToken,
  };
};

export const saveLoginUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
  return {
    type: SAVE_USER_LOGIN,
    payload: userData,
  };
};

export const userLogout = () => {

  return {
    type: USER_LOGOUT,
  };
};
