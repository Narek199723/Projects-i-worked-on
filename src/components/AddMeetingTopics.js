import React, { useEffect, useState } from "react";
import { Grid, TextField, Box, AppBar, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { makeStyles, withStyles } from "@material-ui/styles";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import { blue } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormLabel from "@material-ui/core/FormLabel";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

const CustomCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

function AddMeetingTopics({ ...props }) {
  const { meetingId, meetingDetails } = props;

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [topicName, setTopicName] = useState("");

  let meetingTopics = (meetingDetails && meetingDetails.topics) || [];
  let userTopics = props.topics || [];

  let meetingTopicsToDisplay = [];

  useEffect(async () => {
    await props.fetchTopicsRequest();
    await props.fetchMeetingRequest({
      meetingId: props.meetingId,
    });
  }, []);

  const classes = useStyles();

  const onToggleTopic = (e) => {
    let optedVal = e.target.value;

    if (meetingTopics.indexOf(optedVal) === -1) {
      props.addMeetingTopicRequest({
        meetingId: meetingId,
        topic: optedVal,
      });
    } else {
      props.deleteMeetingTopicRequest({
        meetingId: meetingId,
        topic: optedVal,
      });
    }
  };

  let topicLabelsCheck = 0;

  if (userTopics.length > 0 && meetingTopics.length > 0) {
    meetingTopics.forEach((t) => {
      let mf = userTopics.find((e) => e.topicName === t);

      if (mf) {
        meetingTopicsToDisplay.push({
          topicName: t,
          color: mf.color,
        });
      }
    });
  }

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, width: 150, marginLeft: 0 }}>
        <InputLabel
          style={{ marginTop: -25, paddingLeft: 5 }}
          id="demo-multiple-name-label"
        >
          Add Topics
        </InputLabel>
        <Select
          style={{ marginTop: -10, border: "1px solid gray" }}
          labelId="demo-multiple-name-label"
          value={selectedTopics}
          onChange={onToggleTopic}
        >
          {props.topics.map((topic, key) => {
            let bgcolor = topic.color || "none";
            return (
              <MenuItem
                key={key}
                value={topic.topicName}
                style={{ background: `${bgcolor}` }}
              >
                <CustomCheckbox
                  checked={meetingTopics.indexOf(topic.topicName) > -1}
                />
                <ListItemText primary={topic.topicName} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <span style={{ marginTop: 20 }}>
        {meetingTopicsToDisplay.map((p, index) => {
          if (topicLabelsCheck === 5) {
            topicLabelsCheck = 1;
          }
          topicLabelsCheck++;
          return (
            <span
              key={index}
              style={{
                background: p.color || "",
                fontSize: 12,
                padding: 2,
                fontWeight: "bold",
                marginRight: 2,
              }}
            >
              {p.topicName}
            </span>
          );
        })}
      </span>
    </div>
  );
}

AddMeetingTopics.propTypes = {
  meetingId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  topics: (state.settings.topics && state.settings.topics.data) || [],
  meetingDetails:
    (state.meetings &&
      state.meetings.meetingDetails &&
      state.meetings.meetingDetails.data) ||
    {},
});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
  fetchTopicsRequest: (data) => dispatch(actions.fetchTopicsRequest(data)),
  fetchMeetingRequest: (data) => dispatch(actions.fetchMeetingRequest(data)),
  addMeetingTopicRequest: (data) =>
    dispatch(actions.addMeetingTopicRequest(data)),
  deleteMeetingTopicRequest: (data) =>
    dispatch(actions.deleteMeetingTopicRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMeetingTopics);
