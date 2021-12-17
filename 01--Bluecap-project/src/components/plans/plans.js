import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url("images/pricing-bg.png")`,
  },
  pricingTxt: {
    color: "#fff",
    fontSize: "34px",
    fontWeight: "600",
    paddingTop: "5%",
  },
  titleContainer: {
    textAlign: "center",
    height: "450px",
    width: "100%",
  },
  freePaidTxt: {
    color: "#fff",
    fontSize: "24px",
    paddingTop: "3%",
  },
  priceBox: {
    height: "510px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "20px",
    width: "280px",
    boxShadow:
      "0px 34px 67px rgba(0, 0, 0, 0.07), 0px 22.037px 39.2384px rgba(0, 0, 0, 0.0531481), 0px 13.0963px 21.3407px rgba(0, 0, 0, 0.0425185)",
    marginTop: "10px",
  },
  freetxt: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
  },
  zeroTxt: {
    color: "#2C73FF",
    fontSize: "22px",
    textAlign: "center",
  },
  detailTxt: {
    fontSize: "12px",
    textAlign: "center",
    padding: "10px 30px",
  },
  payTxt: {
    fontSize: "24px",
    fontWeight: "600",
    textAlign: "center",
    marginTop: "100px",
  },
  tblrow: {
    background: "rgba(44, 115, 255, 0.07)",
    borderBottom: "5px solid #fff",
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
}));

function createData(activities, unit, cost, pay) {
  return { activities, unit, cost, pay };
}

const rows = [
  createData("Summary", "hour", "$3", "$3.25/hour"),
  createData(
    "Advanced Analytics Global and participant sentiment, Product and Competitive Intelligence, predictive and prescriptive intelligence",
    "hour",
    "$1.50",
    "$2/hour"
  ),
  createData("Analytics Basic analytics", "hour", "$0.35", "$0.50/hour"),
  createData("Storage", "GB", "$0.10/gb", "$0.15/gb"),
  createData(
    "Personalized Search (AI)",
    "1000 searches",
    "$1.65/1000 searches",
    "$1.85/1000 searches"
  ),
];

export default function Plans() {
  const classes = useStyles();
  let history = useHistory();
  const [price, setPrice] = useState("");

  const getPrice = (data) => {
    console.log(data);
    history.push({
      pathname: "/payment",
      state: data,
    });
  };

  return (
    <div>
      <Grid container className={classes.container}>
        <Box className={classes.titleContainer}>
          <p className={classes.pricingTxt}>Pricing</p>
          <p className={classes.freePaidTxt}>
            Supercharge your meetings. Try it{" "}
            <span style={{ color: "red" }}>free</span> for 30 days
          </p>
        </Box>
      </Grid>
      <Grid>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          padding="0 10.5%"
          marginTop="-150px"
        >
          <Box></Box>
          <Box className={classes.priceBox}>
            <p className={classes.freetxt}>Basic</p>
            <p className={classes.zeroTxt}>Always Free</p>
            <hr
              style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                margin: "25% 5% 5% 5%",
              }}
            />
            <p className={classes.detailTxt}>
              For individuals just getting started with bluecap
            </p>
            <p className={classes.detailTxt}>Unlimited Meetings</p>
            <p className={classes.detailTxt}>Unlimited Transcripts</p>
            <p className={classes.detailTxt}>Real Time Interactions</p>
            <Button
              onClick={(e) => {
                getPrice({ planType: "free", price: "0" });
              }}
              variant="contained"
              color="error"
              fullWidth="true"
              style={{ marginTop: "130px" }}
            >
              Select
            </Button>
          </Box>
          <Box className={classes.priceBox}>
            <p className={classes.freetxt}>Advanced</p>
            <p className={classes.zeroTxt}>$15/month</p>
            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginTop: "35px",
              }}
            >
              (30 Days Free Trial)
            </p>
            <hr
              style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                margin: "5%",
              }}
            />
            <p className={classes.detailTxt}>Save time and get more done</p>
            <p className={classes.detailTxt}>All Basic features +</p>
            <p className={classes.detailTxt}>
              Up to 4 hours of meeting summaries
            </p>
            <p className={classes.detailTxt}>
              Up to 30 hours of Meeting recordings
            </p>
            <p className={classes.detailTxt}>Meeting Analytics</p>
            <p className={classes.detailTxt}>Additional hours $3.80/hour</p>
            <Button
              onClick={(e) => {
                getPrice({ planType: "basic", price: "15" });
              }}
              variant="contained"
              color="error"
              fullWidth="true"
              style={{ marginTop: "31px" }}
            >
              Select
            </Button>
          </Box>
          <Box className={classes.priceBox}>
            <p className={classes.freetxt}>Professional</p>
            <p className={classes.zeroTxt}>$25/month</p>
            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginTop: "35px",
              }}
            >
              (30 Days Free Trial)
            </p>
            <hr
              style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                margin: "5%",
              }}
            />
            <p className={classes.detailTxt}>
              Perfect for individuals and professionals.
            </p>
            <p className={classes.detailTxt}>All Advanced features +</p>
            <p className={classes.detailTxt}>
              Up to 8 hours of meeting summaries
            </p>
            <p className={classes.detailTxt}>
              Up to 60 hours of Meeting recordings
            </p>
            <p className={classes.detailTxt}>Relationship Analytics</p>
            <p className={classes.detailTxt}>Additional hours $3.25/hour</p>
            <Button
              onClick={(e) => {
                getPrice({ planType: "professional", price: "25" });
              }}
              variant="contained"
              color="error"
              fullWidth="true"
              style={{ marginTop: "13px" }}
            >
              Select
            </Button>
          </Box>
          <Box className={classes.priceBox}>
            <p className={classes.freetxt}>Business</p>
            <p className={classes.zeroTxt}>$170/month</p>
            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginTop: "35px",
              }}
            >
              (30 Days Free Trial)
            </p>
            <hr
              style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                margin: "5%",
              }}
            />
            <p className={classes.detailTxt}>
              Great for teams and organizations.
            </p>
            <p className={classes.detailTxt}>All Professional features +</p>
            <p className={classes.detailTxt}>
              Up to 60 hours of meeting summaries
            </p>
            <p className={classes.detailTxt}>
              Up to 1200 hours of Meeting recordings
            </p>
            <p className={classes.detailTxt}>Business Analytics</p>
            <p className={classes.detailTxt}>Additional hours $2.85/hour</p>
            <Button
              onClick={(e) => {
                getPrice({ planType: "business", price: "170" });
              }}
              variant="contained"
              color="error"
              fullWidth="true"
              style={{ marginTop: "13px" }}
            >
              Select
            </Button>
          </Box>
          <Box className={classes.priceBox}>
            <p className={classes.freetxt}>Enterprise</p>
            <p className={classes.zeroTxt}>Contact us</p>
            <hr
              style={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                margin: "25% 5% 5% 5%",
              }}
            />
            <p className={classes.detailTxt}>Large or Custom Needs.</p>
            <Button
              onClick={(e) => {
                getPrice({ planType: "enterprice", price: "custom" });
              }}
              variant="contained"
              color="error"
              fullWidth="true"
              style={{ marginTop: "262px" }}
            >
              Select
            </Button>
          </Box>
        </Box>
      </Grid>
      {/* <Grid>
                <Box>
                    <p className={classes.payTxt}>Pay as you go</p>
                </Box>
                <Container maxWidth="xl" style={{ padding: '50px 20px' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead >
                                <TableRow >
                                    <TableCell className={classes.bgWhite}>Activities</TableCell>
                                    <TableCell className={classes.bgWhite}>Unit</TableCell>
                                    <TableCell className={classes.bgWhite}>Cost per month with paid plans when exceeded</TableCell>
                                    <TableCell className={classes.bgWhite}>Pay per use cost (no  paid plans)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        className={classes.tblrow}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.activities}
                                        </TableCell>
                                        <TableCell>{row.unit}</TableCell>
                                        <TableCell>{row.cost}</TableCell>
                                        <TableCell>{row.pay}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Grid> */}
    </div>
  );
}
