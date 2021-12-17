import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import firebase from "../../firebase/firebase";
import { getData, postData } from "../../utils";

const UseStyles = makeStyles((theme) => ({
  mt30: {
    marginTop: "30px",
  },
  percent: {
    background: "#EDF3FF",
    borderRadius: "6px",
    width: "100px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Participation(props) {
  const classes = UseStyles();
  const [attendance, setAttendance] = useState("");
  const [late, setLate] = useState("");
  const [leftEarly, setLeftEarly] = useState("");

  let id = props.meetingId;

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let attendanceData = await getData(
          `${process.env.REACT_APP_BASE_API_URL}/analytics/attendance?meetingId=` +
            id,
          jwtToken
        );
        if (attendanceData.status == "success") {
          // console.log('attendanceData',attendanceData);
          attendanceData.data.attendance
            ? setAttendance(attendanceData.data.attendance)
            : setAttendance("0");
          attendanceData.data.late
            ? setLate(attendanceData.data.late)
            : setLate("0");
          attendanceData.data.leftEarly
            ? setLeftEarly(attendanceData.data.leftEarly)
            : setLeftEarly("0");
        }
      });
  }, []);

  return (
    <>
      <Box
        bgcolor="#fff"
        borderRadius="6px"
        marginTop="10px"
        width="100%"
        height="300px"
        p={{ xs: 1, sm: 1, md: 1 }}
        style={{ boxShadow: "0px 0px 10px #E5E6FF", padding: "20px" }}
      >
        <p style={{ fontSize: "18px" }}>Attendance</p>
        <div
          className={classes.mt30}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <span className={classes.percent}>{attendance} %</span>
        </div>

        <Grid container spacing={1} style={{ marginTop: "20px" }}>
          <Box
            display="flex"
            justifyContent="space-around"
            width="300px"
            marginTop="10px"
          >
            <span>Late</span>
            <span>{late} %</span>
          </Box>
          <Box
            display="flex"
            justifyContent="space-around"
            width="300px"
            marginTop="20px"
          >
            <span>Left</span>
            <span>{leftEarly} %</span>
          </Box>
        </Grid>
      </Box>
      <Box
        display="none"
        bgcolor="#fff"
        borderRadius="6px"
        marginTop="10px"
        width="100%"
        height="170px"
        p={{ xs: 1, sm: 1, md: 1 }}
        style={{
          boxShadow: "0px 0px 10px #E5E6FF",
          padding: "20px",
          overflow: "auto",
        }}
      >
        <p style={{ fontSize: "18px" }}>Best time to conduct meeting</p>

        <Grid container spacing={1} style={{ marginTop: "10px" }}>
          <Box
            display="flex"
            alignContent="center"
            alignItems="center"
            justifyContent="space-around"
            width="300px"
            marginTop="10px"
          >
            <span style={{ backgroundColor: "#EDF3FF", padding: "20px 75px" }}>
              0 PM (EDT)
            </span>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
