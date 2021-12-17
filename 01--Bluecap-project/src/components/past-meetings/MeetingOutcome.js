import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { getMeetingByMeetingId } from "../../firebase/firestore";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentVeryDissatisfiedOutlined";
import SentimentNeutralOutlinedIcon from "@material-ui/icons/SentimentNeutral";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { Box, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ml10: {
    marginLeft: "10px",
  },
  ml20: {
    marginLeft: "20px",
  },
  mb10: {
    marginBottom: "10px",
  },
}));

function MeetingOutcome({ ...props }) {
  const classes = useStyles();

  const [outcome, setOutcome] = useState("");

  const { meetingId, meetingDetails } = props;

  let existingMeetingOutcome =
    (meetingDetails && meetingDetails.meetingOutcome) || null;

  // console.log("existingMeetingOutcome", existingMeetingOutcome);

  // let defaultIcon = <SentimentSatisfiedIcon />;
  // if (existingMeetingOutcome === "POSITIVE") {
  //   defaultIcon = (
  //     <SentimentSatisfiedOutlinedIcon className={classes.emoNotSelected} />
  //   );
  // } else if (existingMeetingOutcome === "NEGATIVE") {
  //   defaultIcon = (
  //     <SentimentDissatisfiedOutlinedIcon className={classes.emoNotSelected} />
  //   );
  // } else if (existingMeetingOutcome === "UNCERTAIN") {
  //   defaultIcon = (
  //     <SentimentVeryDissatisfiedOutlinedIcon
  //       className={classes.emoNotSelected}
  //     />
  //   );
  // }

  useEffect(async () => {
    await props.fetchMeetingRequest({
      meetingId: props.meetingId,
    });

    let meetingData = await getMeetingByMeetingId(meetingId);
    setOutcome(meetingData.meetingOutcome);
  }, []);

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const onMeetingOutcome = (opt) => {
    // console.log("MeetingOutcome", opt);
    // handleClose();
    props.updateMeetingOutcomeRequest({
      meetingId: meetingId,
      meetingOutcome: opt,
    });
    setOutcome(opt);
    if (opt) {
      props.showSnackbar({
        show: true,
        severity: "success",
        message: "Meeting outcome saved successfully.",
      });
    } else {
      props.showSnackbar({
        show: true,
        severity: "error",
        message: "Something went wrong!",
      });
    }
  };

  return (
    <>
      <Typography
        className={classes.mb10}
        style={{ fontSize: "14px", fontWeight: "600" }}
      >
        Meeting outcomes
      </Typography>
      <Box display="flex">
        <Box
          display="flex"
          title="Positive"
          style={{ cursor: "pointer" }}
          onClick={() => onMeetingOutcome("POSITIVE")}
        >
          {outcome == "POSITIVE" ? (
            <SentimentSatisfiedOutlinedIcon color="primary" />
          ) : (
            <SentimentSatisfiedOutlinedIcon color="default" />
          )}
        </Box>
        <Box
          display="flex"
          className={classes.ml20}
          title="Negative"
          style={{ cursor: "pointer" }}
          onClick={() => onMeetingOutcome("NEGATIVE")}
        >
          {outcome == "NEGATIVE" ? (
            <SentimentDissatisfiedOutlinedIcon color="primary" />
          ) : (
            <SentimentDissatisfiedOutlinedIcon color="default" />
          )}
        </Box>
        <Box
          display="flex"
          className={classes.ml20}
          title="Uncertain"
          style={{ cursor: "pointer" }}
          onClick={() => onMeetingOutcome("UNCERTAIN")}
        >
          {outcome == "UNCERTAIN" ? (
            <SentimentNeutralOutlinedIcon color="primary" />
          ) : (
            <SentimentNeutralOutlinedIcon color="default" />
          )}
        </Box>
      </Box>

      {/* <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {defaultIcon}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => onMeetingOutcome("POSITIVE")}>
          <SentimentSatisfiedOutlinedIcon className={classes.emoStyle} />{" "}
          <span className={classes.ml10}>Positive</span>
        </MenuItem>
        <MenuItem onClick={() => onMeetingOutcome("NEGATIVE")}>
          <SentimentDissatisfiedOutlinedIcon className={classes.emoStyle} />{" "}
          <span className={classes.ml10}>Negative</span>
        </MenuItem>
        <MenuItem onClick={() => onMeetingOutcome("UNCERTAIN")}>
          <SentimentNeutralOutlinedIcon className={classes.emoStyle} />{" "}
          <span className={classes.ml10}>Uncertain</span>
        </MenuItem>
      </Menu> */}
    </>
  );
}

MeetingOutcome.propTypes = {
  meetingId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  meetingDetails:
    (state.meetings &&
      state.meetings.meetingDetails &&
      state.meetings.meetingDetails.data) ||
    {},
});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
  fetchMeetingRequest: (data) => dispatch(actions.fetchMeetingRequest(data)),
  updateMeetingOutcomeRequest: (data) =>
    dispatch(actions.updateMeetingOutcomeRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetingOutcome);
