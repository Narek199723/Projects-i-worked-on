import React, { Fragment } from "react";
import MeetingChart from "./MeetingsChart";
import SelectFIeld from "../common/Select/Select";
import { Card, Container, Grid } from "@material-ui/core";
import SentimentChart from "./SentimentChart";
import Collaboration from "./Collaboration";

const cardStyle = {
  height: "100%",
};

const Charts = () => {
  return (
    <Fragment>
      <Grid item xs={12} lg={4} pt={0}>
        <Card style={cardStyle}>
          <MeetingChart>
            <SelectFIeld />
          </MeetingChart>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card style={cardStyle}>
          <Collaboration>
            <SelectFIeld />
          </Collaboration>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card style={cardStyle}>
          <SentimentChart>
            <SelectFIeld />
          </SentimentChart>
        </Card>
      </Grid>
    </Fragment>
  );
};

export default Charts;
