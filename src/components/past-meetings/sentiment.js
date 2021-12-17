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
}));

export default function sentiment(meetingData) {
  // console.log('finalData=', meetingData);
  const classes = UseStyles();
  let sum = 0;
  let average = 0;
  const sentiments = meetingData.sentiments ? meetingData.sentiments : [];
  // console.log('sentiments',sentiments)

  // let isSentiment = false;
  // if(sentiments){
  //     isSentiment = sentiments.some((p)=> p.sentiments);
  // }

  sentiments.forEach(calAvg);
  function calAvg(item) {
    if (item.sentiment) {
      // console.log(item.sentiment.score);
      sum += item.sentiment.score;
    }
  }
  if (sum != 0) {
    average = sum / sentiments.length;
  }

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
        style={{ boxShadow: "0px 0px 10px #E5E6FF", padding: "23px" }}
      >
        <p style={{ fontSize: "18px" }}>Sentiment score</p>
        {/* {
                    sum != 0 &&
                    <div className={classes.mt20} style={{ display: 'flex', justifyContent: 'center' }}>
                        <span className={classes.percent}>{average}%</span>
                    </div>
                } */}

        {sentiments.length > 0 &&
          sentiments.map((participants, index) => {
            // console.log(participants);
            return (
              <div key={index}>
                {"sentiment" in participants && (
                  <Grid container spacing={1} style={{ marginTop: "20px" }}>
                    <Grid item xs={2} sm={2}>
                      <Avatar
                        alt={participants.name}
                        src={participants.avatar}
                        style={{
                          height: "25px",
                          width: "25px",
                          borderColor: "blue",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} sm={7}>
                      <span>{participants.name}</span>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      {meetingData.isPaidUser ? (
                        <span>
                          {participants.sentiment.emotion == "MIXED" && (
                            <p title="Mixed">🤨</p>
                          )}
                          {participants.sentiment.emotion == "NEUTRAL" && (
                            <p title="Neutral">😐</p>
                          )}
                          {participants.sentiment.emotion == "POSITIVE_1" && (
                            <p title="Positive">🙂</p>
                          )}
                          {participants.sentiment.emotion == "POSITIVE_2" && (
                            <p title="Very Positive">😀</p>
                          )}
                          {participants.sentiment.emotion == "NEGATIVE_1" && (
                            <p title="Negative">🙁</p>
                          )}
                          {participants.sentiment.emotion == "NEGATIVE_2" && (
                            <p title="Very Negative">😖</p>
                          )}
                        </span>
                      ) : (
                        <span
                          style={
                            participants.isPaidUser ? {} : { cursor: "pointer" }
                          }
                          onClick={
                            participants.isPaidUser
                              ? () => console.log("nothing")
                              : () => (window.location.href = "/payment")
                          }
                        >
                          <p title="Please upgrade to access sentiment score">
                            ❓
                          </p>
                        </span>
                      )}
                    </Grid>
                  </Grid>
                )}
                {/* {
                                !('sentiment' in participants) && 
                                <p style={{textAlign:"center"}}> No Sentiments!</p> 
                                
                            } */}
              </div>
            );
          })}
        {!sentiments && <p style={{ textAlign: "center" }}> No Sentiments!</p>}
      </Box>
    </>
  );
}
