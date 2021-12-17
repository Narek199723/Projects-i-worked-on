import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Box,
  AppBar,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FormLabel from "@material-ui/core/FormLabel";
import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";
import LinearProgress from "@mui/material/LinearProgress";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { StyledEngineProvider } from "@mui/material/styles";
import firebase from "./../../firebase/firebase.js";
import { getData, postData } from "./../../utils";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  pl: {
    paddingLeft: "20px",
  },
  bg: {
    backgroundColor: "unset",
    boxShadow: "unset",
    fontWeight: "500",
  },
  mb20: {
    paddingTop: "20px",
  },
  radioColor: {
    color: "#2C73FF !important",
  },
  lableFont: {
    fontSize: "18px",
    color: "#000",
    fontWeight: "600",
    marginBottom: "30px",
  },
  priceTxt: {
    color: "#2C73FF",
    fontSize: "22px",
  },
  priceBox: {
    height: "450px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "20px",
    width: "250px",
    boxShadow: "0px 0px 15px 0px #D0D0D0",
    marginTop: "10px",
  },
  freetxt: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
  },
  zeroTxt: {
    color: "#2C73FF",
    fontSize: "22px",
    textAlign: "center",
  },
  detailTxt: {
    fontSize: "12px",
    textAlign: "center",
    padding: "10px",
  },
  colorPrimary: {
    backgroundColor: "#b345d2",
  },
  barColorPrimary: {
    backgroundColor: "green",
  },
}));

const Root = styled("span")(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: #B3C3D3;
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  &.${switchUnstyledClasses.checked} { 
    .${switchUnstyledClasses.thumb} {
      left: 14px;
      top: 3px;
      background-color: #FFF;
    }

    .${switchUnstyledClasses.track} {
      background: #007FFF;
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`);

function SubscriptionPlans(props) {
  const classes = useStyles();
  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };
  const [progress, setProgress] = React.useState(0);
  const [usage, setUsage] = React.useState(null);
  const [expanded, setExpanded] = React.useState("panel1");

  const [currentPlan, setCurrentPlan] = useState(false);
  const [confirmDialogStatus, setConfirmDialogStatus] = useState(false);
  const [newPlan, setNewPlan] = useState(null);

  React.useEffect(() => {
    if (props.hasBilling) {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(async function (jwtToken) {
          let currentPlanResponce = await getData(
            `${process.env.REACT_APP_BASE_API_URL}/payment/getUserPlan`,
            jwtToken
          );
          console.log("currentPlanResponce", currentPlanResponce);
          if (currentPlanResponce.status == "success") {
            //setClientSecret(clientSecretResponce.data.clientSecret)
            setCurrentPlan(currentPlanResponce.data.planType);
          }

          let usageResponce = await getData(
            `${process.env.REACT_APP_BASE_API_URL}/user/getUsage`,
            jwtToken
          );

          if (usageResponce.status == "success") {
            if (usageResponce.data.freeMinutes) {
              if (
                usageResponce.data.usedMinutes > usageResponce.data.freeMinutes
              ) {
                setProgress(
                  (100 * usageResponce.data.freeMinutes) /
                    usageResponce.data.usedMinutes
                );
              } else {
                setProgress(
                  (100 * usageResponce.data.usedMinutes) /
                    usageResponce.data.freeMinutes
                );
              }
              setUsage({
                freeMinutes: usageResponce.data.freeMinutes,
                usedMinutes: usageResponce.data.usedMinutes,
              });
            }

            // else{

            //     usageResponce.data.freeMinutes = 120
            //     usageResponce.data.usedMinutes = 180

            //     if(usageResponce.data.usedMinutes > usageResponce.data.freeMinutes){

            //         setProgress(100*usageResponce.data.freeMinutes/usageResponce.data.usedMinutes);
            //     }else{
            //         setProgress(100*usageResponce.data.usedMinutes/usageResponce.data.freeMinutes);
            //     }
            //     setUsage({freeMinutes:usageResponce.data.freeMinutes, usedMinutes:usageResponce.data.usedMinutes})
            // }
          }
        });
    } else {
      window.location.href = "/payment";
    }

    setProgress(75);
    // const timer = setInterval(() => {
    //     setProgress((oldProgress) => {
    //         if (oldProgress === 100) {
    //             return 0;
    //         }
    //         const diff = Math.random() * 10;
    //         return Math.min(oldProgress + diff, 100);
    //     });
    // }, 500);

    // return () => {
    //     clearInterval(timer);
    // };
  }, []);

  const getPrice = (data) => {
    setNewPlan(data.planType);
    setConfirmDialogStatus(true);
    return;

    // console.log(data);

    // firebase.auth().currentUser.getIdToken().then(async function (jwtToken) {

    //     let changePlanResponce = await getData(`${process.env.REACT_APP_BASE_API_URL}/payment/changePlan/${data.planType}`, jwtToken)
    //     console.log("changePlanResponce", changePlanResponce)
    //     if(changePlanResponce.status == "success"){
    //         //setClientSecret(clientSecretResponce.data.clientSecret)
    //         setCurrentPlan(data.planType)
    //     }
    // })
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleConfirmCancel = () => {
    console.log("cancel");
    setConfirmDialogStatus(false);
    setNewPlan(null);
  };

  const handleConfirmOk = () => {
    if (newPlan) {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(async function (jwtToken) {
          let changePlanResponce = await getData(
            `${process.env.REACT_APP_BASE_API_URL}/payment/changePlan/${newPlan}`,
            jwtToken
          );
          console.log("changePlanResponce", changePlanResponce);
          if (changePlanResponce.status == "success") {
            //setClientSecret(clientSecretResponce.data.clientSecret)
            setCurrentPlan(newPlan);
            setNewPlan(null);
            setConfirmDialogStatus(false);
          }
        });
    }
  };

  return (
    <div>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={confirmDialogStatus}
      >
        <DialogContent dividers>
          {`Are you sure you want to change plan from ${currentPlan} to ${newPlan}?`}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleConfirmCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirmOk}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Grid className={classes.mb20}>
        <FormLabel component="legend" className={classes.lableFont}>
          Plans
        </FormLabel>
        <StyledEngineProvider injectFirst>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                backgroundColor="#fff"
                borderRadius="6px"
                width="100%"
                padding="0 20px"
              >
                <Box>
                  {currentPlan == "basic" && (
                    <>
                      {" "}
                      <div>Basic</div>
                      <div className={classes.priceTxt}>$0</div>{" "}
                    </>
                  )}
                  {currentPlan == "advanced" && (
                    <>
                      {" "}
                      <div>Advanced</div>
                      <div className={classes.priceTxt}>$13</div>{" "}
                    </>
                  )}
                  {currentPlan == "professional" && (
                    <>
                      {" "}
                      <div>Professional</div>
                      <div className={classes.priceTxt}>$22</div>{" "}
                    </>
                  )}
                  {currentPlan == "business" && (
                    <>
                      {" "}
                      <div>Business</div>
                      <div className={classes.priceTxt}>$150</div>{" "}
                    </>
                  )}
                </Box>
                <Box display="none">
                  <div>Active till</div>
                  <div style={{ fontWeight: "600" }}>November 21 , 2021</div>
                </Box>
                <Box display="none">
                  <div>Auto renewal</div>
                  <div>
                    <SwitchUnstyled
                      component={Root}
                      {...label}
                      defaultChecked
                    />
                  </div>
                </Box>

                {usage && (
                  <div className="header-credit" style={{ minWidth: "100px" }}>
                    <Box sx={{ fontSize: 14 }}>Usage</Box>
                    {usage.usedMinutes > usage.freeMinutes ? (
                      <Box display="flex" justifyContent="space-between">
                        <p style={{ fontSize: "10px", paddingRight: "10px" }}>
                          Plan hours
                        </p>
                        <p style={{ fontSize: "10px" }}>Exceeded time</p>
                      </Box>
                    ) : (
                      <p style={{ fontSize: "10px" }}>Plan hours</p>
                    )}

                    <span>
                      <LinearProgress
                        classes={
                          usage.freeMinutes < usage.usedMinutes
                            ? {
                                colorPrimary: classes.colorPrimary,
                                barColorPrimary: classes.barColorPrimary,
                              }
                            : { barColorPrimary: classes.barColorPrimary }
                        }
                        variant="determinate"
                        value={progress}
                      />
                    </span>

                    {usage.usedMinutes > usage.freeMinutes ? (
                      <Box
                        style={{ fontSize: "10px" }}
                        display="flex"
                        justifyContent="space-between"
                      >
                        <p>100%</p>

                        {Math.round(
                          (Math.round((usage.usedMinutes / 60) * 100) / 100 -
                            Math.round((usage.freeMinutes / 60) * 100) / 100) *
                            100
                        ) /
                          100 >
                        1 ? (
                          <p>
                            {Math.round(
                              (Math.round((usage.usedMinutes / 60) * 100) /
                                100 -
                                Math.round((usage.freeMinutes / 60) * 100) /
                                  100) *
                                100
                            ) / 100}{" "}
                            hrs{" "}
                          </p>
                        ) : (
                          <p>
                            {Math.round(
                              (Math.round((usage.usedMinutes / 60) * 100) /
                                100 -
                                Math.round((usage.freeMinutes / 60) * 100) /
                                  100) *
                                100
                            ) / 100}{" "}
                            hr
                          </p>
                        )}
                      </Box>
                    ) : (
                      <p style={{ fontSize: "10px" }}>
                        {Math.round(
                          ((100 * usage.usedMinutes) / usage.freeMinutes) * 100
                        ) / 100}
                        %
                      </p>
                    )}
                  </div>
                )}
                <Box>
                  <Button variant="contained">Change Plan</Button>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-around"
                  marginBottom="20px"
                >
                  <Box className={classes.priceBox}>
                    <p className={classes.freetxt}>Basic</p>
                    <p className={classes.zeroTxt}>$0</p>
                    <hr
                      style={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                        margin: "10px 0",
                      }}
                    />
                    <p className={classes.detailTxt}>
                      Maximum of 15 Meetings. Unlimited hours*
                    </p>
                    <p className={classes.detailTxt}>
                      Free Transcripts Google Meet Only
                    </p>
                    <p className={classes.detailTxt}>
                      Unlimited interactions with bluecap during meetings
                    </p>

                    {currentPlan == "basic" ? (
                      <Button
                        onClick={(e) => {
                          //getPrice({ planType: 'basic', price: '0' });
                        }}
                        variant="contained"
                        // color="error"
                        fullWidth="true"
                        style={{
                          marginTop: "112px",
                          backgroundColor: "#A9A9A9",
                          cursor: "not-allowed",
                        }}
                      >
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          getPrice({ planType: "basic", price: "0" });
                        }}
                        variant="contained"
                        color="error"
                        fullWidth="true"
                        style={{ marginTop: "112px" }}
                      >
                        Downgrade
                      </Button>
                    )}
                  </Box>
                  <Box className={classes.priceBox}>
                    <p className={classes.freetxt}>Advanced</p>
                    <p className={classes.zeroTxt}>$13</p>
                    <hr
                      style={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                        margin: "10px 0",
                      }}
                    />
                    <p className={classes.detailTxt}>Unlimited Meetings</p>
                    <p className={classes.detailTxt}>
                      Up to 4 hours meeting with meeting analytics. Upto 2gb of
                      storage is included.
                    </p>
                    <p className={classes.detailTxt}>
                      Chat support included and Email / business hours
                    </p>

                    {currentPlan == "basic" && (
                      <Button
                        onClick={(e) => {
                          getPrice({ planType: "advanced", price: "13" });
                        }}
                        variant="contained"
                        // color="error"
                        fullWidth="true"
                        style={{ marginTop: "112px" }}
                      >
                        Upgrade
                      </Button>
                    )}

                    {currentPlan == "advanced" && (
                      <Button
                        onClick={(e) => {
                          //getPrice({ planType: 'advanced', price: '13' });
                        }}
                        variant="contained"
                        // color="error"
                        fullWidth="true"
                        style={{
                          marginTop: "112px",
                          backgroundColor: "#A9A9A9",
                          cursor: "not-allowed",
                        }}
                      >
                        Current Plan
                      </Button>
                    )}

                    {(currentPlan == "professional" ||
                      currentPlan == "business") && (
                      <Button
                        onClick={(e) => {
                          getPrice({ planType: "advanced", price: "13" });
                        }}
                        variant="contained"
                        color="error"
                        fullWidth="true"
                        style={{ marginTop: "112px" }}
                      >
                        Downgrade
                      </Button>
                    )}
                  </Box>
                  <Box className={classes.priceBox}>
                    <p className={classes.freetxt}>Professional</p>
                    <p className={classes.zeroTxt}>$22</p>
                    <hr
                      style={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                        margin: "10px 0",
                      }}
                    />
                    <p className={classes.detailTxt}>
                      Up to 8 hours meeting with meeting analytics. Upto 4gb of
                      storage is included.
                    </p>
                    <p className={classes.detailTxt}>
                      Premium fulfillments - calendar assistant for scheduling,
                      conflict monitoring during conversations
                    </p>
                    <p className={classes.detailTxt}>Chat, email. 24/7.</p>
                    <p className={classes.detailTxt}>
                      15 summary / 20 credits / min
                    </p>
                    {currentPlan == "professional" && (
                      <Button
                        onClick={(e) => {
                          //getPrice({ planType: 'professional', price: '22' });
                        }}
                        variant="contained"
                        fullWidth="true"
                        style={{
                          marginTop: "37px",
                          backgroundColor: "#A9A9A9",
                          cursor: "not-allowed",
                        }}
                      >
                        Current Plan
                      </Button>
                    )}

                    {(currentPlan == "advanced" || currentPlan == "basic") && (
                      <Button
                        onClick={(e) => {
                          getPrice({ planType: "professional", price: "22" });
                        }}
                        variant="contained"
                        fullWidth="true"
                        style={{ marginTop: "37px" }}
                      >
                        Upgrade
                      </Button>
                    )}

                    {currentPlan == "business" && (
                      <Button
                        onClick={(e) => {
                          getPrice({ planType: "professional", price: "22" });
                        }}
                        variant="contained"
                        color="error"
                        fullWidth="true"
                        style={{ marginTop: "37px" }}
                      >
                        Downgrade
                      </Button>
                    )}

                    {/* { (currentPlan == "professional") && <Button
                                            onClick={(e) => {
                                                //getPrice({ planType: 'professional', price: '22' });
                                            }}
                                            variant="contained"
                                            fullWidth="true"
                                            style={{ marginTop: '37px', backgroundColor: '#A9A9A9' }}>
                                            Current Plan
                                        </Button>} */}
                  </Box>
                  <Box className={classes.priceBox}>
                    <p className={classes.freetxt}>Business</p>
                    <p className={classes.zeroTxt}>$150</p>
                    <hr
                      style={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                        margin: "10px 0",
                      }}
                    />
                    <p className={classes.detailTxt}>
                      Up to 60 hours meeting with deeper meetings and
                      organizational analytics. Upto 100 GB of storage is
                      included.
                    </p>
                    <p className={classes.detailTxt}>Chat/email/phone. 24/7</p>
                    {currentPlan == "business" ? (
                      <Button
                        onClick={(e) => {
                          //getPrice({ planType: 'business', price: '150' });
                        }}
                        variant="contained"
                        // color="error"
                        fullWidth="true"
                        style={{
                          marginTop: "150px",
                          backgroundColor: "#A9A9A9",
                          cursor: "not-allowed",
                        }}
                      >
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          getPrice({ planType: "business", price: "150" });
                        }}
                        variant="contained"
                        // color="error"
                        fullWidth="true"
                        style={{ marginTop: "150px" }}
                      >
                        Upgrade
                      </Button>
                    )}
                  </Box>
                  <Box className={classes.priceBox}>
                    <p className={classes.freetxt}>Enterprise</p>
                    <p className={classes.zeroTxt}>Custom price</p>
                    <hr
                      style={{
                        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                        margin: "10px 0",
                      }}
                    />
                    <p className={classes.detailTxt}>
                      Contact us for custom pricing.
                    </p>
                    <Button
                      onClick={(e) => {
                        //getPrice({ planType: 'enterprice', price: 'custom' });
                      }}
                      variant="contained"
                      color="error"
                      fullWidth="true"
                      style={{ marginTop: "243px" }}
                    >
                      Contact Us
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </StyledEngineProvider>

        <p style={{ padding: "10px", color: "#707070" }}>
          If you have any questions about subscription plans, visit our{" "}
          <a href="/plans">Pricing</a> page
        </p>
      </Grid>

      <Grid
        className={classes.mb20}
        style={{ marginTop: "40px", display: "none" }}
      >
        <FormLabel component="legend" className={classes.lableFont}>
          My cards
        </FormLabel>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          width="100%"
        >
          <img src="images/card1.png" height="30px" />
          <div style={{ padding: "0 30px" }}>
            <div style={{ fontWeight: "bold" }}>Mastercard ending 7831</div>
            <div>Expires 09/24</div>
          </div>
          <Button variant="outlined">Update</Button>
        </Box>
        <Button
          variant="contained"
          style={{ marginTop: "30px", padding: "5px 20px" }}
        >
          + Add card
        </Button>
      </Grid>
    </div>
  );
}

export default SubscriptionPlans;
