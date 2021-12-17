import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { Redirect, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import useAuth from "../../hooks/useAuth";
// import logo from '../../assets/images/logo.svg';
import logo from "../../assets/images/logo-blk.png";
import rightarrow from "../../assets/images/rightArrow.svg";
import Hidden from "@material-ui/core/Hidden";
import firebaseAnalytics from "./../../firebase/firebaseAnalytics";
import clsx from "clsx";
import Checkbox from "@material-ui/core/Checkbox";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    borderRadius: "6px",
  },
  clckText: {
    fontSize: "10px",
    marginTop: "20px",
  },
  agreeText: {
    fontSize: "12px",
    marginLeft: "5px",
  },
  textDeco: {
    textDecoration: "none",
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

// custom checkbox
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      autoFocus={true}
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ "aria-label": "decorative checkbox" }}
      {...props}
    />
  );
}

function Login({ ...props }) {
  const search = useLocation().search;
  const selectedPlan = new URLSearchParams(search).get("plan");
  const selectedCurrency = new URLSearchParams(search).get("currency");
  const planObj = {
    basic: "0",
    advanced: "1",
    professional: "2",
    business: "3",
  };
  const currencyObj = {
    usd: "0",
    cad: "1",
    aud: "2",
    gbp: "3",
    euro: "4",
    nzd: "5",
  };

  useEffect(() => {
    document.title = "Signin - BlueCAP";

    if (planObj[selectedPlan]) {
      localStorage.setItem("selectedPlan", planObj[selectedPlan]);
    }

    if (currencyObj[selectedCurrency]) {
      localStorage.setItem("selectedCurrency", currencyObj[selectedCurrency]);
    }
  }, []);

  const classes = useStyles();
  const { loginWithGoogle, isAuthenticated, fireStoreuserObj } = useAuth();
  const [checked, setChecked] = React.useState(false);
  const [errortxt, setErrortxt] = React.useState(false);

  const handleLoginGoogle = async () => {
    if (checked == true) {
      setErrortxt(false);
      try {
        await loginWithGoogle();
      } catch (error) {
        console.error(error);
      }
    } else {
      // props.showSnackbar({
      //   show: true,
      //   severity: "error",
      //   message: "Please indicate that you have read and agreed to the terms and privacy policy.",
      // });
      setErrortxt(true);
    }
  };

  if (isAuthenticated) {
    if (fireStoreuserObj.organizationId) {
      firebaseAnalytics.logEvent("login", {
        success: true,
        member_id: fireStoreuserObj.uid,
      });
      return <Redirect to="/dashboard" />;
    }
    return <Redirect to="/welcome" />;
  }

  const handleCheckboxClick = (e) => {
    setChecked(e.target.checked);
    e.target.checked == true ? setErrortxt(false) : setErrortxt(true);
  };

  return (
    <>
      <Container component="main" maxWidth="sm" id="login-container">
        <Grid container>
          <Grid item sm={12} xs={12}>
            <Box
              style={{ position: "relative" }}
              height="700px"
              p={3}
              className={classes.paper}
            >
              <Box height="100%" bgcolor="white" display="inline-block">
                <div className="justify-center">
                  <img src={logo} alt="" className="img-fluid logo" />
                </div>

                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  className="mt-3"
                >
                  <Grid item sm={8} xs={12} style={{ zIndex: "9999" }}>
                    <div className="desc-login mt-3">
                      <p>
                        Welcome and get started with your work email address and
                        transform your meeting experience.
                      </p>
                      <p className={classes.clckText}>
                        Please note your application for public beta must be
                        first reviewed and approved by bluecap™ team in order to
                        activate your account. If you have not already done so,{" "}
                        <a
                          href="https://www.bluecap.ai/#form-mainsection"
                          target="_blank"
                          className={classes.textDeco}
                        >
                          click here
                        </a>{" "}
                      </p>
                    </div>
                  </Grid>
                  <Grid item sm={12} xs={12} className="mt-3">
                    <div className="signIn-text" onClick={handleLoginGoogle}>
                      <Grid container>
                        <Grid item xs={2} className="google-icon p-18">
                          <img src="/images/g-logo.png" height="30"></img>
                        </Grid>
                        <Grid item xs={8} className="gtext-block">
                          <Typography className="google-text">
                            Google Calendar
                          </Typography>
                          <Typography className="bluecap-desc">
                            bluecap™ will sync with all the events in your
                            calendar.
                          </Typography>
                        </Grid>
                        <Grid item xs={2} className="login-arrow">
                          <img src={rightarrow} alt="" />
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Box>
              <p>bluecap™ ©, All rights reserved, {new Date().getFullYear()}</p>
              {/* <a href="#">click me</a> */}
              <Hidden only={["sm", "xs"]}>
                <div
                  style={{
                    width: "100px",
                    position: "absolute",
                    left: "520px",
                    top: "-20px",
                    zIndex: "-1",
                  }}
                >
                  <img src="/images/vector-5.png"></img>
                </div>

                <div
                  style={{
                    width: "200px",
                    position: "absolute",
                    left: "-160px",
                    top: "480px",
                  }}
                >
                  <img src="/images/mascot.png"></img>
                </div>

                <div
                  style={{
                    width: "50px",
                    position: "absolute",
                    left: "-180px",
                    top: "490px",
                  }}
                >
                  <img src="/images/vector-2.png"></img>
                </div>

                <div
                  style={{
                    width: "200px",
                    position: "absolute",
                    left: "480px",
                    top: "540px",
                  }}
                >
                  <img src="/images/latop-vector.png"></img>
                </div>

                <div
                  style={{
                    width: "100px",
                    position: "absolute",
                    left: "650px",
                    top: "520px",
                  }}
                >
                  <img src="/images/vector-4.png"></img>
                </div>

                <div
                  style={{
                    width: "30px",
                    position: "absolute",
                    left: "600px",
                    top: "100px",
                  }}
                >
                  <img src="/images/vector-5.png"></img>
                </div>

                <div
                  style={{
                    width: "30px",
                    position: "absolute",
                    left: "620px",
                    top: "470px",
                  }}
                >
                  <img src="/images/vector-6.png"></img>
                </div>
              </Hidden>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginTop="10px"
            >
              <StyledCheckbox onClick={handleCheckboxClick} />
              <p className={classes.agreeText}>
                I agree to the{" "}
                <a
                  href="https://www.bluecap.ai/terms"
                  target="_blank"
                  className={classes.textDeco}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="https://www.bluecap.ai/privacy-policy"
                  target="_blank"
                  className={classes.textDeco}
                >
                  Privacy Policy.
                </a>
              </p>
            </Box>
            {errortxt && (
              <FormHelperText style={{ color: "red", textAlign: "center" }}>
                Please indicate that you have read and agreed to the terms and
                privacy policy.
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
