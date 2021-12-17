import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import firebase from "../../firebase/firebase";
import { getData, postData } from "../../utils";
import { Box, Button, Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import VolumeUp from "@material-ui/icons/VolumeUp";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { VolumeOff } from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";
import { Fullscreen } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import DownloadIcon from "@material-ui/icons/Download";

const useStyles = makeStyles((theme) => ({
  controlWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddind: "20px",
  },
  volControlWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // width: '100%',
    marginLeft: "20px",
  },
  playPause: {
    color: "blue",
    border: "blue",
    cursor: "pointer",
  },
  volSlider: {
    width: 100,
  },
}));

// time slider
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 100,
  },
];

const IOSSlider = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const AirbnbSlider = withStyles({
  root: {
    color: "#3a8589",
    height: 3,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function Video(props) {
  let id = props.meetingId;
  const [url, setUrl] = useState([]);

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let vUrl = await getData(
          `${process.env.REACT_APP_BASE_API_URL}/meeting/getVideoUrls?meetingId=` +
            id,
          jwtToken
        );
        if (vUrl.status == "success") {
          if (vUrl.urls.length) {
            let fUrl = vUrl.urls[0];
            console.log("vUrl", fUrl[0]);
            setUrl(fUrl[0]);
          }
        }
        console.log("url=", url);
      });
  }, []);

  const classes = useStyles();

  const [state, setState] = React.useState({
    playing: false,
    muted: false,
    volume: 10,
    playbackRate: 1.0,
    played: 0,
  });
  const { playing, muted, volume, playbackRate, played } = state;

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleChangeVol = (e, newVal) => {
    setState({
      ...state,
      volume: parseFloat(newVal / 100),
      muted: newVal === 0 ? true : false,
    });
  };

  const onVolSeekDown = (e, newVal) => {
    setState({
      ...state,
      volume: parseFloat(newVal / 100),
      muted: newVal === 0 ? true : false,
    });
  };

  const handlePlaybackRate = (rate) => {
    // console.log('rate', rate);
    setState({ ...state, playbackRate: rate });
  };

  const handleFullScreen = () => {
    // screenfull.toggle(playerContainerRef.current);
  };

  const handleProgess = (changeState) => {
    // console.log(changeState)
    setState({ ...state, ...changeState });
  };

  const handleOnSeek = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleOnSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleOnSeekMouseUp = (e, newVal) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newVal / 100);
  };

  const handleOnEnd = () => {
    setState({ ...state, playing: !state.playing });
  };

  // popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickRatePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRatePopover = () => {
    setAnchorEl(null);
  };

  const openRatePopover = Boolean(anchorEl);
  const popoverId = openRatePopover ? "simple-popover" : undefined;

  return (
    <Box
      bgcolor="#fff"
      borderRadius="6px"
      // marginTop="10px"
      width="100%"
      // height="400px"
      // overflow="auto"
      p={{ xs: 1, sm: 1, md: 1 }}
      style={{ boxShadow: "0px 0px 10px #E5E6FF" }}
    >
      <div ref={playerContainerRef}>
        <ReactPlayer
          url={url}
          controls={false}
          playing={playing}
          muted={muted}
          ref={playerRef}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgess}
          onEnded={handleOnEnd}
          width="100%"
        />
        <Box style={{ padding: "10px 20px" }}>
          <Slider
            // valueLabelDisplay="auto"
            // aria-label="pretto slider"

            min={0}
            max={100}
            value={played * 100}
            onChange={handleOnSeek}
            onMouseDown={handleOnSeekMouseDown}
            onChangeCommitted={handleOnSeekMouseUp}
            valueLabelDisplay="off"
          />
        </Box>

        <Box className={classes.controlWrap}>
          <Box>
            <IconButton onClick={handleRewind}>
              <FastRewindIcon />
            </IconButton>

            <IconButton className={classes.playPause} onClick={handlePlayPause}>
              {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton onClick={handleFastForward}>
              <FastForwardIcon />
            </IconButton>
          </Box>

          <Box style={{ marginLeft: "30px" }}>
            <Button
              aria-describedby={popoverId}
              variant="contained"
              color="secondary"
              onClick={handleClickRatePopover}
            >
              {playbackRate} x
            </Button>
            <Popover
              id={popoverId}
              open={openRatePopover}
              anchorEl={anchorEl}
              onClose={handleCloseRatePopover}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Grid container direction="column-reverse">
                {[0.5, 1.0, 1.5, 2.0].map((rate, index) => (
                  <Button
                    variant="text"
                    onClick={() => handlePlaybackRate(rate)}
                    key={index}
                  >
                    <Typography
                      color={rate == playbackRate ? "#B345D2" : "default"}
                    >
                      {rate} x
                    </Typography>
                  </Button>
                ))}
              </Grid>
            </Popover>
          </Box>

          <Box className={classes.volControlWrap}>
            <IconButton onClick={handleMute}>
              {muted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
            <Slider
              aria-labelledby="continuous-slider"
              className={classes.volSlider}
              min={0}
              max={100}
              value={volume * 100}
              onChange={handleChangeVol}
              onChangeCommitted={onVolSeekDown}
            />
          </Box>
          {/* <Box>
                    <DownloadIcon style={{color:'#2C73FF', marginLeft:'20px', cursor:'pointer' }} />
                </Box> */}

          {/* <Box>
                    <Fullscreen onClick={handleFullScreen} />
                </Box> */}
        </Box>
      </div>
    </Box>
  );
}
