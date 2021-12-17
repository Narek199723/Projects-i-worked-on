import React, { useEffect, useState } from "react";
import { Grid, TextField, Box, AppBar, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

import FormLabel from "@material-ui/core/FormLabel";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

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
  priceTxt: {
    color: "#2C73FF",
    fontSize: "22px",
  },
}));

function TopicLabels({ ...props }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [topicName, setTopicName] = useState("");

  useEffect(async () => {
    await props.fetchTopicsRequest();
  }, []);

  const classes = useStyles();

  const doTopicDelete = (index, topic) => {
    props.deleteTopicRequest(index);
  };

  let preDefinedColors = [
    "#FAD1CA",
    "yellow",
    "#EDFA99",
    "#E9EACF",
    "#B4E0F9",
    "green",
    "orange",
    "lightgreen",
    "olive",
    "gold",
  ];

  const addTopic = () => {
    if (topicName.trim() === "") {
    } else {
      let color =
        preDefinedColors[Math.floor(Math.random() * preDefinedColors.length)];
      props.addNewTopicRequest({
        topicName: topicName.trim(),
        color: color,
      });
      // setSelectedColor("");
      setTopicName("");
    }
  };

  let topicLabelsCheck = 0;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bg}></AppBar>

      {/* Competitors preference setting */}
      <Grid container style={{ marginTop: "20px" }} className={classes.mb20}>
        <Grid item xs={5}>
          <FormLabel component="legend" className={classes.lableFont}>
            Topic Labels
          </FormLabel>
          <Typography variant="caption">Create custom topic labels</Typography>
        </Grid>

        <Box width={{ md: "240px", xs: "160px" }}>
          {/* Select Color:
          <br />
          {preDefinedColors.map((color, key) => {
            return (
              <div
                key={key}
                onClick={() => setSelectedColor(color)}
                style={{
                  border: "1px solid black",
                  height: "20px",
                  width: "45px",
                  float: "left",
                  background: `${color}`,
                  textAlign: "center",
                }}
              >
                {color === selectedColor ? <CheckOutlinedIcon /> : null}
              </div>
            );
          })} */}
          {/* <br />
          <br /> */}
          <TextField
            placeholder="Add Topic Labels"
            inputProps={{ "aria-label": "Add Topic Labels" }}
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTopic();
              }
            }}
            // style={{
            //   background: `${selectedColor}`,
            // }}
          />
        </Box>

        <Box
          display={{
            xs: "block",
            md: "none",
            marginTop: "12px",
            marginLeft: "5px",
          }}
        ></Box>
        <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
          {props.topics.map((p, index) => {
            if (topicLabelsCheck === 5) {
              topicLabelsCheck = 1;
            }
            topicLabelsCheck++;
            return (
              <>
                {topicLabelsCheck === 5 ? (
                  <>
                    <br />
                    <br />
                  </>
                ) : null}
                <Chip
                  key={index}
                  label={p.topicName}
                  style={{ background: p.color || "" }}
                  onDelete={async (a) => {
                    doTopicDelete(index, p);
                  }}
                />
              </>
            );
          })}
        </div>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  topics: (state.settings.topics && state.settings.topics.data) || [],
});
const mapDispatchToProps = (dispatch) => ({
  showSnackbar: (data) => dispatch(actions.showSnackbar(data)),
  addNewTopicRequest: (data) => dispatch(actions.addNewTopicRequest(data)),
  fetchTopicsRequest: (data) => dispatch(actions.fetchTopicsRequest(data)),
  deleteTopicRequest: (data) => dispatch(actions.deleteTopicRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicLabels);
