import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container, Grid } from "@material-ui/core";

import Page from "../Page";
import MeetingsTable from "./MeetingsTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
}));

export default function Meetings(props) {
  const history = useHistory();
  const classes = useStyles();

  let defaultTab = 0;
  if (history && history.location && history.location.pathname) {
    if (history.location.pathname.indexOf("upcoming") !== -1) {
      defaultTab = 1;
    }
  }

  const [value, setValue] = React.useState(defaultTab);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page>
      <Container maxWidth={"xl"}>
        <div className={classes.root}>
          <AppBar position="static" className={classes.bg}>
            <Tabs value={value} onChange={handleChange} className={classes.pl}>
              <Tab label="Past Meetings" {...a11yProps(0)} />
              <Tab label="Upcoming Meetings*" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <MeetingsTable type="past" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MeetingsTable type="upcoming" />
          </TabPanel>
        </div>
      </Container>
    </Page>
  );
}
