import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { withRouter, useParams } from "react-router-dom";
import queryString from "query-string";
import {
  Container,
  Grid,
  TextField,
  Box,
  AppBar,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import { withStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import Input from "@material-ui/core/Input";
import { getData, postData } from "../../utils";
import { Get } from "../../utils/axiosUtils";
import axios from "axios";
import {
  storeUserSetting,
  getUserByUserId,
  setCalendars,
  setProductsAndCompetitors,
} from "../../firebase/firestore";
import firebase from "../../firebase/firebase";
import Page from "../Page";
import SubscriptionPlans from "./subscriptionPlans";
import TopicLabels from "./TopicLabels";

const CustomCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
    color: "#000",
    fontWeight: "600",
  },
  priceTxt: {
    color: "#2C73FF",
    fontSize: "22px",
  },
}));

function Settings({ ...props }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [notifications, setValueNotifications] = React.useState("");

  const [hasBilling, setHasBilling] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { code } = queryString.parse(props.location.search);

  const FetchToken = async (code) => {
    console.log("fetch data");
    let payload = { code: code };
    let apiRes = await Get("ZohoAuth/ZohoCode", payload);
    if (apiRes.status == 200 && apiRes.data.status == "success") {
      const { data, total } = apiRes.data;
      console.log(data, "contacts getting");
      console.log(data, "lool");
    } else {
      // const { data, total } = apiRes.data;
      console.log("data not fetched");
    }
  };

  useEffect(() => {
    FetchToken(code);
  }, [props.location.search]);

  useEffect(async () => {
    const db = firebase.firestore();
    let userId = firebase.auth().currentUser.uid;
    let user = await getUserByUserId(userId);

    if (!user.billingAddress) {
      setHasBilling(false);
    }

    let mSettingsDef = user.settings.join;
    setValueMeetingSettings(mSettingsDef);

    if (user.settings.calendars && Array.isArray(user.settings.calendars)) {
      setSelectedCalendars(user.settings.calendars.map((c) => c.calendarId));
    }

    if (
      user.settings?.matching?.products &&
      Array.isArray(user.settings?.matching?.products)
    ) {
      setProducts(user.settings.matching.products);
    }

    if (
      user.settings?.matching?.competitors &&
      Array.isArray(user.settings?.matching?.competitors)
    ) {
      setCompetitors(user.settings.matching.competitors);
    }

    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async function (jwtToken) {
        let userCalendars = await getData(
          `${process.env.REACT_APP_BASE_API_URL}/calendar/listCalendars`,
          jwtToken
        );
        console.log("userCalendars", userCalendars);
        setTotalCalendars(userCalendars.data);
      });

    const handleChangeNotifications = (event) => {
      // console.log(event.target.value);
      let data = storeUserSetting(event.target.value, "notifications");
      setValueNotifications(event.target.value);
    };

    // let notifyDef = user.settings.preferences.notifications;
    // setValueNotifications(notifyDef);

    // let summariesDef = user.settings.preferences.summaries;
    // setValueSummaries(summariesDef);

    // let sharingDef = user.settings.preferences.sharing;
    // setValueSharing(sharingDef);
  }, []);

  const [mSettings, setValueMeetingSettings] = React.useState("");
  const handleChangeMeetingSettings = (event) => {
    const response = storeUserSetting(event.target.value, "meeting-settings");
    if (response) {
      props.showSnackbar({
        show: true,
        severity: "success",
        message: "Setting updated successfully",
      });
      setValueMeetingSettings(event.target.value);
    } else {
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Something went wrong",
      });
    }
  };

  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const [totalCalendars, setTotalCalendars] = useState([]);
  const [tempProduct, setTempProduct] = useState("");
  const [tempCompetitor, setTempCompetitor] = useState("");
  const [products, setProducts] = useState([]);
  const [competitors, setCompetitors] = useState([]);

  const addPorduct = async () => {
    let productArr = products;
    productArr.push(tempProduct);
    let res = await setProductsAndCompetitors(productArr, "products");
    if (res) {
      props.showSnackbar({
        show: true,
        severity: "success",
        message: "Setting updated successfully",
      });
      setProducts(productArr);
      setTempProduct("");
    } else {
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Something went wrong!",
      });
    }
  };

  const addCompetitor = async () => {
    let competitorArr = competitors;
    competitorArr.push(tempCompetitor);

    let res = await setProductsAndCompetitors(competitorArr, "competitors");
    if (res) {
      props.showSnackbar({
        show: true,
        severity: "success",
        message: "Setting updated successfully",
      });
      setCompetitors(competitorArr);
      setTempCompetitor("");
    } else {
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Something went wrong!",
      });
    }
  };

  function debounce(func) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, 2000);
    };
  }

  // const ConnectToZoho=async ()=>{

  //   // let payload = { perPage: totalRecordsPerPage, page: currentPage };
  //   let responseCode=await axios.get('https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=1000.IW0ZA1MP1NN9Z419F13VXJDHD6OEZU&scope=ZohoCRM.settings.profiles.ALL&redirect_uri=http://localhost:3000/settings&access_type=offline&prompt=consent',{headers: {
  //     'Accept':'application/json',
  //     'Content-Type':'application/json'
  //   }});
  //   if(responseCode){
  //     console.log('responseCode',responseCode);
  //   }

  //   // let payload={}
  //   // let apiRes = await Get("ZohoAuth/ZohoCode", payload);
  //   // if (apiRes.status == 200 && apiRes.data.status == "success") {
  //   //   const { data, total } = apiRes.data;
  //   //   console.log(data,'contacts getting')
  //   //  console.log(data,'lool')
  //   // } else {
  //   //   // const { data, total } = apiRes.data;
  //   //   console.log('data not fetched')
  //   // }

  // }

  const handleChangeCalendar = async (e) => {
    setSelectedCalendars(e.target.value);
    let selectedC = totalCalendars.filter(
      (c) => e.target.value.indexOf(c.calendarId) > -1
    );

    //let result = await setCalendars(selectedC)

    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let result = await postData(
          `${process.env.REACT_APP_BASE_API_URL}/user/settings/updateCalendars`,
          jwtToken,
          { calendars: selectedC }
        );

        if (result) {
          props.showSnackbar({
            show: true,
            severity: "success",
            message: "Your calendar preference updated successfully.",
          });
        } else {
          props.showSnackbar({
            show: true,
            severity: "error",
            message: "Something went wrong!",
          });
        }
      });
  };

  const debounceHandleChangeCalendar = React.useCallback(
    debounce(handleChangeCalendar),
    []
  );
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Page>
      <Container maxWidth={"xl"}>
        <div className={classes.root}>
          <AppBar position="static" className={classes.bg}>
            <Tabs value={value} onChange={handleChange} className={classes.pl}>
              <Tab label="Preferences" {...a11yProps(0)} />
              {/* <Tab label="Organization" {...a11yProps(1)} /> */}
              <Tab label="Integrations" {...a11yProps(2)} />
              <Tab label="Subscription plans" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2} className={classes.mb20}>
              <Grid item xs={5} md={2}>
                <FormLabel component="legend" className={classes.lableFont}>
                  Meeting Settings
                </FormLabel>
              </Grid>
              <Grid item xs={7} md={10}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="meeting-settings"
                    name="meeting-settings"
                    value={mSettings}
                    onChange={handleChangeMeetingSettings}
                  >
                    <FormControlLabel
                      value="ALL"
                      control={<Radio className={classes.radioColor} />}
                      label="Join all meetings"
                    />
                    <FormControlLabel
                      value="OWNED"
                      control={<Radio className={classes.radioColor} />}
                      label="Join meetings I own"
                    />
                    <FormControlLabel
                      value="ON_DEMAND"
                      control={<Radio className={classes.radioColor} />}
                      label="On demand"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.mb20}>
              <Grid item xs={5} md={2}>
                <FormLabel component="legend" className={classes.lableFont}>
                  Calendars
                </FormLabel>
              </Grid>
              <Grid item xs={7} md={10}>
                <FormControl component="fieldset" style={{ width: "200px" }}>
                  <Select
                    multiple
                    value={selectedCalendars}
                    onChange={handleChangeCalendar}
                    input={<Input />}
                    renderValue={(selected) => {
                      let r = "";
                      selected.forEach((s) => {
                        let thisCalendar = totalCalendars.filter(
                          (c) => s == c.calendarId
                        );
                        let title = thisCalendar.length
                          ? thisCalendar[0].summary
                          : "";
                        r = r.length ? r + ", " + title : r + title;
                      });
                      return r;
                    }}
                    MenuProps={MenuProps}
                  >
                    {totalCalendars.map((calendar) => {
                      return (
                        <MenuItem
                          key={calendar.calendarId}
                          value={calendar.calendarId}
                        >
                          <CustomCheckbox
                            checked={
                              selectedCalendars.indexOf(calendar.calendarId) >
                              -1
                            }
                          />
                          <ListItemText primary={calendar.summary} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Competitors preference setting */}
            <Grid
              container
              style={{ marginTop: "20px" }}
              className={classes.mb20}
            >
              <Grid item xs={5}>
                <FormLabel component="legend" className={classes.lableFont}>
                  Products/Services
                </FormLabel>
                <Typography variant="caption">
                  Add the products and services to be matched with the
                  transcript.
                </Typography>
              </Grid>
              <Box width={{ md: "240px", xs: "160px" }}>
                <TextField
                  //style={{ width: "100%" }}

                  placeholder="Add Products/Services"
                  inputProps={{ "aria-label": "Add Products/Services" }}
                  value={tempProduct}
                  onChange={(e) => setTempProduct(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      if (
                        !products.includes(tempProduct) &&
                        tempProduct.length
                      ) {
                        addPorduct();
                      }
                    }
                  }}
                />
              </Box>

              <Box
                display={{
                  xs: "block",
                  md: "none",
                  marginTop: "12px",
                  marginLeft: "5px",
                }}
              >
                <AddCircleOutlinedIcon
                  color="primary"
                  onClick={() => {
                    if (!products.includes(tempProduct) && tempProduct.length) {
                      addPorduct();
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                {products.map((p, index) => {
                  return (
                    <Chip
                      key={index}
                      label={p}
                      onDelete={async () => {
                        let newArr = products.filter((product) => product != p);

                        let res = await setProductsAndCompetitors(
                          newArr,
                          "products"
                        );
                        if (res) {
                          props.showSnackbar({
                            show: true,
                            severity: "success",
                            message: "Setting updated successfully",
                          });
                          setProducts(newArr);
                        } else {
                          props.showSnackbar({
                            show: true,
                            severity: "error",
                            message: "Something went wrong!",
                          });
                        }
                      }}
                    />
                  );
                })}
              </div>
            </Grid>
            <Grid
              container
              style={{ marginTop: "20px" }}
              className={classes.mb20}
            >
              <Grid item xs={5}>
                <FormLabel component="legend" className={classes.lableFont}>
                  Competitors
                </FormLabel>
                <Typography variant="caption">
                  Add the Competitors to be matched with the transcript.
                </Typography>
              </Grid>
              <Box width={{ md: "240px", xs: "160px" }}>
                <TextField
                  placeholder="Add Competitors"
                  inputProps={{ "aria-label": "Add Competitors" }}
                  value={tempCompetitor}
                  onChange={(e) => setTempCompetitor(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      if (
                        !competitors.includes(tempCompetitor) &&
                        tempCompetitor.length
                      ) {
                        addCompetitor();
                      }
                    }
                  }}
                />
              </Box>

              <Box
                display={{
                  xs: "block",
                  md: "none",
                  marginTop: "12px",
                  marginLeft: "5px",
                }}
              >
                <AddCircleOutlinedIcon
                  color="primary"
                  onClick={() => {
                    if (
                      !competitors.includes(tempCompetitor) &&
                      tempCompetitor.length
                    ) {
                      addCompetitor();
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              </Box>

              <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                {competitors.map((c, index) => {
                  return (
                    <Chip
                      key={index}
                      label={c}
                      onDelete={async () => {
                        let newArr = competitors.filter(
                          (competitor) => competitor != c
                        );
                        let res = await setProductsAndCompetitors(
                          newArr,
                          "competitors"
                        );

                        if (res) {
                          props.showSnackbar({
                            show: true,
                            severity: "success",
                            message: "Setting updated successfully",
                          });
                          setCompetitors(newArr);
                        } else {
                          props.showSnackbar({
                            show: true,
                            severity: "error",
                            message: "Something went wrong!",
                          });
                        }
                      }}
                    />
                  );
                })}
              </div>
            </Grid>
            {/*topic labels */}
            <TopicLabels />
          </TabPanel>
          {/* <TabPanel value={value} index={1}>
            Organization
          </TabPanel> */}
          <TabPanel value={value} index={1}>
            <Button variant="outlined" style={{ marginLeft: "10px" }}>
              <a
                href={`https://accounts.zoho.com/oauth/v2/auth?response_type=code&client_id=${process.env.REACT_APP_ZOHO_CLIENT_ID}&scope=ZohoCRM.settings.profiles.ALL&redirect_uri=${process.env.REACT_APP_ZOHO_REDIRECT_URL}&access_type=offline&prompt=consent`}
              >
                Connect With Zoho
              </a>
            </Button>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SubscriptionPlans hasBilling={hasBilling} />
          </TabPanel>
        </div>
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Settings));
