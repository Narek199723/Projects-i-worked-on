import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import logo from '../../assets/images/logo.svg';
import logo from "../../assets/images/logo-blk.png";
import Radio from "../inputs/radio";
import { storeMeetingSettings } from "./../../firebase/firestore.js";
import firebaseAnalytics from "./../../firebase/firebaseAnalytics";
import firebase from "./../../firebase/firebase.js";
import useAuth from "../../hooks/useAuth";
import Hidden from "@material-ui/core/Hidden";

function Welcome() {
  useEffect(() => {
    document.title = "Meeting Details - BlueCAP";
  }, []);

  let history = useHistory();

  const { logout, fireStoreuserObj } = useAuth();
  const joinButton = {
    backgroundColor: "#2C73FF",
    boxShadow: "0px 11px 12px rgba(44, 115, 255, 0.25)",
    borderRadius: "6px",
    width: "224px",
    height: "48px",
    color: "#fff",
    textTransform: "unset",
  };

  const [organizationName, setOrganizationName] = useState("");
  const handleChangeOrgName = (e) => {
    setOrganizationName(e.target.value);
  };
  const [meetingType, setMeetingType] = useState("ALL");

  const changeListener = (value) => setMeetingType(value);

  const handleSubmit = async () => {
    const orgName = organizationName ? organizationName : "My Organization";
    const payload = {
      createdAt: new Date(),
      createdBy: firebase.auth().currentUser.uid,
      name: orgName,
    };
    const res = await storeMeetingSettings(payload, meetingType);
    if (res) {
      firebaseAnalytics.logEvent("sign up", {
        success: true,
        member_id: firebase.auth().currentUser.uid,
      });
      fireStoreuserObj.organizationId = true;
      history.push("/dashboard");
    }
  };

  if (fireStoreuserObj.organizationId) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Container className="main-container" maxWidth="sm">
        <Box
          bgcolor="#fff"
          borderRadius="6px"
          p={{ xs: 2, sm: 3, md: 4 }}
          style={{ position: "relative" }}
        >
          <Grid align="center">
            <img src={logo} width="300px" className="bc-icon" alt="" />

            <Typography variant="h4" gutterBottom>
              One last step
            </Typography>
            <Typography className="subtitle" variant="body2" gutterBottom>
              Please provide the following information.
            </Typography>
          </Grid>

          <div className="frm-block">
            <FormLabel component="legend" className="meeting-label">
              Organization name
            </FormLabel>
            <TextField
              className="organization-name"
              id="organization-name"
              name="organization-name"
              variant="outlined"
              fullWidth
              // defaultValue="My Organization"
              placeholder="My Organization"
              value={organizationName}
              onChange={handleChangeOrgName}
            />
          </div>
          <div className="frm-block">
            <FormLabel component="legend" className="meeting-label">
              Meeting settings
            </FormLabel>
            <Radio changeListener={changeListener} />
          </div>
          <div>
            <Grid align="center">
              <Button
                variant="contained"
                style={joinButton}
                onClick={handleSubmit}
              >
                Save and Continue
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

          <Hidden only={["sm", "xs"]}>
            <div
              style={{
                width: "200px",
                position: "absolute",
                left: "-160px",
                top: "740px",
              }}
            >
              <img src="/images/mascot.png"></img>
            </div>
          </Hidden>
        </Box>
      </Container>
    </>
  );
}

export default Welcome;
