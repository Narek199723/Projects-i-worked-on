import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { connect } from "react-redux";

import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Post } from "./../../utils/axiosUtils";
import { AddInstantMeeting } from "./../../utils/endpoints";
import * as actions from "../../redux/actions";
import { getData } from "./../../utils";

import firebase from "../../firebase/firebase";
import Dialog from "@material-ui/core/Dialog";

import CreateEvent from "./CreateEvent";

import DateAdapter from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DesktopDatePicker from "@material-ui/lab/DesktopDatePicker";
// import TextField from '@material-ui/core/TextField';
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  InputBase,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Drawer,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// components
import { MHidden } from "../../components/@material-extend";
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
import NotificationsPopover from "./NotificationsPopover";
import NotificationCriticalPopover from "./NotificationCriticalPopover";
// import logo from "../../assets/images/logo.svg";
import logo from "../../assets/images/logo-blk.png";
import algoliaAutocomplete from "./../../utils/algolia.js";
import { getUserByUserId } from "../../firebase/firestore";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  color: "#000000",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: "#FFFFFF",
  [theme.breakpoints.up("lg")]: {
    //  width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
const TypographyStyle = styled(Typography)(({ theme }) => ({
  display: "flex",
  position: "absolute",
  top: 10,
}));

const UserName = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  marginLeft: "16%",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "10%",
    width: "auto",
  },
}));

const MeetingButton = styled(Button)(({ theme }) => ({
  background: "#FFFFFF",
  border: "2px solid #2C73FF",
  borderRadius: 6,
  padding: "8px 20px",
  color: "#2C73FF",
  fontWeight: "100",
}));

const ScheduleMeeting = styled(Button)(({ theme }) => ({
  background: "#2C73FF",
  boxShadow: "0px 11px 12px rgba(44, 115, 255, 0.25)",
  borderRadius: 6,
  padding: "10px 20px",
  color: "#fff",
  marginLeft: 10,
  fontWeight: 100,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "10ch",
    },
  },
  boxShadow: "0px 0px 10px #e5e6ff",
  borderRadius: 6,
  padding: "3px 15px",
}));

const StyledInputBaseSearch = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "25ch",
    },
  },
  boxShadow: "0px 0px 10px #e5e6ff",
  borderRadius: 6,
  padding: "3px 15px",
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

function DashboardNavbar({ onOpenSidebar, user, logout, ...props }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(async function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(fetchWeatherData);
          } else if (result.state === "prompt") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(
              fetchWeatherData,
              permissionsDeclined,
              weatherOptions
            );
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    }

    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        let algoliaSearchKey = "";
        if (localStorage.getItem("algoliaSearchKeyData") !== null) {
          let algoliaSearchKeyData = JSON.parse(
            localStorage.getItem("algoliaSearchKeyData")
          );
          algoliaSearchKey = algoliaSearchKeyData.algoliaSearchKey;

          if (algoliaSearchKeyData.time < Date.now() - 1000 * 60 * 60 * 8) {
            localStorage.removeItem("algoliaSearchKeyData");
          }
        } else {
          let jwtToken = await user.getIdToken();

          //console.log(jwtToken)

          let res = await getData(
            `${process.env.REACT_APP_BASE_API_URL}/user/algolia-token`,
            jwtToken
          );
          if (res.status == "success") {
            console.log(res);
            localStorage.setItem(
              "algoliaSearchKeyData",
              JSON.stringify({
                algoliaSearchKey: res.data.algoliaKey,
                time: Date.now(),
              })
            );
            algoliaSearchKey = res.data.algoliaKey;
          }
        }

        let searchInstance = algoliaAutocomplete(
          firebase.auth().currentUser.uid,
          algoliaSearchKey,
          handleAlgoliaSearchSubmit
        );
        // let searchInstance = algoliaAutocomplete(firebase.auth().currentUser.uid, algoliaSearchKey)
        setAlgoliaSearchInstance(searchInstance);

        let zoomTokens = (
          await getUserByUserId(firebase.auth().currentUser.uid)
        ).zoom;
        console.log(zoomTokens);
        if (zoomTokens) {
          setIsZoomAuthenticated(true);
        } else {
          setIsZoomAuthenticated(false);
        }
      }
    });
  }, []);
  const { isCollapse, onToggleCollapse } = useCollapseDrawer();

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const [createInstantMeetingLoader, setCreateInstantMeetingLoader] =
    useState(false);
  const [createInstantZoomMeetingLoader, setCreateInstantZoomMeetingLoader] =
    useState(false);
  const [isZoomAuthenticated, setIsZoomAuthenticated] = useState(false);
  const [instantMeetingDilogStatus, setInstantMeetingDilogStatus] =
    useState(false);
  const [instantMeetingURL, setInstantMeetingURL] = useState("");
  const [startMeetingURL, setStartMeetingURL] = useState("");
  const [instantMeetingType, setInstantMeetingType] = useState("");
  const [weatherData, setWeatherData] = useState(false);
  const [preferredUnit, setPreferredUnit] = useState("c");

  const [filterEl, setFilterEl] = useState(null);
  const [filterDate, setFilterDate] = useState(new Date());
  const [algoliaSearchInstance, setAlgoliaSearchInstance] = useState(null);
  const [algoliaSearchDrawerStatus, setAlgoliaSearchDrawerStatus] =
    useState(false);

  const handleAlgoliaSearchSubmit = () => {
    setAlgoliaSearchDrawerStatus(true);
  };
  const openSearchFilter = (event) => {
    setFilterEl(event.currentTarget);
  };

  const closeSearchFilter = () => {
    setFilterEl(null);
  };

  const handleFilterDateChange = (selectedDate) => {
    setFilterDate(selectedDate);
  };

  const filterStatus = Boolean(filterEl);

  const filterPopoverId = filterStatus ? "filter-popover" : undefined;

  const [algoliaSearchDrawerWidth, setAlgoliaSearchDrawerWidth] = useState(
    window.innerWidth - 1000
  );

  const applyFullWidth = () => {
    if (algoliaSearchDrawerWidth != window.innerWidth - 100) {
      requestAnimationFrame(() => {
        setAlgoliaSearchDrawerWidth(window.innerWidth - 100);
      });
    } else {
      setAlgoliaSearchDrawerWidth(window.innerWidth - 1000);
    }
  };
  const applyFilter = () => {
    setFilterEl(null);

    let selectedTime = Math.round(filterDate.getTime() / 1000);

    algoliaSearchInstance.setContext({
      filter: `timestamp._seconds: ${selectedTime - 12 * 60 * 60} TO ${
        selectedTime + 12 * 60 * 60
      }`,
    });
    // algoliaSearchInstance.setQuery("wonder")
    algoliaSearchInstance.setIsOpen(true);
    algoliaSearchInstance.refresh();
  };

  var weatherOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function permissionsDeclined(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const fetchWeatherData = async (pos) => {
    if (localStorage.getItem("weatherdata") !== null) {
      let localDataString = localStorage.getItem("weatherdata");
      let localData = JSON.parse(localDataString);

      if (localData.time > Date.now() - 1000 * 60 * 60) {
        setWeatherData(localData);
        if (localData.preferredUnit) setPreferredUnit(localData.preferredUnit);

        return;
      }
    }
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let res = await getData(
          `${process.env.REACT_APP_BASE_API_URL}/user/weather?lon=${pos.coords.longitude}&lat=${pos.coords.latitude}`,
          jwtToken
        );
        if (res.status == "success") {
          res.data.time = Date.now();
          if (localStorage.getItem("weatherdata") !== null) {
            let localDataString = localStorage.getItem("weatherdata");
            let localData = JSON.parse(localDataString);
            res.data.preferredUnit = localData.preferredUnit;
          } else {
            res.data.preferredUnit = "c";
          }
          localStorage.setItem("weatherdata", JSON.stringify(res.data));
          setWeatherData(res.data);
        }
      });
  };

  const keyPress = async (e) => {
    if (e.keyCode == 13) {
      if (validURL(e.target.value)) {
        let data = { joinUrl: e.target.value };
        setShowLoader(true);
        let apiRes = await Post(AddInstantMeeting, data);
        setShowLoader(false);
        if (apiRes.status == 200 && apiRes.data.status == "success") {
          setShowSuccess(true);
          props.showSnackbar({
            show: true,
            severity: "success",
            message: "Bluecap will join the meeting shortly.",
          });
        } else {
          // setShowError(true);
          props.showSnackbar({
            show: true,
            severity: "error",
            message: "Please enter valid meeting URL.",
          });
        }
      } else {
        // setShowError(true);
        props.showSnackbar({
          show: true,
          severity: "error",
          message: "Please enter valid meeting URL.",
        });
      }
    }
  };

  const openCreateEventPopup = () => {
    console.log("open");
    setShowCreateEvent(true);
  };

  const closeCreateEventPopup = () => {
    console.log("close");
    setShowCreateEvent(false);
    setShowSuccess(true);
  };

  const createInstantMeeting = async () => {
    setCreateInstantMeetingLoader(true);
    setInstantMeetingType("googlemeet");
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let res = await getData(
          `${process.env.REACT_APP_BASE_API_URL}/calendar/createEventAndJoin`,
          jwtToken
        );

        if (res.status == "success") {
          props.showSnackbar({
            show: true,
            severity: "success",
            message: "Meeting created successfully.",
          });

          setInstantMeetingURL(res.data.hangoutLink);
          setInstantMeetingDilogStatus(true);
        } else {
          props.showSnackbar({
            show: true,
            severity: "error",
            message: "Something went wrong.",
          });
        }

        setCreateInstantMeetingLoader(false);
      });
  };

  const createInstantZoomMeeting = async () => {
    setCreateInstantZoomMeetingLoader(true);
    setInstantMeetingType("zoom");

    if (!isZoomAuthenticated) {
      alert("please authorize with zoom first");
      window.location = `https://zoom.us/oauth/authorize?client_id=${
        process.env.REACT_APP_ZOOM_CLIENT_ID
      }&response_type=code&redirect_uri=${
        process.env.REACT_APP_ZOOM_REDIRECT_URL +
        "&state=" +
        firebase.auth().currentUser.uid
      }`;
      return;
    }

    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let res = await getData(
          `${process.env.REACT_APP_BASE_API_URL}/calendar/createEventAndJoin?type=zoom`,
          jwtToken
        );

        if (res.status == "success") {
          props.showSnackbar({
            show: true,
            severity: "success",
            message: "Meeting created successfully.",
          });

          setInstantMeetingURL(res.data.join_url);
          setStartMeetingURL(res.data.start_url);
          setInstantMeetingDilogStatus(true);
        } else {
          props.showSnackbar({
            show: true,
            severity: "error",
            message: "Something went wrong.",
          });
        }

        setCreateInstantZoomMeetingLoader(false);
      });
  };

  const changePreferredUnit = (val) => {
    // let currentWeatherData = weatherData;
    // currentWeatherData.preferredUnit = val;
    // setWeatherData(currentWeatherData);
    setPreferredUnit(val);
    if (localStorage.getItem("weatherdata") !== null) {
      let localDataString = localStorage.getItem("weatherdata");
      let localData = JSON.parse(localDataString);
      localData.preferredUnit = val;
      localStorage.setItem("weatherdata", JSON.stringify(localData));
    }
  };

  const handleInstantMeetingDilogClose = () => {
    setInstantMeetingDilogStatus(!instantMeetingDilogStatus);
    setInstantMeetingURL("");
    setStartMeetingURL("");
  };

  return (
    <>
      <CreateEvent onClose={closeCreateEventPopup} open={showCreateEvent} />

      <Drawer
        anchor="right"
        open={algoliaSearchDrawerStatus}
        onClose={() => setAlgoliaSearchDrawerStatus(!algoliaSearchDrawerStatus)}
      >
        <Box
          width={algoliaSearchDrawerWidth}
          style={{ transition: "all 0.5s" }}
        >
          <Box padding={2}>
            <a style={{ cursor: "pointer" }} onClick={applyFullWidth}>
              Toggle width
            </a>
          </Box>
          <Box padding={20}>
            <h2>Search Content</h2>
          </Box>
        </Box>
      </Drawer>

      <Dialog
        onClose={handleInstantMeetingDilogClose}
        aria-labelledby="simple-dialog-title"
        open={instantMeetingDilogStatus}
      >
        {instantMeetingType == "googlemeet" && (
          <Box
            p={5}
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            flexDirection={{ xs: "column", md: "row" }}
            width={{ xs: "400px", md: "500px" }}
          >
            <a
              target="_blank"
              style={{ textDecoration: "none" }}
              href={instantMeetingURL}
              rel="noreferrer"
            >
              {instantMeetingURL}
            </a>
            <img
              onClick={() => {
                navigator.clipboard.writeText(instantMeetingURL);
                props.showSnackbar({
                  show: true,
                  severity: "success",
                  message: "Copied meeting URL successfully!",
                });
              }}
              title="Copy to clipboard"
              src="/icons/copy_icon.svg"
              alt="copy text"
              style={{ cursor: "pointer", height: "30px", width: "30px" }}
            />
          </Box>
        )}{" "}
        {instantMeetingType == "zoom" && (
          <>
            <Box
              p={5}
              pb={0}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              flexDirection={{ xs: "column", md: "row" }}
              width={{ xs: "400px", md: "500px" }}
            >
              Start Meeting:{" "}
              <a
                target="_blank"
                style={{
                  textDecoration: "none",
                  maxWidth: "339px",
                  wordWrap: "break-word",
                }}
                href={startMeetingURL}
                rel="noreferrer"
              >
                {startMeetingURL}
              </a>
              <img
                onClick={() => {
                  navigator.clipboard.writeText(startMeetingURL);
                  props.showSnackbar({
                    show: true,
                    severity: "success",
                    message: "Copied meeting URL successfully!",
                  });
                }}
                title="Copy to clipboard"
                src="/icons/copy_icon.svg"
                alt="copy text"
                style={{ cursor: "pointer", height: "30px", width: "30px" }}
              />
            </Box>
            <Box
              p={5}
              pt={1}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              flexDirection={{ xs: "column", md: "row" }}
              width={{ xs: "400px", md: "500px" }}
            >
              Join Meeting:{" "}
              <a
                target="_blank"
                style={{
                  textDecoration: "none",
                  maxWidth: "339px",
                  wordWrap: "break-word",
                }}
                href={instantMeetingURL}
                rel="noreferrer"
              >
                {instantMeetingURL}
              </a>
              <img
                onClick={() => {
                  navigator.clipboard.writeText(instantMeetingURL);
                  props.showSnackbar({
                    show: true,
                    severity: "success",
                    message: "Copied meeting URL successfully!",
                  });
                }}
                title="Copy to clipboard"
                src="/icons/copy_icon.svg"
                alt="copy text"
                style={{ cursor: "pointer", height: "30px", width: "30px" }}
              />
            </Box>
          </>
        )}
      </Dialog>
      <RootStyle
        id="navbar-dashboard"
        sx={{
          ...(isCollapse && {
            width: { lg: `calc(100%)` },
          }),
        }}
      >
        {/* <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: "text.primary" }}> */}
        <Icon
          icon={menu2Fill}
          className="hamburger-full-width"
          onClick={onToggleCollapse}
        />
        {/* </IconButton> */}
        <ToolbarStyle>
          <MHidden width="lgUp">
            <IconButton
              onClick={onOpenSidebar}
              sx={{ mr: 1, color: "text.primary" }}
            >
              <Box marginTop="16px">
                <Icon icon={menu2Fill} />
              </Box>
            </IconButton>
          </MHidden>

          <Box display={{ xs: "none", lg: "block" }}>
            <TypographyStyle
              className="logo-header"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img
                src={logo}
                alt=""
                className="img-fluid"
                style={{ width: 100 }}
              />
            </TypographyStyle>
          </Box>
          <Box
            width="100%"
            display={{ xs: "flex", lg: "none" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <img
              src={logo}
              alt=""
              className="img-fluid"
              style={{ width: 100, height: "35px" }}
            />
            <Box flexGrow={1} justifyContent="center" display="flex">
              {/* <div className="username meeting-in-progress">
            <MeetingButton>
              <img
                src="/icons/meeting-in-process.svg"
                style={{ marginRight: "5px" }}
              />
              Meeting in Progress
            </MeetingButton>
          </div> */}
              <div className="username">
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => {
                    const { isOpen } = popupState;
                    if (showSuccess) {
                      // close and reset showSuccess to false
                      popupState.close();
                      setShowSuccess(false);
                    }
                    return (
                      <div>
                        {/* <Button variant="contained" color="primary" >
                    Open Popover
                  </Button> */}
                        <ScheduleMeeting
                          {...bindTrigger(popupState)}
                          className="schedule-meeting-btn-1"
                        >
                          Schedule meeting
                          {isOpen ? (
                            <ExpandLessIcon className="expand-arrow-icon" />
                          ) : (
                            <ExpandMoreIcon className="expand-arrow-icon" />
                          )}
                          {showLoader && (
                            <CircularProgress
                              style={{ color: "white" }}
                              size="12px"
                            />
                          )}
                        </ScheduleMeeting>

                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <Box
                            id="schedule-meeting-btn-popover"
                            p={2}
                            height="150px"
                            width="187px"
                            display="flex"
                            justifyContent="space-around"
                            flexDirection="column"
                            style={{ boxShadow: "0px 0px 4px 0px #E5E6FF" }}
                          >
                            <Box display="flex" justifyContent="space-between">
                              <Typography
                                style={{ cursor: "pointer" }}
                                className="option"
                                onClick={createInstantMeeting}
                              >
                                Instant meeting
                              </Typography>

                              {createInstantMeetingLoader && (
                                <CircularProgress
                                  style={{ color: "blue" }}
                                  size="12px"
                                />
                              )}
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                              <Typography
                                style={{ cursor: "pointer" }}
                                className="option"
                                onClick={createInstantZoomMeeting}
                              >
                                Instant Zoom
                              </Typography>

                              {createInstantZoomMeetingLoader && (
                                <CircularProgress
                                  style={{ color: "blue" }}
                                  size="12px"
                                />
                              )}
                            </Box>
                            <Typography
                              style={{ cursor: "pointer" }}
                              className="option"
                              onClick={openCreateEventPopup}
                            >
                              Schedule meeting
                            </Typography>

                            <TextField
                              required
                              id="meeting-url"
                              name="meeting-url"
                              // variant="outlined"
                              placeholder="Enter meeting URL"
                              onKeyDown={keyPress}
                            />

                            {/* <Snackbar
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={showSuccess}
                          autoHideDuration={4000}
                          onClose={() => setShowSuccess(false)}
                        >
                          <Alert severity="success">
                            Bluecap will join the meeting shortly.
                          </Alert>
                        </Snackbar>
                        */}

                            {/* <Snackbar
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={showError}
                          autoHideDuration={4000}
                          onClose={() => setShowError(false)}
                        >
                          <Alert severity="error">
                            Please enter valid meeting URL.
                          </Alert>
                        </Snackbar> */}
                          </Box>
                        </Popover>
                      </div>
                    );
                  }}
                </PopupState>
              </div>
              <div className="username header-searchbar">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBaseSearch
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </div>
            </Box>
          </Box>
          <UserName className="header-user-details">
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 0.5, sm: 1.5 }}
              style={{ marginLeft: 10 }}
            >
              <div className="username">
                Hello,
                <br /> {user.displayName}!
              </div>
              {weatherData && (
                <div
                  style={{
                    boxShadow: "0px 0px 10px 0px rgba(229, 230, 255, 1)",
                    borderRadius: "6px",
                  }}
                  className="forcast"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      height="45px"
                      style={{ width: "50px" }}
                      width="50px"
                      src={`${weatherData.iconUrl}`}
                      alt=""
                    />

                    <Box
                      display="flex"
                      style={{ paddingRight: "10px" }}
                      flexDirection="row"
                    >
                      {preferredUnit == "c" && (
                        <>
                          <Typography
                            variant="h6"
                            style={{ color: "rgba(64, 64, 64, 1)" }}
                          >
                            {weatherData.celsius}
                          </Typography>
                          <Typography
                            style={{ color: "rgba(64, 64, 64, 1)" }}
                            variant="subtitle1"
                          >
                            &nbsp;°C
                          </Typography>
                          <Typography
                            style={{ color: "rgba(64, 64, 64, 1)" }}
                            variant="caption"
                          >
                            &nbsp;|&nbsp;
                          </Typography>
                          <Typography
                            color="primary"
                            style={{ cursor: "pointer" }}
                            variant="caption"
                            onClick={() => changePreferredUnit("f")}
                          >
                            {" "}
                            <p>°F</p>
                          </Typography>
                        </>
                      )}

                      {preferredUnit == "f" && (
                        <>
                          <Typography
                            variant="h6"
                            style={{ color: "rgba(64, 64, 64, 1)" }}
                          >
                            {weatherData.fahrenheit}
                          </Typography>
                          <Typography
                            style={{ color: "rgba(64, 64, 64, 1)" }}
                            variant="subtitle1"
                          >
                            &nbsp;°F
                          </Typography>
                          <Typography
                            style={{ color: "rgba(64, 64, 64, 1)" }}
                            variant="caption"
                          >
                            &nbsp;|&nbsp;
                          </Typography>
                          <Typography
                            color="primary"
                            style={{ cursor: "pointer" }}
                            variant="caption"
                            onClick={() => changePreferredUnit("c")}
                          >
                            {" "}
                            <p>°C</p>
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </div>
              )}
            </Stack>
          </UserName>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            {/* <div className="username meeting-in-progress">
            <MeetingButton>
              <img
                src="/icons/meeting-in-process.svg"
                style={{ marginRight: "5px" }}
              />
              Meeting in Progress
            </MeetingButton>
          </div> */}
            <div className="username">
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => {
                  const { isOpen } = popupState;
                  if (showSuccess) {
                    // close and reset showSuccess to false
                    popupState.close();
                    setShowSuccess(false);
                  }
                  return (
                    <div>
                      {/* <Button variant="contained" color="primary" >
                    Open Popover
                  </Button> */}
                      <ScheduleMeeting
                        {...bindTrigger(popupState)}
                        className="schedule-meeting-btn"
                      >
                        Schedule meeting
                        {isOpen ? (
                          <ExpandLessIcon className="expand-arrow-icon" />
                        ) : (
                          <ExpandMoreIcon className="expand-arrow-icon" />
                        )}
                        {showLoader && (
                          <CircularProgress
                            style={{ color: "white" }}
                            size="12px"
                          />
                        )}
                      </ScheduleMeeting>

                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <Box
                          id="schedule-meeting-btn-popover"
                          p={2}
                          height="150px"
                          width="187px"
                          display="flex"
                          justifyContent="space-around"
                          flexDirection="column"
                          style={{ boxShadow: "0px 0px 4px 0px #E5E6FF" }}
                        >
                          <Box display="flex" justifyContent="space-between">
                            <Typography
                              style={{ cursor: "pointer" }}
                              className="option"
                              onClick={createInstantMeeting}
                            >
                              Instant meeting
                            </Typography>

                            {createInstantMeetingLoader && (
                              <CircularProgress
                                style={{ color: "blue" }}
                                size="12px"
                              />
                            )}
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography
                              style={{ cursor: "pointer" }}
                              className="option"
                              onClick={createInstantZoomMeeting}
                            >
                              Instant Zoom
                            </Typography>

                            {createInstantZoomMeetingLoader && (
                              <CircularProgress
                                style={{ color: "blue" }}
                                size="12px"
                              />
                            )}
                          </Box>
                          <Typography
                            style={{ cursor: "pointer" }}
                            className="option"
                            onClick={openCreateEventPopup}
                          >
                            Schedule meeting
                          </Typography>

                          <TextField
                            required
                            id="meeting-url"
                            name="meeting-url"
                            // variant="outlined"
                            placeholder="Enter meeting URL"
                            onKeyDown={keyPress}
                          />

                          {/* <Snackbar
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={showSuccess}
                          autoHideDuration={4000}
                          onClose={() => setShowSuccess(false)}
                        >
                          <Alert severity="success">
                            Bluecap will join the meeting shortly.
                          </Alert>
                        </Snackbar>
                        */}

                          {/* <Snackbar
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={showError}
                          autoHideDuration={4000}
                          onClose={() => setShowError(false)}
                        >
                          <Alert severity="error">
                            Please enter valid meeting URL.
                          </Alert>
                        </Snackbar> */}
                        </Box>
                      </Popover>
                    </div>
                  );
                }}
              </PopupState>
            </div>
            <div className="username header-searchbar">
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                
              </Search> */}
              <Box display="flex">
                <Box
                  width={{ xs: "400px", md: "500px" }}
                  id="algolia-autocomplete-input"
                />
                <Box
                  style={{ cursor: "pointer" }}
                  aria-describedby={filterPopoverId}
                  variant="contained"
                  paddingLeft={1}
                  display="flex"
                  onClick={openSearchFilter}
                  alignItems="center"
                >
                  <img src="/icons/filter.svg"></img>
                </Box>

                <Popover
                  id={filterPopoverId}
                  open={filterStatus}
                  anchorEl={filterEl}
                  onClose={closeSearchFilter}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Box width={{ xs: "400px", md: "500px" }} height={300}>
                    <Box padding={4}>
                      <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                          label="Meeting date"
                          inputFormat="dd/MM/yyyy"
                          value={filterDate}
                          onChange={handleFilterDateChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Box>

                    <Box padding={4}>
                      <Button variant="contained" onClick={applyFilter}>
                        Search
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
            </div>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            <NotificationCriticalPopover user={user} logout={logout} />
            <NotificationsPopover />
            <AccountPopover user={user} logout={logout} />
          </Stack>
        </ToolbarStyle>
      </RootStyle>
    </>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar);
