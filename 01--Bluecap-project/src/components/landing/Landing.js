import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Footer from "../footer/footer";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Radio from "../inputs/radio";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 160,
    paddingRight: 160,
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#FFFFFF",
    height: 580,
    borderRadius: 6,
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  joinbtn: {
    backgroundColor: "#2C73FF",
    boxShadow: "0px 11px 12px rgba(44, 115, 255, 0.25)",
    borderRadius: "6px",
    width: "224px",
    height: "48px",
    color: "#fff",
  },
}));
export default function Landing() {
  const classes = useStyles();
  return (
    <Container
      component="main"
      maxWidth="md"
      id="landing"
      className={classes.root}
    >
      <Card className="form-c">
        <Grid container>
          <Grid item sm={12} className={"justify-center"}>
            <img src="../images/logo.svg" alt="" className="img-fluid" />
          </Grid>
          <Grid item sm={12} className="text-center">
            <Typography component="div" variant="h3">
              One last step
            </Typography>
            <Typography component="div">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod
            </Typography>
          </Grid>
        </Grid>
        <Grid>
          <form action="organization-details" autoComplete="off">
            <Grid item sm={12} className="mb-3">
              <FormLabel component="legend" className="mb-3 heading">
                Organization name
              </FormLabel>
              <TextField
                required
                id="organization-name"
                name="organization-name"
                variant="outlined"
                fullWidth
                placeholder="Enter name here"
                className="input-radius"
              />
            </Grid>
            <Grid item sm={12}>
              <FormLabel component="legend" className="mb-3 heading">
                Meeting settings
              </FormLabel>
              <Radio />
            </Grid>
            <Grid align="center" item sm={12}>
              <Button
                type="submit"
                variant="contained"
                className={classes.joinbtn}
              >
                Join meeting
              </Button>
            </Grid>
          </form>
        </Grid>
      </Card>
      {/* <Box mt={10} className={classes.paper}>
        

        <div className='footer'>
          <Footer />
        </div>
      </Box> */}
    </Container>
  );
}
