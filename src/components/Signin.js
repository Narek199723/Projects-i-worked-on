import React, { Component } from "react";
import logo from "../logo.png";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../styles/content.css";
import imageName from "../bc-icon.png";
import firebase from "./../firebase/firebase.js";
import {
  getUserByUserId,
  setUserDetailsByUserId,
} from "./../firebase/firestore.js";
import { _log, getData } from "../utils";

let handleClick = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(async function (jwtToken) {
          let fireStoreUserStatus = await getData(
            `${process.env.REACT_APP_BASE_API_URL}/user/auth/google/verify`,
            jwtToken
          );

          if (!fireStoreUserStatus.tokensValid) {
            //window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar&access_type=offline&include_granted_scopes=true&response_type=code&state=${result.user.uid}_${process.env.REACT_APP_APP_ENV}&redirect_uri=https%3A//us-central1-vivid-canyon-321112.cloudfunctions.net/user/auth/google&client_id=55366784204-n9kk8f1m4obvd3opur2g9dboqurhlh4j.apps.googleusercontent.com&login_hint=${result.user.email}`
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=${result.user.uid}_${process.env.REACT_APP_APP_ENV}&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT_URL}&client_id=${process.env.REACT_APP_AUTH_CLIENT_ID}&login_hint=${result.user.email}`;
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
      //_log(error)
    });
};

export default class content extends Component {
  componentDidMount() {
    document.title = "Signin - bluecap™";
  }

  render() {
    return (
      <>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className="typography">
            <center>
              <img src={logo} className="bc-icon" />
            </center>
            <Typography className="welcome-txt">Welcome!</Typography>
            <p className="desc-txt">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod{" "}
            </p>

            <div className="google-button" onClick={handleClick}>
              <div className="col-md-10">
                <p>Google Calender</p>
                <p>Bluecap will sync with all the events in youor calendar</p>
              </div>
            </div>
            {/* <div className="col-md-2">
                                <span className="forward-icon"> {'>'} </span>
                            </div> */}

            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              style={{ marginTop: "360px" }}
            >
              {"Bluecap © "}
              <Link color="inherit" href="https://material-ui.com/">
                , All rights reserved,
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </div>
        </Container>
      </>
    );
  }
}
