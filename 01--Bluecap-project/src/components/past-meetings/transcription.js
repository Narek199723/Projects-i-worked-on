import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import EdiText from "react-editext";
import { changeTranscript } from "../../firebase/firestore";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

import { UpdateTranscriptByMeetingId } from "../../firebase/firestore";
import { unset } from "lodash";

function Transcript(transcriptionData, { ...props }) {
  const [speaker, setSpeaker] = React.useState("");
  const [activeTranscript, setActiveTranscript] = React.useState(false);
  const [transcriptUid, setTranscriptUid] = React.useState("");

  let latestSpeakers = transcriptionData.latestSpeakers;
  let transcriptionList = transcriptionData.transcriptionData;
  let meetingId = transcriptionData.meetingId;
  let isValue = transcriptionData.isValue;
  let meetingType = transcriptionData.meetingType;
  console.log("meetingType", meetingType);

  const handleSave = async (id, val) => {
    let res = await changeTranscript(
      { transcriptId: id, text: val },
      transcriptionData.meetingId
    );

    if (res && !transcriptionData.transcriptRead) {
      transcriptionData.markTranscriptAsRead();
    }
  };

  const handleScrollEvent = async (e) => {
    const bottom =
      e.target.scrollHeight.toFixed(0) - e.target.scrollTop.toFixed(0) ===
      e.target.clientHeight;

    if (bottom) {
      transcriptionData.markTranscriptAsRead();
    }
  };

  const getSpeaker = async (e) => {
    console.log("llllll", activeTranscript, e.target.value, transcriptUid);
    let updatedTranscript =
      transcriptionList &&
      transcriptionList.map(async (uTranscript) => {
        // console.log('uTranscript', uTranscript)
        if (uTranscript.name !== null || uTranscript.name) {
          if (uTranscript.uid == transcriptUid) {
            // console.log('1')
            uTranscript.name = e.target.value;
            uTranscript.isAssigned = true;
            let updateTranscript = await UpdateTranscriptByMeetingId(
              meetingId,
              uTranscript.uid,
              e.target.value
            );
          }
        } else {
          // console.log('3')
          if (uTranscript.speaker == activeTranscript) {
            // console.log(uTranscript)
            uTranscript.name = e.target.value;
            uTranscript.isAssigned = true;
            let updateTranscript = await UpdateTranscriptByMeetingId(
              meetingId,
              uTranscript.uid,
              e.target.value
            );
          }
        }
        return uTranscript;
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, uid, speaker) => {
    // console.log('handleclick=',event, uid, speaker)
    if (isValue == false) {
      setAnchorEl(false);
      // props.showSnackbar({
      //     show: true,
      //     severity: "error",
      //     message: "Please select atleast one speaker before assignment.",
      // });
    } else {
      setAnchorEl(event.currentTarget);
    }

    setActiveTranscript(speaker);
    setTranscriptUid(uid);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;
  // console.log('id',id);

  let meetingData = transcriptionData.meetingData;
  let trueParticepants = [];

  let newParticipants =
    meetingData &&
    meetingData.map((participant) => {
      if (participant.isAssigned == true) {
        trueParticepants.push(participant);
      }
      return participant;
    });
  // console.log('new', newParticipants);

  return (
    <div className="transcript-box" onScroll={(e) => handleScrollEvent(e)}>
      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography style={{ padding: "50px", width: "300px" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Speaker</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={speaker}
              // onChange={(val,uid) => console.log('ggg',val.target.value,uid)}
              label="Speaker"
              // data-uid={id}
              onChange={(e) => getSpeaker(e)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {latestSpeakers &&
                latestSpeakers.length &&
                latestSpeakers.map((speaker, index) => {
                  return (
                    // <Avatar
                    //     alt="DP"
                    //     src={speaker.avatar}
                    //     sx={{ width: 24, height: 24 }}
                    // />
                    <MenuItem value={speaker.name} key={index}>
                      {speaker.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Typography>
      </Popover>
      {transcriptionList.length > 0 &&
        transcriptionList.map((participants, index) => {
          let uid = participants.uid;
          let speakers = participants.speaker;
          // console.log('participants',participants);
          var date = new Date(null);
          date.setSeconds(participants.duration); // specify value for SECONDS here
          var result = date.toISOString().substr(11, 8);
          return (
            <Grid container spacing={4} key={index}>
              <Grid item xs={12} sm={2}>
                <p className="transcript-time">{result}</p>
              </Grid>
              <Grid item xs={12} sm={10} py={3}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {meetingType && meetingType == "ZOOM" ? (
                    <>
                      <p className="transcript-speakr">
                        {participants.name && participants.isAssigned == true
                          ? participants.name
                          : "Speaker: " + participants.speaker}
                      </p>
                      <ExpandMoreIcon
                        aria-describedby={uid}
                        onClick={(e) => handleClick(e, uid, speakers)}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      />
                    </>
                  ) : (
                    <p className="transcript-speakr">
                      {participants.name
                        ? participants.name
                        : participants.speaker}
                    </p>
                  )}
                </div>

                {/* <p className="transcript-text">{participants.text}</p> */}
                <EdiText
                  showButtonsOnHover={true}
                  type="textarea"
                  inputProps={{ rows: "5" }}
                  value={participants.text}
                  onSave={(val) => handleSave(participants.uid, val)}
                />
              </Grid>
            </Grid>
          );
        })}
    </div>
  );
}

// export default Transcript;
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transcript);
