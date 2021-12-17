import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, withStyles } from "@material-ui/styles";
import { styled } from "@material-ui/core/styles";
import GoogleMapLocation from "./GoogleMapLocation";
import Button from "@material-ui/core/Button";
import { getData, postData } from "./../../utils";
import firebase from "../../firebase/firebase";
import * as actions from "../../redux/actions";
import { connect } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Typography, InputBase, TextField, Grid } from "@material-ui/core";
import { width } from "@material-ui/system";
import { split } from "lodash";
import DesktopDatePicker from "@material-ui/lab/DesktopDatePicker";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import { blue } from "@material-ui/core/colors";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";

const CustomCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const StyledInputCreateEvent = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "25ch",
    },
    "&::placeholder": {
      color: "#7DA8FB",
    },
  },
  boxShadow: "0px 0px 10px #e5e6ff",
  borderRadius: 6,
  padding: "3px 15px",
}));

const useStyles = makeStyles((theme) => ({
  textField: {
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    boxShadow: "0px 0px 10px #e5e6ff",
  },
  agendaBox: {
    boxShadow: "0px 0px 10px #E5E6FF",
    borderRadius: "6px",
    height: "200px",
  },
  title: {
    color: "#000000",
    marginTop: "30px",
    marginBottom: "20px",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "16px",
    letterSpacing: "0em",
    textAlign: "left",
  },
}));

function CreateEvent({ open, onClose, ...props }) {
  const classes = useStyles();

  const [meetingTitle, setMeetingTitle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [participants, setParticipants] = useState([]);
  const [tempParticipant, setTempParticipant] = useState("");
  const [location, setLocation] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedCalendars, setSelectedCalendars] = useState([]);
  const [totalCalendars, setTotalCalendars] = useState([]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  useEffect(() => {
    let Ttoday = new Date();
    // let tdd = String(Ttoday.getDate()).padStart(2, '0');
    // let tmm = String(Ttoday.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let tyyyy = Ttoday.getFullYear();

    // Ttoday = tdd + '/' + tmm + '/' + tyyyy;
    // let convertedT = msToTime(Ttoday.getTime());
    // console.log('convertedT', convertedT);
    setFromTime(msToTime(Ttoday.getTime() + 10 * 60000));
    setToTime(msToTime(Ttoday.getTime() + 40 * 60000));
    setFromDate(Ttoday);
    setToDate(Ttoday);
  }, []);

  function msToTime(milliseconds) {
    const hours = `0${new Date(milliseconds).getHours()}`.slice(-2);
    const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);
    const time = `${hours}:${minutes}`;
    return time;
  }

  const handleAllDay = (e) => {
    setAllDay(e.target.checked);
    if (e.target.checked) {
      let cTime = new Date().getTime();
      let timeInFor = msToTime(cTime);
      // console.log('timeInFor', timeInFor);
      setFromTime(timeInFor);
      setToTime(timeInFor);
    } else {
      setFromTime("");
      setToTime("");
    }
  };

  const handleFromDate = (val) => {
    // console.log('val val-', val)

    // const d = new Date(e.target.value);
    // let dated = d.toDateString();
    // console.log('fromDate= ',dated);
    // const rawDate = e.target.value.split('-');

    // let rawY = rawDate[0];
    // let rawM = rawDate[1];
    // let rawD = rawDate[2];
    // console.log('rawD..',rawY,rawM,rawD)

    // let d = new Date(rawY, rawM, rawD);
    // let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    // let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    // let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    // let finalDate = `${mo} ${da},${ye}`;
    // console.log('finalDate',finalDate);

    setFromDate(val);
    setToDate(val);
  };

  const addParticipants = () => {
    let newArr = participants;

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      re.test(String(tempParticipant).toLowerCase()) &&
      !participants.includes(String(tempParticipant).toLowerCase())
    ) {
      newArr.push(tempParticipant);
      setParticipants(newArr);
      setTempParticipant("");
    }
  };

  const setLocationTemp = (v) => {
    if (v) setLocation(v.description);
  };

  function dConvert(tdt) {
    var d = new Date(tdt),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const submitForm = () => {
    let fd = dConvert(fromDate);
    let td = dConvert(toDate);

    // console.log('fdtd, ', fd, td)

    if (!fromDate || !toDate) {
      console.log("invalid date");
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Please set proper from and to date time.",
      });
      return;
    }

    let payload = { start: {}, end: {} };
    let splitFromTime = fromTime.split(":");
    let splitToTime = toTime.split(":");

    let yyyymmddFrom = fd.split("-");
    let yyyymmddTo = td.split("-");

    const startDateObj = new Date(
      yyyymmddFrom[0],
      yyyymmddFrom[1] - 1,
      yyyymmddFrom[2],
      splitFromTime[0],
      splitFromTime[1],
      0,
      0
    );

    const endDateObj = new Date(
      yyyymmddTo[0],
      yyyymmddTo[1] - 1,
      yyyymmddTo[2],
      splitToTime[0],
      splitToTime[1],
      0,
      0
    );

    // console.log('yyyymmddFrom',fromDate)

    // let startDateObj = new Date(fromDate)

    // startDateObj.setHours(splitFromTime[0])
    // startDateObj.setMinutes(splitFromTime[1])

    // let endDateObj = new Date(toDate)
    // endDateObj.setHours(splitToTime[0])
    // endDateObj.setMinutes(splitToTime[1])

    // console.log('startDateObj----->', startDateObj)
    // console.log('endDateObj----->', endDateObj)

    if (allDay) {
      payload.start.date =
        startDateObj.getFullYear() +
        "-" +
        ("0" + (startDateObj.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + startDateObj.getDate()).slice(-2);
      payload.end.date =
        endDateObj.getFullYear() +
        "-" +
        ("0" + (endDateObj.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + endDateObj.getDate()).slice(-2);
    } else {
      payload.start.dateTime = startDateObj;
      payload.end.dateTime = endDateObj;
    }
    // console.log('payload',payload);

    if (meetingTitle.length) {
      payload.summary = meetingTitle;
    }

    if (location.length) {
      payload.location = location;
    }

    if (participants.length) {
      let attendees = participants.map((p) => {
        return { email: p };
      });
      payload.attendees = attendees;
    }

    //add description

    let agenda = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (agenda.length) {
      payload.description = agenda;
    }

    if (selectedCalendars) {
      payload.calendars = selectedCalendars;
    }

    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let res = await postData(
          `${process.env.REACT_APP_BASE_API_URL}/calendar/createEvent`,
          jwtToken,
          payload
        );

        if (res.status == "success") {
          props.showSnackbar({
            show: true,
            severity: "success",
            message: "Event created successfully.",
          });
          onClose();
        } else {
          props.showSnackbar({
            show: true,
            severity: "error",
            message: "Something went wrong.",
          });
        }
      });
    console.log("payload", payload);
  };

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

  const handleChangeCalendar = async (e) => {
    setSelectedCalendars(e.target.value);
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

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div style={{ padding: "30px 30px 15px 30px", maxWidth: "570px" }}>
        <TextField
          style={{
            width: "100%",
            boxShadow: "0px 0px 10px #e5e6ff",
          }}
          size="small"
          placeholder="Add title"
          inputProps={{ "aria-label": "Meeting title" }}
          value={meetingTitle}
          onChange={(event) => setMeetingTitle(event.target.value)}
        />

        <Box
          display={{ md: "flex", xs: "block" }}
          alignItems="center"
          justifyContent="flex-around"
          style={{
            marginTop: "30px",
          }}
        >
          <Box
            paddingBottom={{ xs: 3, md: 0 }}
            display="flex"
            width="200px"
            marginRight="10px"
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="From Date"
                value={fromDate}
                inputFormat="MMM d, yyyy"
                onChange={(val) => handleFromDate(val)}
                className={classes.textField}
                renderInput={(params) => <TextField {...params} />}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    color: "#7DA8FB",
                    cursor: "pointer",
                    width: "100%",
                    padding: "10px",
                    fontSize: "14px",
                  },
                }}
              />
            </LocalizationProvider>

            {/* <TextField
              onChange={(event) => handleFromDate(event)}
              style={{ cursor: "pointer", width: '100%' }}
              label="From Date"
              type="date"
              value={fromDate}
              inputFormat="MMM d, yyyy"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                style: {
                  color: "#7DA8FB",
                }
              }}
            /> */}
          </Box>

          {!allDay && (
            <Box paddingBottom={{ xs: 3, md: 0 }} display="flex" width="250px">
              <TextField
                onChange={(event) => setFromTime(event.target.value)}
                style={{ cursor: "pointer", width: "100%" }}
                id="time"
                label="From Time"
                type="time"
                defaultValue="00:00"
                value={fromTime}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    color: "#7DA8FB",
                    step: 300,
                    cursor: "pointer",
                    padding: "10px",
                    fontSize: "14px",
                  },
                }}
              />

              <TextField
                onChange={(event) => setToTime(event.target.value)}
                style={{ cursor: "pointer", width: "100%" }}
                id="time"
                label="To Time"
                type="time"
                defaultValue="00:00"
                value={toTime}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    color: "#7DA8FB",
                    step: 300,
                    padding: "10px",
                    cursor: "pointer",
                    fontSize: "14px",
                  },
                }}
              />
            </Box>
          )}

          <Box paddingBottom={{ xs: 3, md: 0 }} display="flex" width="200px">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="To Date"
                value={toDate}
                inputFormat="MMM d, yyyy"
                onChange={(val) => setToDate(val)}
                className={classes.textField}
                renderInput={(params) => <TextField {...params} />}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: {
                    color: "#7DA8FB",
                    padding: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "14px",
                  },
                }}
              />
            </LocalizationProvider>

            {/* <TextField
              onChange={(event) => setToDate(event.target.value)}
              style={{ cursor: "pointer", width: '100%' }}
              id="datetime-local"
              label="To Date"
              type="date"
              value={toDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {
                  color: "#7DA8FB",
                }
              }}
            /> */}
          </Box>
        </Box>

        {/* </div> */}
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={allDay}
            // onChange={(e) => setAllDay(e.target.checked)}
            onChange={(e) => handleAllDay(e)}
            color="primary"
          />
          <Typography>all day</Typography>
        </Box>

        <Typography className={classes.title}>Participants</Typography>

        <Box marginTop="10px">
          <Box>
            <Box>
              <TextField
                style={{ boxShadow: "0px 0px 10px #e5e6ff", width: "100%" }}
                size="small"
                placeholder="Add participants"
                inputProps={{ "aria-label": "Add participants" }}
                value={tempParticipant}
                onChange={(e) => setTempParticipant(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addParticipants();
                  }
                }}
                onBlur={addParticipants}
              />

              <Box display={{ xs: "block", md: "none" }}>
                <AddCircleOutlinedIcon
                  color="primary"
                  onClick={addParticipants}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
            <div style={{ paddingTop: "10px" }}>
              {participants.map((p, index) => {
                return (
                  <Chip
                    key={index}
                    avatar={<Avatar alt="Natacha">{p[0].toUpperCase()}</Avatar>}
                    label={p}
                    onDelete={() => {
                      let newArr = participants.filter(
                        (participant) => participant != p
                      );
                      setParticipants(newArr);
                    }}
                  />
                );
              })}
            </div>
          </Box>

          <Box paddingTop={{ xs: 5, md: 0 }} display="none">
            <FormControl style={{ minWidth: 150 }} variant="outlined">
              <InputLabel>Permissions</InputLabel>
              <Select
                value={20}
                onChange={() => console.log("handlechange")}
                label="Permissions"
              >
                <MenuItem value={10}>Read</MenuItem>
                <MenuItem value={20}>Write</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box>
          {/* <div style={{ boxShadow: "0px 0px 10px #e5e6ff", marginTop: "20px" }}>
            <GoogleMapLocation value={location} setValue={setLocationTemp} />
          </div> */}
          <Box
            display="none"
            width={{ xs: "100%", md: "50%" }}
            style={{ marginTop: "20px" }}
            flexDirection="column"
          >
            {/* <Typography style={{ color:"#000000", marginTop:"20px" , fontFamily: "Poppins", fontSize: "16px", fontStyle: "normal", fontWeight: "500", lineHeight: "16px", letterSpacing: "0em", textAlign: "left"}}>
                        Service
                      </Typography> */}
            <FormControl style={{ minWidth: 150 }} variant="outlined">
              <InputLabel>Service</InputLabel>
              <Select
                value={20}
                onChange={() => console.log("handlechange")}
                label="Service"
              >
                <MenuItem value={10}>Google</MenuItem>
                <MenuItem value={20}>Microsoft</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid container spacing={1} style={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" title="Select calendar">
              <InsertInvitationIcon color="blue" />
              <FormControl
                component="fieldset"
                style={{ width: "80%", marginLeft: "10px" }}
                size="small"
                variant="outlined"
              >
                <Select
                  multiple
                  variant="outlined"
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
                            selectedCalendars.indexOf(calendar.calendarId) > -1
                          }
                        />
                        <ListItemText primary={calendar.summary} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box style={{ boxShadow: "0px 0px 10px #e5e6ff" }}>
              <GoogleMapLocation value={location} setValue={setLocationTemp} />
            </Box>
          </Grid>
        </Grid>

        <Typography className={classes.title}>Agenda</Typography>

        <Box className={classes.agendaBox}>
          <Editor
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "list",
                "textAlign",
                "history",
              ],
              // inline: { inDropdown: true },
              // list: { inDropdown: true },
              // textAlign: { inDropdown: true },
              // link: { inDropdown: true },
              // history: { inDropdown: true },
            }}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={(editorState) => setEditorState(editorState)}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" marginTop="10px">
          <Button
            onClick={() => onClose()}
            style={{ margin: "10px", color: "grey" }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={submitForm}
            style={{ margin: "10px" }}
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
        </Box>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
