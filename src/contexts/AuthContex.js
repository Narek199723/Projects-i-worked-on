import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import { firebaseConfig } from '../config/Firebase';
import { _log, getData } from "../utils";
import { useHistory } from "react-router-dom";
import firebase from "./../firebase/firebase.js";
import firebaseAnalytics from "./../firebase/firebaseAnalytics";
// import firestore from './../firebase/firestore.js'

// ----------------------------------------------------------------------

const ADMIN_EMAILS = ["demo@minimals.cc"];

// if (!firebase.apps.length) {
//   console.log(process.env)
//   firebase.initializeApp(firebaseConfig);
//   firebase.firestore();
// }
const db = firebase.firestore();
const DBusers = db.collection("users");

//Store user details

export const setUserDetailsByUserId = async (uid, payload) => {
  try {
    DBusers.doc(uid).update({
      email: payload.email,
      displayName: payload.displayName,
      photoURL: payload.photoURL,
      timeZone: new Date().getTimezoneOffset(),
      updatedAt: new Date(),
    });
  } catch (error) {}
};
export const getUserByUserId = async (uid) => {
  return await DBusers.doc(uid)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        //_log(doc.data())
        return doc.data();
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
      return false;
    });
};
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  fireStoreuserObj: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIALISE") {
    const { isAuthenticated, user, fireStoreuserObj } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      fireStoreuserObj,
      user,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: "firebase",
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authtoken, setAuthToken] = useState(null);

  let history = useHistory();

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          user.getIdToken().then(async (jwtToken) => {
            let fireStoreUserStatus = await getData(
              `${process.env.REACT_APP_BASE_API_URL}/user/auth/google/verify`,
              jwtToken
            );

            if (fireStoreUserStatus.tokensValid) {
              setUserDetailsByUserId(firebase.auth().currentUser.uid, {
                displayName: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                photoURL: firebase.auth().currentUser.photoURL,
              });

              let fireStoreuserObj = await getUserByUserId(
                firebase.auth().currentUser.uid
              );
              fireStoreuserObj.uid = firebase.auth().currentUser.uid;
              dispatch({
                type: "INITIALISE",
                payload: { isAuthenticated: true, user, fireStoreuserObj },
              });
            } else {
              console.log(user, "fireStoreUser");
              //window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar&access_type=offline&include_granted_scopes=true&response_type=code&state=${user.uid}_${process.env.REACT_APP_APP_ENV}&redirect_uri=https%3A//us-central1-vivid-canyon-321112.cloudfunctions.net/user/auth/google&client_id=55366784204-n9kk8f1m4obvd3opur2g9dboqurhlh4j.apps.googleusercontent.com&login_hint=${user.email}`;
              window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=${user.uid}_${process.env.REACT_APP_APP_ENV}&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT_URL}&client_id=${process.env.REACT_APP_AUTH_CLIENT_ID}&login_hint=${user.email}`;
            }
          });
          let fireStoreUser = await getUserByUserId(user.uid);

          // if(!fireStoreUser){

          // }

          // const docRef = firebase.firestore().collection('users').doc(user.uid);
          // docRef
          //   .get()
          //   .then((doc) => {
          //     if (doc.exists) {
          //       setProfile(doc.data());
          //     }
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //   });
          // dispatch({
          //   type: 'INITIALISE',
          //   payload: { isAuthenticated: true, user },
          // });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    [dispatch]
  );

  const login = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(async function (jwtToken) {
            setAuthToken(jwtToken);
            let fireStoreUserStatus = await getData(
              `${process.env.REACT_APP_BASE_API_URL}/user/auth/google/verify`,
              jwtToken
            );
            console.log(fireStoreUserStatus, "fireStoreUserStatus");
            if (!fireStoreUserStatus.tokensValid) {
              //window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar&access_type=offline&include_granted_scopes=true&response_type=code&state=${result.user.uid}_${process.env.REACT_APP_APP_ENV}&redirect_uri=https%3A//us-central1-vivid-canyon-321112.cloudfunctions.net/user/auth/google&client_id=55366784204-n9kk8f1m4obvd3opur2g9dboqurhlh4j.apps.googleusercontent.com&login_hint=${result.user.email}`;
            } else {
              _log(firebase.auth().currentUser);
              setUserDetailsByUserId(firebase.auth().currentUser.uid, {
                displayName: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                photoURL: firebase.auth().currentUser.photoURL,
              });
            }
          });
      })
      .catch((error) => {
        firebaseAnalytics.logEvent("login", {
          success: false,
          error_code: error.toJSON().code,
          error_msg: error.toJSON().message,
        });
      });
  };

  const register = (email, password, firstName, lastName) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            email,
            displayName: `${firstName} ${lastName}`,
          });
      });

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "firebase",
        user: {
          id: auth.uid,
          email: auth.email,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(auth.email) ? "admin" : "user",
          phoneNumber: auth.phoneNumber || profile?.phoneNumber || "",
          country: profile?.country || "",
          address: profile?.address || "",
          state: profile?.state || "",
          city: profile?.city || "",
          zipCode: profile?.zipCode || "",
          about: profile?.about || "",
          isPublic: profile?.isPublic || false,
        },
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
