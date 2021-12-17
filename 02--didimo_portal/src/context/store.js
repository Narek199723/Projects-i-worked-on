import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { SAVE_USER_LOGIN, INITIAL_STATE, USER_LOGOUT } from './constants';
import AsyncStorage from '@react-native-community/async-storage';
import { Auth } from 'aws-amplify';

const initialState = {
  user: {},
  loading: false,
  isAuth: false,
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE_USER_LOGIN:
      
      return {
        ...state,
        loading: false,
        user: payload,
        isAuth: true,
      };
    case INITIAL_STATE:
      return payload;
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        user: {},
        isAuth: false,
      };
    default:
      return state;
  }
}

export const GlobalContext = createContext(initialState);

export function StoreProvider(props) {

//   const navigate = useNavigate();
//   //const [state, dispatch] = useReducer(reducer, initialState);


   const [state, dispatch] = useReducer(reducer, [], () => {
     const localData = localStorage.getItem('PersistStore');
     return localData ? JSON.parse(localData) : initialState;
   });



  useEffect(() => {
    AsyncStorage.setItem('PersistStore', JSON.stringify(state));
  }, [state]);


  /*  useEffect(() => {
     AsyncStorage.getItem('PersistStore').then((value) => {
      if (value) {
        isUserAuthenticated();
        dispatch({
          type: INITIAL_STATE,
          payload: JSON.parse(value),
        });
      }
    }); 
  }, []);  */

  async function isUserAuthenticated() {
    return await Auth.currentAuthenticatedUser()
      .then((data) => {
        if (data?.username) {
          // navigate(`${process.env.REACT_APP_ROOT_PATH}/dashboard`, {
          //   replace: true,
          // });
        }
      })
      .catch((err) => {
        navigate(`${process.env.REACT_APP_ROOT_PATH}/login`, { replace: true });
      });
  }

  const storage = useCallback(async () => {
    AsyncStorage.setItem('PersistStore', JSON.stringify(state));
  }, []);

  useEffect(() => {
    storage();
  }, [storage]);

  const value = { state, dispatch };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
}
