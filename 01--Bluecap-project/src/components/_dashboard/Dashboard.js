import React from "react";
import { Container, Grid } from "@material-ui/core";
import Page from "../Page";
import PastMeetings from "../_pastMeetings/pastmeetings";
import UpcomingMeetings from "../_upcomingMeetings/UpcomingMeetings";
import Charts from "../charts.js/Charts";

export default function Dashboard() {
  return (
    <Page>
      <Container maxWidth={"xl"}>
        <Grid container spacing={3} sx={{ marginBottom: "2%" }}>
          <Charts />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <PastMeetings />
          </Grid>
          <Grid item xs={12} md={6}>
            <UpcomingMeetings />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
