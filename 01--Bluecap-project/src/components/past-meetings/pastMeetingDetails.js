import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { styled, alpha } from "@material-ui/core/styles";
import { Container, getRatingUtilityClass, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../../assets/css/pastMeeting.scss";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import LockIcon from "@material-ui/icons/Lock";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SearchIcon from "@material-ui/icons/Search";
import Link from "@material-ui/core/Link";
import Drawer from "@material-ui/core/Drawer";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import HistoryIcon from "@material-ui/icons/History";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Popover from "@mui/material/Popover";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { withStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import Video from "./video";

import {
  Box,
  Button,
  InputBase,
  Typography,
  CircularProgress,
  Input,
} from "@material-ui/core";
import ChipsArray from "./chips";
import TabPanel from "./tabPanel";
import {
  getTranscriptByMeetingId,
  getSummary,
  getChangeLog,
  getNotes,
  getMeetingByMeetingId,
  setParticipantsFlag,
  storeSummary,
  storeActions,
  markTranscriptAsReadFs,
  markSummaryAsReadFs,
  markActionAsReadFs,
  markNotesAsReadFs,
  storeActionRatings,
  storeSummaryRatings,
  summaryStore,
  DBmeeting as meetingStore,
  getUserByUserId,
  UpdateTranscriptByMeetingId,
} from "../../firebase/firestore";
import { useParams } from "react-router-dom";
import Transcription from "./transcription";
import moment from "moment-timezone";
// import { EditText, EditTextarea } from 'react-edit-text';
// import 'react-edit-text/dist/index.css';
import EdiText from "react-editext";
import { filter, identity, result } from "lodash";
import Page from "../Page";
import Sentiment from "./sentiment";
import Participation from "./participation";
import Attendance from "./attendance";
import ShowChangeHistory from "./ShowChangeHistory";
import ShowActionChangeHistory from "./ShowActionChangeHistory";
import firebase from "../../firebase/firebase";
import { getData, postData } from "../../utils";
import Rating from "@mui/material/Rating";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import PropTypes from "prop-types";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Dialog from "@material-ui/core/Dialog";
import ManageSpeakers from "./manageSpeakers";
import InputSpinner from "react-bootstrap-input-spinner";
import AddMeetingTopics from "../AddMeetingTopics";
import MeetingOutcome from "./MeetingOutcome";
import { useHistory } from "react-router-dom";
import Badge from "@mui/material/Badge";

import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { ConstructionOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    padding: "20px",
  },
  emoIcon: {
    color: "#2C73FF",
    paddingTop: "5px",
    marginLeft: "10px",
  },
  LockIcon: {
    color: "#828282",
    marginLeft: "10px",
  },
  pl: {
    marginLeft: "10px",
    color: "#787878",
  },
  searchIcon: {
    color: "#7DA8FB",
  },
  searchBox: {
    background: "#fff",
    boxShadow: "0px 0px 10px #E5E6FF",
    borderRadius: "6px",
    // width: '220px'
  },
  showHistory: {
    fontSize: "16px",
    fontWeight: "600",
  },
  meetingTitle: {
    fontSize: "20px",
    marginLeft: "10px",
  },
  actionBox: {
    height: "300px",
    overflow: "auto",
    marginTop: "10px",
    boxShadow: "0px 0px 10px #E5E6FF",
  },
  summaryBox: {
    fontSize: "14px",
    padding: "20px",
    height: "300px",
    overflow: "auto",
    marginBottom: "20px",
    marginTop: "10px",
    boxShadow: "0px 0px 10px #E5E6FF",
  },
  attachmentBox: {
    height: "250px",
    overflow: "auto",
    boxShadow: "0px 0px 10px #E5E6FF",
    marginTop: "10px",
  },
  iconBrown: {
    color: "#787878",
  },
  mt20: {
    marginTop: "20px",
  },
  percent: {
    background: "#EDF3FF",
    borderRadius: "6px",
    width: "100px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  },
  backToList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "space-between",
    cursor: "pointer",
  },
  nxtpre: {
    display: "flex",
    // alignItems: 'center',
    justifyContent: "flex-end",
    // alignContent: 'space-between',
  },
  previous: {
    "&:hover": {
      color: "#2C73FF",
      cursor: "pointer",
    },
  },
  next: {
    paddingLeft: "20px",
    "&:hover": {
      color: "#2C73FF",
      cursor: "pointer",
    },
  },
  thumbs: {
    display: "flex",
    justifyContent: "space-between",
    width: "80px",
    color: "#2C73FF",
  },
  dialogTitle: {
    fontSize: "16px",
    fontWeight: "Bold",
    textAlign: "center",
    color: "#303030",
  },
  noSpeakers: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "20px 0",
  },
  autocompleteChips: {
    marginTop: "50px",
  },
  ml10: {
    marginLeft: "10px",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#B345D2",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  // animation: 'ripple 1.2s infinite ease-in-out',
  width: 12,
  height: 12,
  // border: `1px solid ${theme.palette.background.paper}`,
}));

const customIcons = {
  1: {
    icon: <ThumbUpAltOutlinedIcon />,
    label: "Up",
  },
  2: {
    icon: <ThumbDownAltOutlinedIcon />,
    label: "Down",
  },
};

const CustomCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function IconContainerSummary(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainerSummary.propTypes = {
  value: PropTypes.number.isRequired,
};

function IconContainerAction(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainerAction.propTypes = {
  value: PropTypes.number.isRequired,
};

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

function monthName(timestamp) {
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var month = month[timestamp.getMonth()];
  return month;
}

function monthNameSort(timestamp) {
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  var month = month[timestamp.getMonth()];
  return month;
}

function formatAMPM(hours, minutes) {
  // var hours = date.getHours();
  // var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

// speaker popover
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

function CenteredGrid({ ...props }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  let { id } = useParams();
  let meetingId = id.slice(id.length - 6);
  const [summaryData, setSummaryData] = useState(false);
  // const [summaryHistory, setSummaryHistory] = useState([]);
  // const [actionHistory, setActionHistory] = useState([]);
  const [transcriptionData, setTranscriptionData] = useState([]);
  const [transcriptRead, setTranscriptRead] = useState(false);
  const [summaryRead, setSummaryRead] = useState(false);
  const [actionRead, setActionRead] = useState(false);
  const [notesRead, setNotesRead] = useState(false);
  const [actionPlans, setActionData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [meetingData, setMeetingData] = useState([]);
  const [fulldate, setfullDate] = useState("");
  const [fulltime, setfullTime] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [actionEditMode, setActionEditMode] = useState(false);
  const [summaryEditMode, setSummaryEditMode] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [sentiment, setSentiment] = useState([]);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [showActionHistoryPopup, setShowActionHistoryPopup] = useState(false);
  const [historyNumber, setHistoryNumber] = useState(false);
  const [actionHistoryNumber, setActionHistoryNumber] = useState(false);
  const [participation, setParticipation] = useState([]);
  const [summaryRatings, setSummaryRatings] = useState("");
  const [actionRatings, setActionRatings] = useState("");
  const [hover, setHover] = useState("");
  const [refreshData, setRefreshData] = useState(0);
  const [speakersList, setSpeakersList] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [simpleSpeaker, setSimpleSpeakers] = useState([]);
  const [isValue, setIsValue] = useState(true);
  const [meetingType, setMeetingType] = useState("");
  const [meetingTypeTxt, setMeetingTypeTxt] = useState("");
  const [isSummaryAvailable, setIsSummaryAvailable] = useState(false);
  const [organiserName, setOrganiserName] = useState("");

  const history = useHistory();

  // Generate summary manually
  const handleGenerateSummary = () => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let genSummary = await postData(
          `${process.env.REACT_APP_BASE_API_URL}/meeting/generateZoomAI`,
          jwtToken,
          { meetingId: id }
        );
        console.log("genSummary.status", genSummary.status);
        if (genSummary.status == "success") {
          props.showSnackbar({
            show: true,
            severity: "success",
            message: "We are processing this meeting, please check back soon.",
          });
          let getSummaryOn = await getSummary(id);
          setSummaryData(getSummaryOn.summary);
          setIsSummaryAvailable(true);

          let meetingData = await getMeetingByMeetingId(id);
          console.log("meetingData", meetingData);
          setMeetingData(meetingData.participants);

          let newActionPlan = getSummaryOn.actionPlans;
          const actionPlans = newActionPlan.split("-");
          // console.log('actionPlans',actionPlans);
          setActionData(actionPlans);
        } else {
          props.showSnackbar({
            show: true,
            severity: "error",
            message: "Something went wrong.",
          });
        }
      });
  };

  // handle back to dashboard
  const handleBackToDashboard = () => {
    history.push("/dashboard");
  };

  // speaker popover

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSpeakersClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSpeakersClose = () => {
    setAnchorEl(null);
  };

  const openSpeakers = Boolean(anchorEl);
  const speakerId = openSpeakers ? "simple-popover" : undefined;

  const [personName, setPersonName] = React.useState([]);
  const [latestSpeakers, setlatestSpeakers] = React.useState([]);

  const handleSpeakersChange = async (event) => {
    setSimpleSpeakers(event.target.value);

    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    let res = await getMeetingByMeetingId(id);
    let speakerAvatar = [];
    // console.log('value',value)

    if (value.length == 0) {
      setIsValue(false);
    } else {
      setIsValue(true);
    }

    let newParticipants =
      res.participants &&
      res.participants.map((participant) => {
        let existParticipant = value.filter((v) => v == participant.name);
        if (existParticipant.length) {
          participant.isAssigned = true;
          speakerAvatar.push({
            avatar: participant.avatar,
            name: participant.name,
            isAssigned: participant.isAssigned,
          });
        } else {
          participant.isAssigned = false;
        }
        return participant;
      });

    setlatestSpeakers(speakerAvatar);
    let updateParti = await setParticipantsFlag(newParticipants, id);

    const updateTranscriptInDB = async (id, transcriptId, transcriptName) => {
      let updateNameNull = await UpdateTranscriptByMeetingId(
        id,
        transcriptId,
        transcriptName
      );
      if (updateNameNull) {
        props.showSnackbar({
          show: true,
          severity: "success",
          message: "Saved.",
        });
      } else {
        props.showSnackbar({
          show: true,
          severity: "error",
          message: "Something went wrong.",
        });
      }
    };

    if (updateParti) {
      let newTranscriptList = transcriptionData.map((transcript) => {
        let transcriptId = transcript.uid;
        if (!value.includes(transcript.name)) {
          transcript.name = null;
          updateTranscriptInDB(id, transcriptId, transcript.name);
        }
        return transcript;
      });

      setTranscriptionData(newTranscriptList);

      props.showSnackbar({
        show: true,
        severity: "success",
        message: "Saved.",
      });
    } else {
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Something went wrong.",
      });
    }

    // else {
    //   setIsValue(false)
    //   setlatestSpeakers(speakerAvatar = false)
    //   props.showSnackbar({
    //     show: true,
    //     severity: "error",
    //     message: "Please select atleast one speaker",
    //   });
    // }

    // console.log('speakerAvatar', value)
  };

  const setHoverSummaryAction = (val) => {
    var hoverVal = val == 1 ? "Like" : "Dislike";
    setHover(hoverVal);
  };

  const getRatingSummary = async (payload) => {
    var payloadStore = payload == 1 ? "UP" : "DOWN";
    let res = await storeSummaryRatings(id, payloadStore);
    if (res) {
      setSummaryRatings(payload);
      props.showSnackbar({
        show: true,
        severity: "success",
        message: "Saved.",
      });
    } else {
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Something went wrong.",
      });
    }
  };

  const getRatingAction = async (payload) => {
    var payloadStore = payload == 1 ? "UP" : "DOWN";
    let res = await storeActionRatings(id, payloadStore);
    if (res) {
      setActionRatings(payload);
      props.showSnackbar({
        show: true,
        severity: "success",
        message: "Saved.",
      });
    } else {
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Something went wrong.",
      });
    }
  };

  const handleSummaryScrollEvent = async (e) => {
    const bottom =
      e.target.scrollHeight.toFixed(0) - e.target.scrollTop.toFixed(0) ===
      e.target.clientHeight;
    if (bottom) {
      markSummaryAsRead();
    }
  };

  const handleActionScrollEvent = async (e) => {
    const bottom =
      e.target.scrollHeight.toFixed(0) - e.target.scrollTop.toFixed(0) ===
      e.target.clientHeight;
    // alert((e.target.scrollHeight.toFixed(0) - e.target.scrollTop.toFixed(0))+"--"+e.target.clientHeight)
    if (bottom) {
      markActionAsRead();
    }
  };

  const handleSave = (val) => {
    let payload = {
      summary: val,
    };
    setValue(val);
    let storeSummaryRes = storeSummary(payload, id);

    if (storeSummaryRes && !summaryRead) {
      markSummaryAsRead();
    }
  };

  const deleteAction = async (val) => {
    let res = await getSummary(id);
    if (res) {
      const actionPlans = res.actionPlans ? res.actionPlans : [];
      let ret = actionPlans.replace("-" + val, "");
      handleSaveActions(ret);
      props.showSnackbar({
        show: true,
        severity: "success",
        message: "Removed.",
      });
    } else {
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Something went wrong.",
      });
    }
  };

  const handleSaveActions = (val) => {
    let payload = {
      actionPlans: val,
    };
    const actionPlans = val.split("-");
    let storeActionRes = storeActions(payload, id);

    if (storeActionRes && !actionRead) {
      markActionAsRead();
    }

    setActionData(actionPlans);
    setActionEditMode(false);
  };

  const handleCancleActions = (val) => {
    const actionPlans = val.split("-");
    setActionData(actionPlans);
    setActionEditMode(false);
  };

  const handleActionEdit = () => {
    setActionEditMode(true);
    // actionPlans.join('-');
    setActionData(actionPlans.join("-"));
  };

  const [changeLogs, setChangeLogs] = useState(false);

  const handleDrawerClose = () => {
    setDrawerStatus(false);
    setChangeLogs(false);
  };

  const handleSummaryChangeClick = (tmpSummaryUpdateNo) => {
    setDrawerStatus(false);
    setShowHistoryPopup(true);
    setHistoryNumber(totalSummaryUpdateNo + 1 - tmpSummaryUpdateNo);
  };

  const handleActionChangeClick = (tmpActionUpdateNo) => {
    setDrawerStatus(false);
    setShowActionHistoryPopup(true);
    setActionHistoryNumber(totalActionUpdateNo + 1 - tmpActionUpdateNo);
  };

  const showChangeLog = async () => {
    setDrawerStatus(true);

    let changeLog = await getChangeLog(id);

    if (!changeLog) {
      handleDrawerClose();
      return;
    }
    const formatedChangeLogs = [];
    let loopDate = "";
    changeLog.data.forEach((changeLogDoc) => {
      let dataObj = {
        description: changeLogDoc.description,
        photoURL: changeLogDoc.photoURL,
        displayName: changeLogDoc.displayName,
        id: changeLogDoc.id,
      };

      let changeDate = new Date(changeLogDoc.timestamp);

      dataObj.time = changeDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (loopDate != changeDate.getDate() + "-" + changeDate.getMonth()) {
        loopDate = changeDate.getDate() + "-" + changeDate.getMonth();
        //dataObj.date = ("0" + changeDate.getDate()).slice(-2) + "-" + ("0" + (changeDate.getMonth() + 1)).slice(-2)
        dataObj.date =
          ("0" + changeDate.getDate()).slice(-2) +
          " " +
          monthNameSort(changeDate) +
          " " +
          changeDate.getFullYear();
      }

      formatedChangeLogs.push(dataObj);
    });

    setChangeLogs(formatedChangeLogs);
  };

  const markTranscriptAsRead = async () => {
    if (!transcriptRead) {
      let res = await markTranscriptAsReadFs(id);
      if (res) {
        setTranscriptRead(true);
        props.showSnackbar({
          show: true,
          severity: "success",
          message: "Transcript marked as reviewed successfully.",
        });
      } else {
        props.showSnackbar({
          show: true,
          severity: "error",
          message: "Something went wrong.",
        });
      }
    }
  };

  const markNotesAsRead = async () => {
    if (!notesRead) {
      let res = await markNotesAsReadFs(id);
      if (res) {
        setNotesRead(true);
        props.showSnackbar({
          show: true,
          severity: "success",
          message: "Notes marked as reviewed successfully.",
        });
      } else {
        props.showSnackbar({
          show: true,
          severity: "error",
          message: "Something went wrong.",
        });
      }
    }
  };

  const markSummaryAsRead = async () => {
    if (!summaryRead) {
      let res = await markSummaryAsReadFs(id);
      if (res) {
        setSummaryRead(true);
        props.showSnackbar({
          show: true,
          severity: "success",
          message: "Summary marked as reviewed successfully.",
        });
      } else {
        props.showSnackbar({
          show: true,
          severity: "error",
          message: "Something went wrong.",
        });
      }
    }
  };

  const markActionAsRead = async () => {
    if (!actionRead) {
      let res = await markActionAsReadFs(id);
      if (res) {
        setActionRead(true);
        props.showSnackbar({
          show: true,
          severity: "success",
          message: "Action plan marked as reviewed successfully.",
        });
      } else {
        props.showSnackbar({
          show: true,
          severity: "error",
          message: "Something went wrong.",
        });
      }
    }
  };

  //   const showChangeLog = async () => {
  //     setDrawerStatus(true)

  //     let changeLog = await getChangeLog(id);

  //     if(!changeLog) {
  //         handleDrawerClose()
  //         return;
  //     }
  //     const formatedChangeLogs = [];
  //     let loopDate = '';
  //     changeLog.data.forEach((changeLogDoc) => {

  //         let dataObj = {
  //             description: changeLogDoc.description,
  //             photoURL: changeLogDoc.photoURL,
  //             displayName: changeLogDoc.displayName,
  //             id:changeLogDoc.id
  //         };

  //         let changeDate = new Date(changeLogDoc.timestamp)

  //         dataObj.time = changeDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric',  hour12: true });

  //         if(loopDate != changeDate.getDate() + "-" + changeDate.getMonth()){
  //             loopDate = changeDate.getDate() + "-" + changeDate.getMonth()
  //             //dataObj.date = ("0" + changeDate.getDate()).slice(-2) + "-" + ("0" + (changeDate.getMonth() + 1)).slice(-2)
  //             dataObj.date = monthName(changeDate) + " " + ("0" + changeDate.getDate()).slice(-2) + " , " + changeDate.getFullYear()
  //         }

  //         formatedChangeLogs.push(dataObj)
  //     })

  //     setChangeLogs(formatedChangeLogs)

  // }

  // Manage popup for speakers

  // const [open, setOpen] = React.useState(false);

  // function SimpleDialog(props) {
  //   const { onClose, open } = props;

  //   const handleClose = () => {
  //     onClose();
  //   };

  //   function handleSpeakerSubmit(event) {
  //     event.preventDefault();
  //     let payload = {
  //       speakers: speakers
  //     };
  //     console.log(payload);
  //   }

  //   return (
  //     <Dialog maxWidth="lg" onClose={handleClose} open={open} >
  //       <div style={{ padding: '20px', width: "800px" }}>
  //         <CloseIcon onClick={handleClose} style={{ float: 'right', cursor: 'pointer' }} />
  //         <p className={classes.dialogTitle}>Manage speakers</p>
  //         <p style={{ textAlign: 'center' }}>Edit the list of speakers, remove or add new users</p>

  //         <p className={classes.noSpeakers}>Number of speakers</p>
  //         <InputSpinner
  //           type={'int'}
  //           precision={0}
  //           max={10}
  //           min={1}
  //           step={1}
  //           value={value}
  //           onChange={num => console.log(num)}
  //           variant={'primary'}
  //           size="lg"
  //         />

  //         <p className={classes.noSpeakers}>Speakers</p>
  //         <form onSubmit={handleSpeakerSubmit}>
  //           <Autocomplete
  //             multiple
  //             // freeSolo
  //             id="tags-outlined"
  //             className="autocompleteChips"
  //             options={speakersList}
  //             // defaultValue={[]}
  //             renderInput={params => (
  //               <TextField
  //                 {...params}
  //                 variant="outlined"
  //                 label="Search & add"
  //                 placeholder="Type to add speaker"
  //                 value={speakers}
  //                 onInput={e => setSpeakers(e.target.params)}
  //               />
  //             )}
  //           />
  //           <Button type="submit" variant="contained" style={{ float: 'right', margin: '20px 5px' }}>Save</Button>
  //           <Button variant="outlined" onClick={handleClose} style={{ float: 'right', margin: '20px 5px' }}>Cancel</Button>
  //         </form>
  //       </div>
  //     </Dialog>
  //   );
  // }

  // SimpleDialog.propTypes = {
  //   onClose: PropTypes.func.isRequired,
  //   open: PropTypes.bool.isRequired,
  // };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = (value) => {
  //   setOpen(false);
  // };

  useEffect(() => {
    let unsubscribeSummaryObserver;
    let unsubscribeMeetingObserver;

    // let meetingData = await getMeetingByMeetingId(id);
    // let notesData = await getNotes(id);
    // let transcriptionData = await getTranscriptByMeetingId(id);
    // let summaryData = await getSummary(id);

    async function loadData() {
      let d = await Promise.all([
        getMeetingByMeetingId(id),
        getNotes(id),
        getTranscriptByMeetingId(id),
        getSummary(id),
      ]);
      let meetingData = d[0];
      let notesData = d[1];
      let transcriptionData = d[2];
      let summaryData = d[3];

      if (!meetingData) return;

      //set Observer

      if (
        new Date(meetingData.endedAt.toDate().getTime() + 10 * 60000) >
        Date.now()
      ) {
        let myObservers = {
          initializedSummaryObserver: false,
          initializedMeetingObserver: false,
          refresh: function (type) {
            setRefreshData(refreshData + 1);
          },
        };

        unsubscribeSummaryObserver = summaryStore.doc(id).onSnapshot((doc) => {
          if (myObservers.initializedSummaryObserver) {
            myObservers.refresh();
          } else {
            myObservers.initializedSummaryObserver = true;
          }
        });

        unsubscribeMeetingObserver = meetingStore.doc(id).onSnapshot((doc) => {
          if (myObservers.initializedMeetingObserver) {
            myObservers.refresh();
          } else {
            myObservers.initializedMeetingObserver = true;
          }
        });
      }

      // console.log('summaryData', summaryData)
      // console.log('meetingData.channelType', meetingData.channelType)
      meetingData.channelType
        ? setMeetingType(meetingData.channelType)
        : setMeetingType("");
      summaryData == false
        ? setIsSummaryAvailable(false)
        : setIsSummaryAvailable(true);

      console.log("meetingData= ", meetingData);
      setMeetingData(meetingData.participants);

      if (
        meetingData.organizer !== undefined &&
        meetingData.organizer.displayName !== undefined
      ) {
        setOrganiserName(meetingData.organizer.displayName);
      }

      // set meeting type
      if (meetingData.channelType == "GOOGLE_MEET") {
        setMeetingTypeTxt("/images/google-meet-logo.svg");
      } else if (meetingData.channelType == "ZOOM") {
        setMeetingTypeTxt("/images/zoom-logo.png");
      }

      // to check particepant list is empty for assignment
      let tempParticipant = [];
      if (meetingData.participants && meetingData.participants.length) {
        meetingData.participants.map((participant) => {
          if (participant.isAssigned == true) {
            tempParticipant.push({
              name: participant.name,
              isAssigned: participant.isAssigned,
              avatar: participant.avatar,
            });
            // setIsValue(false)
          }
        });
        // console.log('tempParticipant', tempParticipant)
        if (tempParticipant.length > 0) {
          setIsValue(true);
          setlatestSpeakers(tempParticipant);
        } else {
          setIsValue(false);
        }
      }
      //

      if (meetingData.title) {
        setMeetingTitle(meetingData.title);
      } else {
        setMeetingTitle(meetingData.channelId);
      }

      let speakerList = [];
      meetingData.participants &&
        meetingData.participants.map((participant) => {
          speakerList.push({
            name: participant.name,
            isAssigned: participant.isAssigned,
          });
        });

      let simpleSpeakerTemp = [];
      speakerList.map((speaker) => {
        if (speaker.isAssigned == true) {
          simpleSpeakerTemp.push(speaker.name);
        }
      });
      // console.log('simpleSpeaker= ', simpleSpeaker);

      setSimpleSpeakers(simpleSpeakerTemp);
      // if(simpleSpeakerTemp.length){
      //   setIsValue(true)
      // } else {
      //   setIsValue(false)
      // }
      setSpeakersList(speakerList);
      setAttachments(meetingData.attachments);
      setSentiment(meetingData.participants);

      if (meetingData.transcriptRead && meetingData.transcriptRead == true) {
        setTranscriptRead(true);
      }

      let transcriptionAll = [];
      let isAssigned = "";
      transcriptionData.forEach((doc) => {
        // console.log('doc', doc.data());

        let Astatus = meetingData.participants.filter(
          (v) => v.name == doc.data().name
        );
        // console.log('Astatus',Astatus);

        Astatus.length
          ? (isAssigned = Astatus[0].isAssigned)
          : (isAssigned = false);

        let mDuration = doc.data().timestamp - meetingData.createdAt;
        transcriptionAll.push({
          text: doc.data().text,
          speaker: doc.data().speaker,
          name: doc.data().name,
          isAssigned: isAssigned,
          timestamp: doc.data().timestamp,
          uid: doc.id,
          duration: mDuration,
        });
      });

      // console.log('transcriptionAll', transcriptionAll);

      setTranscriptionData(transcriptionAll);
      let timestamp = meetingData.createdAt.toDate();

      let date = timestamp.getDate();
      let month = monthName(timestamp);
      let year = timestamp.getFullYear();
      let hours = timestamp.getHours();
      let minutes = timestamp.getMinutes();
      let fullTime = formatAMPM(hours, minutes);
      let fulldate = month + " " + date + " , " + year;
      let timeZone = moment().tz(moment.tz.guess()).format("z");
      setfullDate(fulldate);
      setfullTime(fullTime);
      setTimeZone(timeZone);
      // console.log(moment().tz(moment.tz.guess()).format('z'));

      // console.log('summaryData', summaryData)
      setSummaryData(summaryData.summary);

      if (summaryData.summaryReaction == "UP") {
        setSummaryRatings(1);
      } else if (summaryData.summaryReaction == "DOWN") {
        setSummaryRatings(2);
      }

      if (summaryData.actionPlansReaction == "UP") {
        setActionRatings(1);
      } else if (summaryData.actionPlansReaction == "DOWN") {
        setActionRatings(2);
      }

      // setActionRatings(summaryData.actionPlansReaction)

      if (summaryData.summaryRead && summaryData.summaryRead == true) {
        setSummaryRead(true);
      }
      if (summaryData.actionPlansRead && summaryData.actionPlansRead == true) {
        setActionRead(true);
      }

      // if(summaryData.history_summary) setSummaryHistory(summaryData.history_summary)
      // if(summaryData.history_actionPlans) setActionHistory(summaryData.history_actionPlans)

      // let notesData = await getNotes(id);
      if (
        notesData &&
        notesData.specialNotes &&
        notesData.specialNotes.length
      ) {
        notesData.specialNotes.forEach((element) => {
          element.duration = element.timestamp - meetingData.createdAt;
        });

        // console.log(notesData.specialNotes);
        setNotesData(notesData.specialNotes);

        if (notesData.notesRead && notesData.notesRead == true) {
          setNotesRead(true);
        }
      }

      // Action para
      const actionPlans = summaryData.actionPlans
        ? summaryData.actionPlans.split("-")
        : [];
      setActionData(actionPlans);

      firebase
        .auth()
        .currentUser.getIdToken()
        .then(async function (jwtToken) {
          let Participation = await postData(
            `${process.env.REACT_APP_BASE_API_URL}/analytics/calculateParticipation`,
            jwtToken,
            { meetingId: id }
          );
          // console.log("participants::", Participation.data);
          setParticipation(Participation.data);
        });

      let userId = firebase.auth().currentUser.uid;
      let userObj = await getUserByUserId(userId);

      if (userObj.paidPlan) {
        setIsPaidUser(true);
      }
    }

    loadData();
    if (typeof unsubscribeSummaryObserver == "function") {
      return function unsubscribe() {
        unsubscribeSummaryObserver();
        unsubscribeMeetingObserver();
      };
    }
  }, [refreshData]);

  let totalSummaryUpdateNo = 0;
  let totalActionUpdateNo = 0;

  return (
    <Page>
      <Container maxWidth={"xxl"}>
        <div className={classes.container}>
          {showHistoryPopup && (
            <ShowChangeHistory
              setSummaryData={setSummaryData}
              historyNo={historyNumber}
              meetingId={id}
              open={showHistoryPopup}
              onClose={setShowHistoryPopup}
            />
          )}
          {showActionHistoryPopup && (
            <ShowActionChangeHistory
              setActionData={setActionData}
              historyNo={actionHistoryNumber}
              meetingId={id}
              open={showActionHistoryPopup}
              onClose={setShowActionHistoryPopup}
            />
          )}

          <Drawer
            anchor="right"
            open={drawerStatus}
            onClose={handleDrawerClose}
          >
            <div style={{ width: "300px" }}>
              <Box
                display="flex"
                flexWrap="nowrap"
                justifyContent="space-around"
                alignItems="center"
                flexDirection="row"
                style={{ height: "70px" }}
              >
                <div>
                  <Typography
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "14px",
                      letterSpacing: "0em",
                      textAlign: "left",
                    }}
                  >
                    Change history
                  </Typography>
                </div>
                <Box
                  display="flex"
                  onClick={() => {
                    setDrawerStatus(false);
                    setChangeLogs(false);
                  }}
                  alignItems="center"
                >
                  <Typography
                    style={{
                      cursor: "pointer",
                      fontFamily: "Poppins",
                      fontSize: "10px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "10px",
                      letterSpacing: "0em",
                      textAlign: "left",
                    }}
                  >
                    Close
                  </Typography>
                  <ClearIcon style={{ cursor: "pointer", fontSize: "12px" }} />
                </Box>
              </Box>
            </div>

            <div style={{ padding: "10px" }}>
              {!changeLogs && (
                <Box display="flex" justifyContent="center">
                  <CircularProgress style={{ color: "blue" }} size="18px" />
                </Box>
              )}
              {changeLogs &&
                changeLogs.map((val, index) => {
                  let tmpSummaryUpdateNo;
                  let tmpActionUpdateNo;
                  if (val.description == "Updated the Summary") {
                    totalSummaryUpdateNo++;
                    tmpSummaryUpdateNo = totalSummaryUpdateNo;
                  }

                  if (val.description == "Updated the Actions") {
                    totalActionUpdateNo++;
                    tmpActionUpdateNo = totalActionUpdateNo;
                  }
                  return (
                    <div key={val.id} style={{ position: "relative" }}>
                      {val.date && (
                        <>
                          <Box
                            display="flex"
                            alignContent="center"
                            alignItems="center"
                            justifyContent="space-around"
                          >
                            <div
                              style={{ borderTop: "1px ridge", width: "28%" }}
                            ></div>
                            <p>{val.date}</p>
                            <div
                              style={{ borderTop: "1px ridge", width: "28%" }}
                            ></div>
                          </Box>
                        </>
                      )}

                      <div
                        style={{
                          height: "140px",
                          width: "2px",
                          backgroundColor: "#E6E6FF",
                          marginTop: "15px",
                          marginLeft: "5px",
                          position: "absolute",
                        }}
                      ></div>

                      <Box display="flex" alignItems="center">
                        <RadioButtonUncheckedOutlinedIcon
                          style={{
                            color: "#2C73FF",
                            fontSize: "12px",
                            border: "3px",
                          }}
                        />
                        <p style={{ paddingLeft: "10px", color: "#303030" }}>
                          {val.time}
                        </p>
                      </Box>

                      <div style={{ padding: "15px", paddingLeft: "20px" }}>
                        <Box display="flex" alignItems="center">
                          {val.photoURL && (
                            <Avatar
                              style={{
                                border: "1px solid #7DA8FB",
                                height: "25px",
                                width: "25px",
                                borderColor: "blue",
                              }}
                              alt={`${val.displayName}`}
                              src={`${val.photoURL}`}
                            />
                          )}

                          {!val.photoURL && val.displayName && (
                            <Avatar
                              style={{
                                border: "1px solid #7DA8FB",
                                height: "25px",
                                width: "25px",
                                borderColor: "blue",
                              }}
                              alt={`${val.displayName}`}
                            >
                              {" "}
                              {val.displayName.charAt(0).toUpperCase()}{" "}
                            </Avatar>
                          )}

                          <Typography
                            style={{
                              paddingLeft: "10px",
                              fontFamily: "Poppins",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: "500",
                              lineHeight: "13px",
                              color: "#303030",
                            }}
                          >
                            {val.displayName}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          style={{
                            paddingTop: "20px",
                            paddingBottom: "30px",
                          }}
                        >
                          {val.description == "Updated the Summary" && (
                            <Typography
                              onClick={() =>
                                handleSummaryChangeClick(tmpSummaryUpdateNo)
                              }
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                color: "#828282",
                                fontWeight: "400",
                                lineHeight: "17px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                cursor: "pointer",
                              }}
                            >
                              {val.description}
                            </Typography>
                          )}

                          {val.description == "Updated the Actions" && (
                            <Typography
                              onClick={() =>
                                handleActionChangeClick(tmpActionUpdateNo)
                              }
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                color: "#828282",
                                fontWeight: "400",
                                lineHeight: "17px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                cursor: "pointer",
                              }}
                            >
                              {val.description}
                            </Typography>
                          )}

                          {val.description != "Updated the Summary" &&
                            val.description != "Updated the Actions" && (
                              <Typography
                                style={{
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  fontStyle: "normal",
                                  color: "#828282",
                                  fontWeight: "400",
                                  lineHeight: "17px",
                                  letterSpacing: "0em",
                                  textAlign: "left",
                                  // cursor:"pointer"
                                }}
                              >
                                {val.description}
                              </Typography>
                            )}
                        </Box>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Drawer>

          <Grid container item xs={12} md={12} className="backtolist-block">
            {/* <Grid item xs={12} md={6}>
              <Box className={classes.backToList} onClick={handleBackToDashboard}>
                <ArrowBackIcon />
                <span>Back to the list</span>
              </Box>
            </Grid> */}
            <Box className={classes.backToList} onClick={handleBackToDashboard}>
              <ArrowBackIcon />
              <span style={{ marginLeft: "10px" }}>Back to the list</span>
            </Box>
            {/* <Grid item xs={12} md={6} className={classes.nxtpre}>
                <ChevronLeftIcon />
                <span className={classes.previous}> previous </span>
                <span className={classes.next}>next </span>
                <ChevronRightIcon />
            </Grid> */}
          </Grid>

          <Grid container item xs={12} className="notes-list">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              width="100%"
              flexWrap="wrap"
            >
              {/* <span className="details-id"> ID: {meetingId} </span> */}
              {/* <span> | </span> */}
              <span>
                {" "}
                <DateRangeIcon className="top-avtar pt-5" />{" "}
              </span>{" "}
              <span className={classes.ml10}> {fulldate} </span>
              <span className={classes.ml10}> | </span>
              <span className={classes.ml10}>
                {" "}
                <AccessTimeIcon className="top-avtar pt-5" />{" "}
              </span>{" "}
              <span className={classes.ml10}>
                {" "}
                {fulltime} ({timeZone}){" "}
              </span>
              <span className={classes.ml10}> | </span>
              <span className={classes.ml10}>
                <AvatarGroup max={10}>
                  {meetingData &&
                    meetingData.length &&
                    meetingData.map((participants, index) => {
                      return (
                        <>
                          {participants.name == organiserName ? (
                            // <Badge
                            //   overlap="circular"
                            //   title="Organiser"
                            //   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            //   badgeContent={
                            //     <SmallAvatar alt="Remy Sharp" src="/images/crown_png1.png" />
                            //   }
                            // >
                            //   <Avatar
                            //     className="pop-avatar persons"
                            //     alt={participants.name}
                            //     src={participants.avatar}
                            //     key={index}
                            //   />
                            // </Badge>

                            <StyledBadge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              variant="dot"
                              title="Organiser"
                            >
                              <Avatar
                                className="pop-avatar persons"
                                alt={participants.name}
                                src={participants.avatar}
                                key={index}
                              />
                            </StyledBadge>
                          ) : (
                            <Avatar
                              className="pop-avatar persons"
                              alt={participants.name}
                              src={participants.avatar}
                              key={index}
                            />
                          )}

                          {/* <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                          >
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </StyledBadge> */}
                        </>
                      );
                    })}
                </AvatarGroup>
              </span>
            </Box>
          </Grid>
          <div>
            <Grid container spacing={3} style={{ marginBottom: "15px" }}>
              <Grid item xs={12} sm={8}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  width="100%"
                  margin="20px 0"
                  flexWrap="wrap"
                >
                  <p>
                    <img src={meetingTypeTxt} width="25" height="25"></img>
                  </p>
                  <p className={classes.meetingTitle}>{meetingTitle} </p>
                  {/* <LockIcon className={classes.LockIcon} /> */}
                  <p style={{ marginLeft: "10px" }}> | </p>
                  <p
                    onClick={() => showChangeLog()}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    className="show-history"
                  >
                    Show change history{" "}
                  </p>
                  <p style={{ marginLeft: "10px" }}> | </p>
                  {/* <p>
                    <InsertEmoticonIcon className={classes.emoIcon} />
                  </p> */}
                  {meetingType == "ZOOM" && isSummaryAvailable !== true && (
                    <p
                      className={classes.ml10}
                      onClick={handleGenerateSummary}
                      style={{ cursor: "pointer" }}
                    >
                      Generate Summary
                    </p>
                  )}
                </Box>
              </Grid>

              {/* <Grid container item xs={12} sm={4} style={{ paddingTop: 'unset' }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  flexWrap="wrap"
                  width="100%"
                >
                  <ShareIcon className={classes.iconBrown} />
                  <span className={classes.pl}> Share meeting</span>

                  <span>
                    <Search className={classes.searchBox}>
                      <SearchIconWrapper>
                        <SearchIcon className={classes.searchIcon} />
                      </SearchIconWrapper>
                      <StyledInputBase
                        id="search"
                        placeholder="Search in this meeting"
                        inputProps={{ "aria-label": "search" }}
                        style={{ paddingLeft: "0" }}
                      />
                    </Search>
                  </span>
                </Box>
              </Grid> */}
            </Grid>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={12}>
              <Box
                display="flex"
                alignItems="center"
                alignContent="center"
                justifyContent="flex-start"
                width="100%"
                // flexWrap="wrap"
              >
                <p>
                  <MeetingOutcome meetingId={id} />
                </p>
              </Box>
            </Grid>
          </div>
          <AddMeetingTopics meetingId={id} />

          <div className={classes.root}>
            <Grid container spacing={3} className="mb-30">
              <Grid item xs={12} sm={4}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
                  className="past-meeting-section-title"
                >
                  Transcript &nbsp;
                  {transcriptionData && transcriptionData.length > 0 && (
                    <>
                      {!transcriptRead && (
                        <Box
                          title="Mark as reviewed"
                          display="flex"
                          justifyContent="center"
                          style={{ cursor: "pointer" }}
                        >
                          <CheckCircleOutlineIcon
                            color="disabled"
                            onClick={() => markTranscriptAsRead()}
                          />
                        </Box>
                      )}
                      {transcriptRead && (
                        <Box
                          display="flex"
                          justifyContent="center"
                          title="Marked as reviewed"
                        >
                          <CheckCircleOutlineIcon color="primary" />{" "}
                        </Box>
                      )}
                    </>
                  )}
                  {meetingType && meetingType == "ZOOM" && (
                    <>
                      <p style={{ fontSize: "14px", color: "#303030" }}>
                        {" "}
                        &nbsp; Speakers: {simpleSpeaker.length}
                      </p>
                      <AvatarGroup max={10} style={{ marginLeft: "10px" }}>
                        {latestSpeakers &&
                          latestSpeakers.length &&
                          latestSpeakers.map((speaker, index) => {
                            return (
                              <Avatar
                                key={index}
                                className="pop-avatar persons"
                                alt="Remy Sharp"
                                src={speaker.avatar}
                              />
                            );
                          })}
                      </AvatarGroup>
                      <ExpandMoreIcon
                        aria-describedby={id}
                        onClick={handleSpeakersClick}
                        style={{ cursor: "pointer" }}
                      />
                      <Popover
                        id={speakerId}
                        open={openSpeakers}
                        anchorEl={anchorEl}
                        onClose={handleSpeakersClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Typography sx={{ p: 2 }}>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                              multiple
                              name="speaker"
                              value={simpleSpeaker}
                              onChange={handleSpeakersChange}
                              input={<Input />}
                              renderValue={(selected) => selected.join(", ")}
                              MenuProps={MenuProps}
                            >
                              {speakersList &&
                                speakersList.map((speaker) => {
                                  return (
                                    <MenuItem
                                      key={speaker.name}
                                      value={speaker.name}
                                    >
                                      <CustomCheckbox
                                        checked={
                                          simpleSpeaker.indexOf(speaker.name) >
                                          -1
                                        }
                                      />
                                      <Avatar
                                        alt="DP"
                                        src={speaker.avatar}
                                        sx={{ width: 24, height: 24 }}
                                      />
                                      <ListItemText
                                        primary={speaker.name}
                                        style={{ marginLeft: "10px" }}
                                      />
                                    </MenuItem>
                                  );
                                })}
                              {/* {meetingData.participants.map((participant) => (
                            <MenuItem key={participant.name} value={participant.name}>
                              <Checkbox checked={meetingData.participants.indexOf(participant.name) > -1} />
                              <ListItemText primary={participant.name} />
                            </MenuItem>
                          ))} */}
                            </Select>
                          </FormControl>
                        </Typography>
                      </Popover>
                    </>
                  )}
                  {/* <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClickOpen}>
                    <SettingsIcon style={{ fontSize: '16px', marginLeft: '10px', color: '#787878' }} />
                    <p style={{ fontSize: '14px', color: '#787878' }}> &nbsp; Manage</p>
                  </span>
                  <SimpleDialog
                    open={open}
                    onClose={handleClose}
                  /> */}
                </Box>

                <Box
                  bgcolor="#fff"
                  borderRadius="6px"
                  marginTop="10px"
                  p={{ xs: 1, sm: 1, md: 1 }}
                  style={{ boxShadow: "0px 0px 10px #E5E6FF", height: "625px" }}
                >
                  {transcriptionData && transcriptionData.length > 0 && (
                    <Transcription
                      transcriptionData={transcriptionData}
                      meetingId={id}
                      transcriptRead={transcriptRead}
                      markTranscriptAsRead={markTranscriptAsRead}
                      meetingData={meetingData}
                      latestSpeakers={latestSpeakers}
                      isValue={isValue}
                      meetingType={meetingType}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                {isPaidUser && (
                  <>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      className="past-meeting-section-title"
                    >
                      <p>AI Summary</p>

                      <Box
                        display="flex"
                        width={200}
                        justifyContent="space-between"
                      >
                        {summaryData && summaryData.length && (
                          <>
                            {!summaryRead && (
                              <Box
                                title="Mark as reviewed"
                                display="flex"
                                justifyContent="center"
                                style={{ cursor: "pointer" }}
                              >
                                <CheckCircleOutlineIcon
                                  color="disabled"
                                  onClick={() => markSummaryAsRead()}
                                />
                              </Box>
                            )}

                            {summaryRead && (
                              <Box
                                display="flex"
                                justifyContent="center"
                                title="Marked as reviewed"
                              >
                                <CheckCircleOutlineIcon color="primary" />
                              </Box>
                            )}
                          </>
                        )}

                        <Box
                          onClick={() => setSummaryEditMode(!summaryEditMode)}
                          style={{ cursor: "pointer" }}
                          display="flex"
                          alignItems="center"
                          title="Edit"
                        >
                          <EditIcon color="disabled" />
                        </Box>

                        {/* </span> */}
                        {summaryData && summaryData.length && (
                          <Box
                            display="flex"
                            alignItems="center"
                            title="History"
                            // className="history-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setHistoryNumber(false);
                              setShowHistoryPopup(!showHistoryPopup);
                            }}
                          >
                            <HistoryIcon color="disabled" />
                          </Box>
                        )}
                        <Box>
                          <Rating
                            className={classes.thumbs}
                            name="highlight-selected-only"
                            max={2}
                            onChangeActive={(event, newHover) => {
                              setHoverSummaryAction(newHover);
                            }}
                            title={hover}
                            IconContainerComponent={IconContainerSummary}
                            highlightSelectedOnly
                            onChange={(event, newValue) => {
                              getRatingSummary(newValue);
                            }}
                            value={summaryRatings}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      bgcolor="#fff"
                      borderRadius="6px"
                      p={{ xs: 1, sm: 1, md: 1 }}
                      className={classes.summaryBox}
                      onScroll={(e) => handleSummaryScrollEvent(e)}
                    >
                      {summaryData && summaryData.length && (
                        <EdiText
                          type="textarea"
                          inputProps={{ rows: "16" }}
                          editing={summaryEditMode}
                          value={summaryData}
                          onSave={handleSave}
                          showButtonsOnHover={true}
                        />
                      )}

                      {!summaryData && (
                        <EdiText
                          type="textarea"
                          inputProps={{ rows: "16" }}
                          editing={summaryEditMode}
                          value="No Data Found"
                          onSave={handleSave}
                          showButtonsOnHover={true}
                        />
                      )}
                    </Box>
                  </>
                )}

                <TabPanel
                  tabData={notesData}
                  meetingId={id}
                  notesRead={notesRead}
                  markNotesAsRead={markNotesAsRead}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {isPaidUser && (
                  <>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      className="past-meeting-section-title"
                    >
                      Key Takeaways
                      <Box
                        display="flex"
                        width={200}
                        justifyContent="space-between"
                      >
                        {actionPlans && actionPlans.length > 0 && (
                          <>
                            {!actionRead && (
                              <Box
                                title="Mark as reviewed"
                                display="flex"
                                justifyContent="center"
                                style={{ cursor: "pointer" }}
                              >
                                <CheckCircleOutlineIcon
                                  color="disabled"
                                  onClick={() => markActionAsRead()}
                                />
                              </Box>
                            )}

                            {actionRead && (
                              <Box
                                display="flex"
                                justifyContent="center"
                                title="Marked as reviewed"
                              >
                                <CheckCircleOutlineIcon color="primary" />
                              </Box>
                            )}
                          </>
                        )}
                        {/* <span className="edit-icon" onClick={handleActionEdit}> */}
                        <Box
                          onClick={handleActionEdit}
                          style={{ cursor: "pointer" }}
                          display="flex"
                          alignItems="center"
                          title="Edit"
                        >
                          <EditIcon color="disabled" />
                        </Box>
                        {/* </span> */}
                        {actionPlans && actionPlans.length > 0 && (
                          <Box
                            alignItems="center"
                            display="flex"
                            title="History"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setActionHistoryNumber(false);
                              setShowActionHistoryPopup(
                                !showActionHistoryPopup
                              );
                            }}
                          >
                            <HistoryIcon color="disabled" />
                          </Box>
                        )}
                        <Box>
                          <Rating
                            className={classes.thumbs}
                            name="highlight-selected-only"
                            // defaultValue={2}
                            max={2}
                            IconContainerComponent={IconContainerAction}
                            highlightSelectedOnly
                            onChange={(event, newValue) => {
                              getRatingAction(newValue);
                            }}
                            value={actionRatings}
                            onChangeActive={(event, newHover) => {
                              setHoverSummaryAction(newHover);
                            }}
                            title={hover}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      marginBottom="35px"
                      bgcolor="#fff"
                      borderRadius="6px"
                      p={{ xs: 1, sm: 1, md: 1 }}
                      className={classes.actionBox}
                      onScroll={(e) => handleActionScrollEvent(e)}
                    >
                      {actionPlans &&
                        actionPlans.length > 0 &&
                        !actionEditMode &&
                        actionPlans.map((meeting, index) => {
                          if (meeting.length > 0) {
                            // return (
                            //   <Grid container spacing={3} key={index}>
                            //     <Grid item xs={9} sm={9}>
                            //       <p className="action-txt">{meeting}</p>
                            //     </Grid>
                            //     <Grid item xs={3} sm={3}>
                            //       <div className="action-button">
                            //         <span
                            //           onClick={() => deleteAction(meeting)}
                            //           title="Remove"

                            //         >
                            //           <HighlightOffIcon
                            //             style={{ color: '#2C73FF', cursor: 'pointer' }}

                            //           />
                            //         </span>
                            //         <Button
                            //           variant="outlined"
                            //           color="primary"
                            //           href="#outlined-buttons"
                            //           style={{ marginLeft: '15px' }}
                            //         >
                            //           Link
                            //         </Button>
                            //       </div>
                            //     </Grid>
                            //   </Grid>
                            // );

                            return (
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                key={index}
                              >
                                <Box>
                                  {" "}
                                  <p className="action-txt">{meeting}</p>{" "}
                                </Box>
                                <Box>
                                  <div className="action-button">
                                    <span
                                      onClick={() => deleteAction(meeting)}
                                      style={{ cursor: "pointer" }}
                                      title="Remove"
                                    >
                                      <HighlightOffIcon
                                        style={{ color: "#2C73FF" }}
                                      />
                                    </span>
                                  </div>
                                </Box>
                              </Box>
                            );
                          }
                        })}
                      {actionEditMode && actionPlans.length && (
                        <EdiText
                          type="textarea"
                          editing={true}
                          inputProps={{ rows: "17" }}
                          value={actionPlans}
                          onSave={handleSaveActions}
                          onCancel={handleCancleActions}
                          showButtonsOnHover={true}
                        />
                      )}
                    </Box>
                  </>
                )}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  className="past-meeting-section-title"
                >
                  Attachments
                  <Box display="flex" width={60} justifyContent="space-between">
                    <EditIcon color="disabled" />
                    <ShareIcon color="disabled" />
                  </Box>
                </Box>{" "}
                {/* Edit{" "} */}
                {/* Share */}
                <Box
                  className={classes.attachmentBox}
                  bgcolor="#fff"
                  borderRadius="6px"
                  p={{ xs: 1, sm: 1, md: 1 }}
                >
                  <ChipsArray attachments={attachments} />
                </Box>
              </Grid>
            </Grid>

            <span className="agenda mt-20">Analytics</span>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Sentiment sentiments={meetingData} isPaidUser={isPaidUser} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Participation
                  participation={participation}
                  isPaidUser={isPaidUser}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Attendance meetingId={id} />
              </Grid>
            </Grid>

            {/* <span className="agenda mt-20">Analytics</span> */}
            <Box style={{ marginTop: "50px" }}>
              <Grid item xs={12} sm={4}>
                <Video meetingId={id} />
              </Grid>
            </Box>
          </div>
        </div>
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CenteredGrid);
