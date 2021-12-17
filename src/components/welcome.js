import React from "react";
import { Grid } from "@material-ui/core";
import Radio from "./inputs/radio";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import logo from "../images/logo.png";

function welcome() {
  const { logout } = useAuth();
  const joinButton = {
    backgroundColor: "#2C73FF",
    boxShadow: "0px 11px 12px rgba(44, 115, 255, 0.25)",
    borderRadius: "6px",
    width: "224px",
    height: "48px",
    color: "#fff",
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box bgcolor="#fff" p={{ xs: 2, sm: 3, md: 4 }}>
          <Grid align="center">
            <img src={logo} className="bc-icon" />

            <Typography variant="h4" gutterBottom>
              One last step
            </Typography>
            <Typography variant="body2" gutterBottom>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod
            </Typography>
          </Grid>
          <form action="organization-details" autoComplete="off">
            <div className="frm-block">
              <FormLabel component="legend">Organization name</FormLabel>
              <TextField
                required
                id="organization-name"
                name="organization-name"
                variant="outlined"
                fullWidth
                // defaultValue="My Organization"
                placeholder="Enter name here"
              />
            </div>
            <div className="frm-block">
              <FormLabel component="legend">Meeting settings</FormLabel>
              <Radio />
            </div>
            <div>
              <Grid align="center">
                <Button type="submit" variant="contained" style={joinButton}>
                  Join meeting
                </Button>
              </Grid>
            </div>
            <div>
              <Typography
                variant="body2"
                color="textPrimary"
                align="center"
                style={{ marginTop: "70px" }}
              >
                {"Bluecap © "}, All rights reserved, {new Date().getFullYear()}
                {"."}
              </Typography>
            </div>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default welcome;
