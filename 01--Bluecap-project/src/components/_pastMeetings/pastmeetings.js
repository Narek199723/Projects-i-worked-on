import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
// material
import { useTheme, styled } from "@material-ui/core/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import {
  Grid,
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  Popover,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import moment from "moment";

// utils

import { Post, Get } from "../../utils/axiosUtils";
import { PastMeetingsList } from "../../utils/endpoints";

//
import Label from "../Label";
import Scrollbar from "../Scrollbar";
import MoreMenuButton from "../MoreMenuButton";

import {
  getMeetingByMeetingId,
  getMeetingsByMeetingIdList,
} from "../../firebase/firestore";
import firebase from "../../firebase/firebase";
import { result } from "lodash";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#B345D2",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function ParticipantsAvatars(props) {
  const { row } = props;

  let organizerName = "";
  if (props.organizerName !== undefined) {
    organizerName = props.organizerName;
  }

  // console.log('organizerName',organizerName)
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { participants } = row;
  if (participants !== undefined && organizerName !== undefined) {
    participants.organizerName = organizerName;
  }
  // console.log('participants', participants)

  // let getOrganizer = getMeetingDetails(row.id)

  if (participants && participants.length > 0) {
    return (
      <Grid container>
        <Grid item xs={12} lg={8}>
          <AvatarGroup max={4}>
            {participants.map((p, index) => {
              console.log(
                "participants.organizerName",
                participants.organizerName
              );
              const { name, avatar, email } = p;
              let fChar = "";
              if (avatar === undefined || avatar === "") {
                if (name !== undefined && name !== "") {
                  fChar = name.charAt(0);
                }
                if (fChar === "" && email !== undefined && email !== "") {
                  fChar = email.charAt(0);
                }
              }
              if (fChar !== "") {
                fChar = fChar.toUpperCase();
              }
              if (
                participants.organizerName &&
                name == participants.organizerName
              ) {
                return (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    variant="dot"
                    title="Organiser"
                  >
                    <Avatar
                      className="bulk-avatar"
                      alt={name}
                      src={avatar}
                      key={index}
                    />
                  </StyledBadge>
                );
              } else {
                return (
                  <Avatar
                    key={index}
                    alt={name}
                    src={avatar}
                    className="bulk-avatar"
                  >
                    {fChar}
                  </Avatar>
                );
              }
              // return (
              //   <>
              //     {
              //       participants.organizerName && name == participants.organizerName ? (
              //         <StyledBadge
              //           overlap="circular"
              //           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              //           variant="dot"
              //           title="Organiser"
              //         >
              //           <Avatar
              //             className="bulk-avatar"
              //             alt={name}
              //             src={avatar}
              //             key={index}
              //           />
              //         </StyledBadge>
              //       ) : (
              //         <Avatar
              //           key={index}
              //           alt={name}
              //           src={avatar}
              //           className="bulk-avatar"
              //         >
              //           {fChar}
              //         </Avatar>
              //       )
              //     }

              //   </>
              // );
            })}
          </AvatarGroup>
        </Grid>
        <Grid item xs={12} md={4}>
          <a
            // href="/"
            aria-describedby={row.id}
            onClick={handleClick}
            className="expand-arrow-icon"
          >
            {open ? (
              <ExpandLessIcon className="arrow" />
            ) : (
              <ExpandMoreIcon className="arrow" />
            )}
          </a>
          <Popover
            id={row.id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              style: { minWidth: "147px", paddingRight: "20px" },
            }}
          >
            {participants.map((p, index) => {
              // console.log('ppp',p)
              const { name, avatar, email } = p;
              let fChar = "";
              if (avatar === undefined || avatar === "") {
                if (name !== undefined && name !== "") {
                  fChar = name.charAt(0);
                }
                if (fChar === "" && email !== undefined && email !== "") {
                  fChar = email.charAt(0);
                }
              }
              if (fChar !== "") {
                fChar = fChar.toUpperCase();
              }
              let txtToDisplay = name;
              if (name === undefined || name === "") {
                txtToDisplay = email;
              }
              return (
                <Grid key={index} container className="past-popup-participants">
                  <Grid item xs={3} lg={3}>
                    {participants.organizerName &&
                    name == participants.organizerName ? (
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        variant="dot"
                      >
                        <Avatar
                          alt={name}
                          src={avatar}
                          className="pop-avatar"
                        />
                      </StyledBadge>
                    ) : (
                      <Avatar alt={name} src={avatar} className="pop-avatar">
                        {fChar}
                      </Avatar>
                    )}
                  </Grid>
                  <Grid item xs={9} lg={9}>
                    {txtToDisplay}
                  </Grid>
                </Grid>
              );
            })}
          </Popover>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
}

export default function PastMeetings() {
  const history = useHistory();
  const handleRowClick = (meetingId) => {
    history.push(`/meeting/${meetingId}`);
  };
  const theme = useTheme();

  const [pastMeetings, setPastMeetings] = useState([]);
  const [organizerName, setOrganizerName] = useState("");
  const [meetingTypeTxt, setMeetingTypeTxt] = useState("");

  const getMeetingDetails = async (id) => {
    let res = await getMeetingByMeetingId(id);
    // console.log('res', res);
    let displayName = "";
    if (
      res.organizer !== undefined &&
      res.organizer.displayName !== undefined
    ) {
      // console.log(res.organizer.displayName);
      displayName = res.organizer.displayName;
    } else {
    }
    return displayName;
  };

  useEffect(() => {
    (async () => {
      let payload = { perPage: 10, page: 1 };
      let apiRes = await Get(PastMeetingsList, payload);
      if (apiRes.status == 200 && apiRes.data.status == "success") {
        const { data } = apiRes.data;

        let meetingIds = [];
        let meetingIdList = await data.map((id, index) => {
          meetingIds.push(id.id);
        });
        // console.log("meetingIds", meetingIds);

        data.map(async (row, index) => {
          let res = await getMeetingByMeetingId(row.id);
          if (res.organizer !== undefined && res.organizer.displayName) {
            row.organizerName = res.organizer.displayName;
          }
        });

        let meetingData = await getMeetingsByMeetingIdList(meetingIds);
        // console.log("meetingData", meetingData);
        setTimeout(() => {
          setPastMeetings(data);
        }, 2000);
      } else {
      }
    })();
  }, []);

  return (
    <Card id="block-past-meetings">
      <CardHeader title="Past meetings" sx={{ mb: 3, fontSize: 16 }} />
      {/* <Scrollbar> */}
      <TableContainer style={{ borderRadius: "6px" }}>
        <Table id="pastmeetings">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Date/Time</TableCell>
              <TableCell>Type/Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Participants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastMeetings.map((row, index) => {
              // console.log('rowwe',row)

              // set meeting type
              let meetingLogo = "";
              let meetingTitleTxt = "";

              if (row.channelType == "GOOGLE_MEET") {
                meetingLogo = "/images/google-meet-logo.svg";
                meetingTitleTxt = "Google meeting";
              } else if (row.channelType == "ZOOM") {
                meetingLogo = "/images/zoom-logo.png";
                meetingTitleTxt = "Zoom meeting";
              }

              return (
                // <RouterLink to={`/meeting/${row.id}`}>

                <TableRow
                  key={index}
                  style={{ cursor: "pointer" }}
                  key={row.id}
                >
                  {/* <TableCell onClick={() => handleRowClick(row.id)}>
                    {row.readableId}
                  </TableCell> */}
                  <TableCell onClick={() => handleRowClick(row.id)}>
                    {row.startTime ? moment(row.startTime).format("lll") : "--"}
                  </TableCell>

                  <TableCell onClick={() => handleRowClick(row.id)}>
                    <Box display="flex">
                      <img
                        src={meetingLogo}
                        width="20"
                        height="20"
                        alt=""
                        title={meetingTitleTxt}
                      />
                      <p style={{ marginLeft: "10px" }}>{row.title || "--"}</p>
                    </Box>
                  </TableCell>

                  <TableCell
                    onClick={() => handleRowClick(row.id)}
                    className="duration"
                  >
                    {row.duration}
                  </TableCell>
                  <TableCell align="right">
                    <ParticipantsAvatars
                      row={row}
                      organizerName={row.organizerName}
                    />
                  </TableCell>
                  {/* <TableCell>
                      <MoreMenuButton />
                    </TableCell> */}
                </TableRow>
                // </RouterLink>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {pastMeetings && pastMeetings.length > 0 ? (
        <div className="footer-see-all">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              history.push(`/meetings/past`);
            }}
            style={{ cursor: "pointer" }}
          >
            See all
          </a>
        </div>
      ) : null}
      {/* </Scrollbar> */}

      {/* <Divider /> */}

      {/* <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View All
        </Button>
      </Box> */}
    </Card>
  );
}
