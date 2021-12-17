import { CognitoAuth } from "amazon-cognito-auth-js/dist/amazon-cognito-auth";
import {
  CognitoUserPool,
  CognitoUserSession,
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { config as AWSConfig } from "aws-sdk";
// import appConfig from "../components/AppConfig";
import appConfig from './app-config'
import { getNextUrlCodeFromLocation } from "./routeUtils";

AWSConfig.region = appConfig.region;

// Creates a CognitoAuth instance
const createCognitoAuth = () => {
  const appWebDomain = appConfig.userPoolBaseUri
    .replace("https://", "")
    .replace("http://", "");
  const auth = new CognitoAuth({
    UserPoolId: appConfig.userPool,
    ClientId: appConfig.clientId,
    AppWebDomain: appWebDomain,
    TokenScopesArray: appConfig.tokenScopes,
    RedirectUriSignIn: appConfig.callbackUri,
    RedirectUriSignOut: appConfig.signoutUri,
  });
  return auth;
};

// Creates a CognitoUser instance
export const createCognitoUser = () => {
  const pool = createCognitoUserPool();
  return pool.getCurrentUser();
};

// Creates a CognitoUserPool instance
const createCognitoUserPool = () =>
  new CognitoUserPool({
    UserPoolId: appConfig.userPool,
    ClientId: appConfig.clientId,
  });

// Get the URI of the hosted sign in screen
export const getCognitoSignInUri = (redirectTo) => {
  /*const url = redirectTo
    ? redirectTo.pathname +
      (redirectTo.search ? redirectTo.search : "") +
      (redirectTo.hash ? redirectTo.hash : "")
    : "/dashboard";
  const redirectToHash = encodeRedirectTo(url);*/
  const redirectToHash = getNextUrlCodeFromLocation(redirectTo);
  // TODO: (adriano@20200320) Replace this with an actual path
  const signinUri = `${appConfig.userPoolBaseUri}/login?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.callbackUri}&state=${redirectToHash}`;
  return signinUri;
};

// Get the URI of the hosted sign in screen
export const getCognitoSignUpUri = (redirectTo) => {
  const redirectToHash = getNextUrlCodeFromLocation(redirectTo);
  // TODO: (adriano@20200320) Replace this with an actual path
  const signinUri = `${appConfig.userPoolBaseUri}/signup?response_type=code&client_id=${appConfig.clientId}&redirect_uri=${appConfig.callbackUri}&state=${redirectToHash}`;
  return signinUri;
};

// Parse the response from a Cognito callback URI (assumed a token or code is in the supplied href). Returns a promise.
export const parseCognitoWebResponse = (href) => {
  return new Promise((resolve, reject) => {
    const auth = createCognitoAuth();

    // userHandler will trigger the promise
    auth.userhandler = {
      onSuccess: function (result) {
        resolve(result);
      },
      onFailure: function (err) {
        reject(new Error("Failure parsing Cognito web response: " + err));
      },
    };
    auth.parseCognitoWebResponse(href);
  });
};

// Gets a new Cognito session. Returns a promise.
export const getCognitoSession = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = createCognitoUser();
    cognitoUser.getSession((err, result) => {
      if (err || !result) {
        reject(new Error("Failure getting Cognito session: " + err));
        return;
      }

      // Resolve the promise with the session credentials
      //console.debug("Successfully got session: " + JSON.stringify(result));
      const session = {
        credentials: {
          accessToken: result.accessToken.jwtToken,
          idToken: result.idToken.jwtToken,
          refreshToken: result.refreshToken.token,
        },
        user: {
          userName: result.idToken.payload["cognito:username"],
          email: result.idToken.payload.email,
        },
      };
      resolve(session);
    });
  });
};

// Sign out of the current session (will redirect to signout URI)
export const signOutCognitoSession = () => {
  const auth = createCognitoAuth();
  auth.signOut();
};

// Delete the current user
export const deleteUser = () => {
  const cognitoUser = createCognitoUser();

  cognitoUser.getSession((err, result) => {
    if (err) {
      //alert("getSession:Message: " + (err.message || JSON.stringify(err)));
    }
    cognitoUser.deleteUser(function (err, result) {
      if (err) {
        //alert("deleteUser:Message: " + (err.message || JSON.stringify(err)));
        return;
      }
    });
  });
};

export const setCognitoUserSession = (idToken, accessToken, refreshToken) => {
  const _idToken = new CognitoIdToken({ IdToken: idToken });
  const _accessToken = new CognitoAccessToken({ AccessToken: accessToken });
  const _refreshToken = new CognitoRefreshToken({ RefreshToken: refreshToken });

  const localSession = new CognitoUserSession({
    IdToken: _idToken,
    RefreshToken: _refreshToken,
    AccessToken: _accessToken,
  });

  const userPool = createCognitoUserPool();

  const localUser = new CognitoUser({
    Username: _accessToken.payload.username,
    Pool: userPool,
    Storage: userPool.storage,
  });
  localUser.setSignInUserSession(localSession);
};

export default {
  createCognitoAuth,
  createCognitoUser,
  createCognitoUserPool,
  deleteUser,
  getCognitoSession,
  getCognitoSignInUri,
  getCognitoSignUpUri,
  parseCognitoWebResponse,
  signOutCognitoSession,
  setCognitoUserSession,
};
