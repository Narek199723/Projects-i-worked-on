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

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import InputBase from "@material-ui/core/InputBase";
import { alpha } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ContactsTable from "./ContactsTable";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import DashboardIcon from "@material-ui/icons/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Meetings(props) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Page>
      <Container maxWidth={"xl"}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar style={{ background: "white", color: "black" }}>
              {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
              <Typography className={classes.title} variant="h6" noWrap>
                Contacts
              </Typography>
              <DashboardIcon style={{ marginRight: "10px" }} />
              <ListIcon style={{ marginLeft: "10px", marginRight: "10px" }} />
              <RouterLink color="inherit" to="/contact/0">
                <Button
                  style={{ width: "136px" }}
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<AddIcon />}
                >
                  Add contact
                </Button>
              </RouterLink>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Toolbar>
          </AppBar>
          <ContactsTable />
        </div>
      </Container>
    </Page>
  );
}
