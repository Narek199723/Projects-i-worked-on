import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
// material
import { useTheme } from "@material-ui/core/styles";
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
import { UpcomingMeetingsUrl } from "../../utils/endpoints";

//
import Label from "../Label";
import Scrollbar from "../Scrollbar";
import MoreMenuButton from "../MoreMenuButton";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function ParticipantsAvatars(props) {
  const { row } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { participants } = row;
  if (participants && participants.length > 0) {
    return (
      <Grid container>
        <Grid item xs={12} lg={8}>
          <AvatarGroup max={4}>
            {participants.map((p, index) => {
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
            })}
          </AvatarGroup>
        </Grid>
        <Grid item xs={12} md={4}>
          <a
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
                    <Avatar alt={name} src={avatar} className="pop-avatar">
                      {fChar}
                    </Avatar>
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

export default function UpcomingMeetings() {
  const history = useHistory();
  const handleRowClick = (meetingId) => {
    history.push(`/meeting/${meetingId}`);
  };
  const theme = useTheme();

  const [pastMeetings, setPastMeetings] = useState([]);

  useEffect(async () => {
    let payload = { perPage: 5, page: 1 };
    let apiRes = await Get(UpcomingMeetingsUrl, payload);
    if (apiRes.status == 200 && apiRes.data.status == "success") {
      const { data } = apiRes.data;
      setPastMeetings(data);
    } else {
    }
  }, []);

  const _renderDateTime = (datetime) => {
    if (datetime) {
      let t = datetime;
      return moment(t).format("lll");
    } else {
      return "--";
    }
  };

  return (
    <Card id="block-past-meetings">
      <CardHeader title="Upcoming meetings" sx={{ mb: 3, fontSize: 16 }} />
      {/* <Scrollbar> */}
      <TableContainer>
        <Table id="pastmeetings">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Participants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastMeetings.map((row, index) => (
              // <RouterLink to={`/meeting/${row.id}`}>

              <TableRow key={index} style={{ cursor: "pointer" }} key={row.id}>
                <TableCell>{_renderDateTime(row.startTime)}</TableCell>
                <TableCell>{row.title || "--"}</TableCell>
                <TableCell align="right">
                  <ParticipantsAvatars row={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pastMeetings && pastMeetings.length > 0 ? (
        <div className="footer-see-all">
          <a
            onClick={(e) => {
              e.preventDefault();
              history.push(`/meetings/upcoming`);
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
