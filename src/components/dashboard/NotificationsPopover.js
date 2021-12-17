import { useRef, useState, useEffect } from "react";
// material
import { styled } from "@material-ui/core/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import firebase from "./../../firebase/firebase.js";
import { getData } from "./../../utils";

import { Box } from "@material-ui/core";

const BoxStyle = styled(Box)(({ theme }) => ({
  background: "#FEFCFF",
  boxShadow: " 0px 0px 10px #E5E6FF",
  borderRadius: 6,
}));

/* input normal */
const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: "#b345d2",
  },
  barColorPrimary: {
    backgroundColor: "green",
  },
}));
export default function NotificationsPopover() {
  const classes = useStyles();

  const [progress, setProgress] = useState(0);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
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
          //     usageResponce.data.usedMinutes = 181

          //     if(usageResponce.data.usedMinutes > usageResponce.data.freeMinutes){

          //         setProgress(100*usageResponce.data.freeMinutes/usageResponce.data.usedMinutes);
          //     }else{
          //         setProgress(100*usageResponce.data.usedMinutes/usageResponce.data.freeMinutes);
          //     }
          //     setUsage({freeMinutes:usageResponce.data.freeMinutes, usedMinutes:usageResponce.data.usedMinutes})
          // }
        }
      });
  }, []);

  return (
    <div className="header-credit" style={{ minWidth: "100px" }}>
      {/*<Box sx={{ fontSize: 14 }}>Credit</Box>
              <BoxStyle className="navbarcredit-box">300</BoxStyle>*/}

      {usage && (
        <>
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
                    (Math.round((usage.usedMinutes / 60) * 100) / 100 -
                      Math.round((usage.freeMinutes / 60) * 100) / 100) *
                      100
                  ) / 100}{" "}
                  hrs{" "}
                </p>
              ) : (
                <p>
                  {Math.round(
                    (Math.round((usage.usedMinutes / 60) * 100) / 100 -
                      Math.round((usage.freeMinutes / 60) * 100) / 100) *
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
        </>
      )}
    </div>
  );
}
