import { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Signin from "./components/Signin";
import Header from "./components/header";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { _log } from "./utils";
import firebase from "./firebase/firebase.js";
import { getUserByUserId } from "./firebase/firestore.js";
import "firebase/auth";
import { Grid } from "@material-ui/core";
import Radio from "./components/inputs/radio";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

function App() {
  return (
    <>
      <div className="app-container">
        {/* <img src={logo} className="logo" /> */}

        <Route exact path="/login" component={Signin} />
        <Route path="/header" component={Header} />

        <PrivateRoute path="/welcome">
          <Welcome />
        </PrivateRoute>
      </div>
    </>
  );
}

function Welcome() {
  let history = useHistory();

  let logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        history.push("/");
      })
      .catch(function (error) {
        _log(error);
      });
  };

  const joinButton = {
    backgroundColor: "#2C73FF",
    boxShadow: "0px 11px 12px rgba(44, 115, 255, 0.25)",
    borderRadius: "6px",
    width: "224px",
    height: "48px",
    color: "#fff",
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box bgcolor="#fff" p={{ xs: 2, sm: 3, md: 4 }}>
          <Grid align="center">
            <img src={logo} className="bc-icon" />

            <Typography variant="h4" gutterBottom>
              One last step
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod
            </Typography>
          </Grid>
          <form action="organization-details" validate autoComplete="off">
            <div className="frm-block">
              <FormLabel component="legend">Organization name</FormLabel>
              <TextField
                required
                id="organization-name"
                name="organization-name"
                variant="outlined"
                fullWidth
                // defaultValue="My Organization"
                placeholder="Enter name here"
              />
            </div>
            <div className="frm-block">
              <FormLabel component="legend">Meeting settings</FormLabel>
              <Radio />
            </div>
            <div>
              <Grid align="center">
                <Button type="submit" variant="contained" style={joinButton}>
                  Join meeting
                </Button>
              </Grid>
            </div>
            <div>
              <Typography
                variant="body2"
                color="textPrimary"
                align="center"
                style={{ marginTop: "70px" }}
              >
                {"Bluecap © "}, All rights reserved, {new Date().getFullYear()}
                {"."}
              </Typography>
            </div>
          </form>

          {/* {firebase.auth().currentUser.displayName}! */}

          {/* <button onClick={logOut}>Logout!</button> */}
        </Box>
      </Container>
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  let history = useHistory();
  const [currentUser, setCurrentUser] = useState("loading");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        let fireStoreUser = await getUserByUserId(user.uid);
        if (fireStoreUser && fireStoreUser.oauth2Tokens) {
          setCurrentUser(fireStoreUser);
          if (location.pathname == "/") {
            history.push("/welcome");
          } else {
            history.push(`${location.pathname}${location.search}`);
          }
        } else {
          //window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/calendar&access_type=offline&include_granted_scopes=true&response_type=code&state=${user.uid}_${process.env.REACT_APP_APP_ENV}&redirect_uri=https%3A//us-central1-vivid-canyon-321112.cloudfunctions.net/user/auth/google&client_id=55366784204-n9kk8f1m4obvd3opur2g9dboqurhlh4j.apps.googleusercontent.com&login_hint=${user.email}`;
          window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly&access_type=offline&include_granted_scopes=true&response_type=code&state=${user.uid}_${process.env.REACT_APP_APP_ENV}&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT_URL}&client_id=${process.env.REACT_APP_AUTH_CLIENT_ID}&login_hint=${user.email}`;
        }
      } else {
        setCurrentUser(false);
      }
    });
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          currentUser == "loading" ? (
            <CircularProgress />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
