import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Grid,
  Box,
  Button,
  Icon,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getUserByUserId } from "../../firebase/firestore";
import firebase from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "100%",
      margin: "10px 0",
    },
    marginTop: "20px",
  },
  textOne: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "20px",
  },
  textTwo: {
    margin: "10px 0 30px 0",
    textAlign: "center",
    fontSize: "12px",
    color: "#2C73FF",
  },
  center: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  liveButton: {
    background: "#EDF3FF",
    padding: "20px",
    marginTop: "10px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    "&:hover": {
      backgroundColor: "#EDF3FF",
      color: "#2C73FF",
    },
  },
  support: {
    textDecoration: "none",
  },
  linkBlock: {
    margin: "10px 0",
  },
}));

export default function Help() {
  const classes = useStyles();
  const [displayName, setDisplayName] = React.useState([]);
  const [email, setEmail] = React.useState([]);
  const [feedback, setFeedback] = React.useState([]);

  useEffect(async () => {
    const db = firebase.firestore();
    let userId = firebase.auth().currentUser.uid;
    let user = await getUserByUserId(userId);
    setDisplayName(user.displayName);
    setEmail(user.email);

    if (window.zoho_chat_loaded_once) {
      document
        .getElementById("zsiqwidget")
        .insertAdjacentHTML(
          "afterend",
          "<div id='zsiqbtn' class='zsiq_float6 zsiq_custombtn' style='display: inline-block; width: 250px; height: 60px;'></div>"
        );
      window.loadZohoChat();
    } else {
      window.loadZohoChat();
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    let payload = {
      displayName: displayName,
      email: email,
      feedback: feedback,
    };
    console.log(payload);
  }
  // const [value, setValue] = useState('Controlled');
  // const [bgColour, setBgColour] = useState("#fafafa");
  const handleChange = (event) => {
    // setValue(event.target.value);
  };

  return (
    <div>
      {/* <Helmet>
                <script type="text/javascript">
                    {`var $zoho=$zoho || { };
                    $zoho.salesiq = $zoho.salesiq || {widgetcode:"b91570988b9ecaba606420de21799707b6dcce48343d62dde30ae29733123065", values:{ },ready:function(){ }};
                    var d=document;s=d.createElement("script");
                    s.type="text/javascript";
                    s.id="zsiqscript";
                    s.defer=true;
                    s.src="https://salesiq.zoho.com/widget";
                    t=d.getElementsByTagName("script")[0];
                    t.parentNode.insertBefore(s,t);
                    d.write("<div id='zsiqwidget'></div>");`}
                </script>
            </Helmet> */}

      {/* <Helmet>
                <script type="text/javascript" id="zsiqchat">
                    {`var $zoho=$zoho || {};
                    $zoho.salesiq = $zoho.salesiq || {widgetcode: "b91570988b9ecaba606420de21799707b6dcce48343d62dde30ae29733123065", values:{},ready:function(){}};
                    var d=document;
                    s=d.createElement("script");
                    s.type="text/javascript";
                    s.id="zsiqscript";
                    s.defer=true;
                    s.src="https://salesiq.zoho.com/widget";
                    t=d.getElementsByTagName("script")[0];
                    t.parentNode.insertBefore(s,t);`}
                </script>
            </Helmet> */}

      <Container maxWidth={"xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box
              bgcolor="#fff"
              borderRadius="6px"
              marginTop="10px"
              width="100%"
              height="400px"
              p={{ xs: 1, sm: 1, md: 1 }}
              style={{ boxShadow: "0px 0px 10px #E5E6FF", padding: "40px" }}
            >
              <img src="images/headphone.png" className={classes.center} />
              <p className={classes.textOne}>How would you like to connect?</p>
              <p className={classes.textTwo}>24/7 Support</p>
              {/* <img src="images/headphone.png" height="30" />
                                <span>Contact Live Chat</span>
                                <img src="images/rightArrow.svg" alt="" /> */}
              {/* <Helmet>
                                <script type="text/javascript" id="zsiqchat">
                                    {`var $zoho=$zoho || {};
                                        $zoho.salesiq = $zoho.salesiq || {widgetcode: "b91570988b9ecaba606420de21799707b6dcce48343d62dde30ae29733123065", values:{ },ready:function(){ 
                                            console.log('hhhhhhh',d.getElementById("salesiqchat"));  
                                            //$zoho.salesiq.floatbutton.visible("hide");
                                            $zoho.salesiq.custom.html("zsiqbtn",{"online.html": "<img style='height:30px' src ='images/headphone.png'><span style='color:#2C73FF'>Contact Live Chat</span><img src='images/rightArrow.svg' alt='' />", "offline.html": "<img style='height:30px' src ='images/headphone.png'><span style='color:#2C73FF'>Contact Live Chat</span><img src='images/rightArrow.svg' alt='' />"});
                                        }};                                                                                
                                        var d=document;
                                        s=d.createElement("script");
                                        s.type="text/javascript";
                                        s.id="zsiqscript";
                                        s.defer=true;
                                        s.src="https://salesiq.zoho.com/widget";
                                        t=d.getElementsByTagName("script")[0];
                                        t.parentNode.insertBefore(s,t);
                                        `}
                                </script>
                            </Helmet> */}
              <div style={{ width: "100%", zIndex: "0" }}>
                <div id="zsiqwidget"></div>
              </div>
              <a
                href="https://support.bluecap.ai/portal/en/home"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <div className={classes.liveButton}>
                  <img src="images/ticket.png" height="30" />
                  <span>CRM Tickets</span>
                  <img src="images/rightArrow.svg" alt="" />
                </div>
              </a>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              bgcolor="#fff"
              borderRadius="6px"
              marginTop="10px"
              width="100%"
              height="400px"
              p={{ xs: 1, sm: 1, md: 1 }}
              style={{ boxShadow: "0px 0px 10px #E5E6FF", padding: "40px" }}
            >
              <h3>Feedback</h3>
              <div className={classes.linkBlock}>
                <p>Coming Soon!</p>
              </div>
              {/* <form className={classes.root} onSubmit={handleSubmit}>
                                <div>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                    >
                                        <TextField
                                            id="outlined-name"
                                            label="Name"
                                            value={displayName}
                                            disabled="true"
                                        />
                                        <input type="hidden" name="email" value={email} />
                                    </Box>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Feedback"
                                        multiline
                                        rows={3}
                                        defaultValue=""
                                        placeholder="Write your feedback here..."
                                        variant="outlined"
                                        value={feedback}
                                        onInput={e => setFeedback(e.target.value)}
                                        required={true}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        endIcon={<Icon>send</Icon>}
                                        style={{ marginTop: '20px' }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form> */}
              {/* <Helmet>
                                <script src="https://desk.zoho.com/portal/api/feedbackwidget/496085000000765073?orgId=712443404&displayType=embeded"></script>                                
                            </Helmet>
                            <div id="zsfeedbackwidgetdiv" style={{zIndex:'999999'}}></div> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              bgcolor="#fff"
              borderRadius="6px"
              marginTop="10px"
              width="100%"
              height="400px"
              p={{ xs: 1, sm: 1, md: 1 }}
              style={{ boxShadow: "0px 0px 10px #E5E6FF", padding: "40px" }}
            >
              <h3>Resources</h3>
              <div className={classes.linkBlock}>
                <p>Coming Soon!</p>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
