import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const UseStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
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
  nameItem: {
    margin: "25px 0",
  },
  percentItem: {
    margin: "25px 0",
    color: "#8B8B8B",
  },
}));

export default function participation(props) {
  // console.log('props=>', props);
  let name = [];
  let percentage = [];
  let avatarLink = [];
  let lateMinutes = [];
  let noShows = [];
  for (let property in props.participation) {
    // console.log('property::', property.participation)
    // console.log('percent::', props.participation[property].participation)
    // console.log('avatar', props.participation[property].lateMinutes)
    // console.log('noShows::', props.participation[property].noShow)
    name.push(property);
    percentage.push(props.participation[property].participation);
    avatarLink.push(props.participation[property].avatar);
    lateMinutes.push(props.participation[property].lateMinutes);
    noShows.push(props.participation[property].noShow);
  }
  const classes = UseStyles();

  return (
    <>
      <Box
        bgcolor="#fff"
        borderRadius="6px"
        marginTop="10px"
        width="100%"
        height="300px"
        overflow="auto"
        p={{ xs: 1, sm: 1, md: 1 }}
        style={{ boxShadow: "0px 0px 10px #E5E6FF", padding: "20px" }}
      >
        <Box display="flex" justifyContent="space-between">
          <p style={{ fontSize: "16px" }}>Engagement</p>
          <p style={{ fontSize: "16px", paddingLeft: "120px" }}>
            Participation{" "}
          </p>
          <p style={{ fontSize: "16px" }}>Time late </p>
        </Box>

        {/* <div className={classes.mt20} style={{ display: 'flex', justifyContent: 'center' }}>
                    <span className={classes.percent}>0%</span>
                </div> */}

        <Grid container spacing={1} style={{ marginTop: "0" }}>
          <Grid item xs={2} sm={2}>
            {avatarLink &&
              avatarLink.length > 0 &&
              avatarLink.map((participant, index) => {
                return (
                  <div key={index}>
                    <Avatar
                      alt="Anna Smith"
                      src={participant}
                      style={{
                        height: "25px",
                        width: "25px",
                        borderColor: "blue",
                        margin: "25px 0",
                      }}
                      key={index}
                    />
                  </div>
                );
              })}
          </Grid>

          <Grid item xs={6} sm={6}>
            {name &&
              name.length > 0 &&
              name.map((participant, index) => {
                return (
                  <div key={index} className={classes.nameItem}>
                    {participant}
                  </div>
                );
              })}
          </Grid>

          {/* {
                        noShows.map((show, index) => {
                            console.log('show', show)
                            return (
                                show == false ? (
                                    <>
                                        <Grid item xs={2} sm={2} key={index}>
                                            {
                                                percentage &&
                                                percentage.length > 0 &&
                                                percentage.map((percent, index) => {
                                                    return (
                                                        <div
                                                            title={props.isPaidUser ? "" : "Please upgrade to access participation ratio"}
                                                            style={props.isPaidUser ? {} : { cursor: "pointer" }}
                                                            onClick={props.isPaidUser ? () => console.log("nothing") : () => window.location.href = "/payment"}
                                                            key={index}
                                                            className={classes.percentItem}
                                                        >
                                                            {props.isPaidUser ? percent : "❓"}
                                                            <span style={{ paddingLeft: '5px', color: '#8B8B8B' }}>%</span>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Grid>

                                    </>
                                ) : (
                                    <Grid item xs={2} sm={2}>
                                        "🚫"
                                    </Grid>
                                )
                            )
                        })
                    } */}

          <Grid item xs={2} sm={2}>
            {percentage &&
              percentage.length > 0 &&
              percentage.map((percent, index) => {
                return (
                  <div
                    title={
                      props.isPaidUser
                        ? ""
                        : "Please upgrade to access participation ratio"
                    }
                    style={props.isPaidUser ? {} : { cursor: "pointer" }}
                    onClick={
                      props.isPaidUser
                        ? () => console.log("nothing")
                        : () => (window.location.href = "/payment")
                    }
                    key={index}
                    className={classes.percentItem}
                  >
                    {percent ? (props.isPaidUser ? percent : "❓ %") : "🚫"}
                    {/* <span style={{ paddingLeft: '5px', color: '#8B8B8B' }}>%</span> */}
                  </div>
                );
              })}
          </Grid>
          <Grid item xs={2} sm={2}>
            {lateMinutes &&
              lateMinutes.length > 0 &&
              lateMinutes.map((lateMinute, index) => {
                return (
                  <div key={index} className={classes.percentItem}>
                    {lateMinute ? (
                      <p>
                        {lateMinute}{" "}
                        <span style={{ marginLeft: "5px" }}>Mins</span>{" "}
                      </p>
                    ) : (
                      <span></span>
                    )}
                  </div>
                );
              })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
