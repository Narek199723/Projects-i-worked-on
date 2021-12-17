import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { Link as RouterLink, useHistory } from "react-router-dom";
// material
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
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
import Pagination from "@material-ui/lab/Pagination";

// utils

import { Post, Get } from "../../utils/axiosUtils";
import { PastMeetingsList, UpcomingMeetingsUrl } from "../../utils/endpoints";

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

export default function MeetingsTable(props) {
  const { type } = props;
  let apiUrl = PastMeetingsList;
  if (type === "upcoming") {
    apiUrl = UpcomingMeetingsUrl;
  }

  const history = useHistory();
  const handleRowClick = (meetingId) => {
    history.push(`/meeting/${meetingId}`);
  };

  const totalRecordsPerPage = 10;

  const [meetingsList, setMeetingsList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTableRows = async () => {
    let payload = { perPage: totalRecordsPerPage, page: currentPage };
    let apiRes = await Get(apiUrl, payload);
    if (apiRes.status == 200 && apiRes.data.status == "success") {
      const { data, total } = apiRes.data;
      setMeetingsList(data);
      setTotalRecords(total);
    } else {
    }
  };

  const onPaginationChange = (fn, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let tmpTotalPages = totalRecords / totalRecordsPerPage;
    setTotalPages(Math.ceil(tmpTotalPages));
  }, [totalRecords]);

  useEffect(() => {
    fetchTableRows();
  }, [currentPage]);

  return (
    <Card id="block-past-meetings">
      <TableContainer>
        <Table id="pastmeetings">
          <TableHead>
            <TableRow>
              {/* {type === "upcoming" ? null : <TableCell>ID</TableCell>} */}
              <TableCell>Date/Time</TableCell>
              <TableCell>Meeting Type</TableCell>
              <TableCell>Title</TableCell>
              {type === "upcoming" ? null : <TableCell>Duration</TableCell>}
              <TableCell className="header-participants">
                Participants
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetingsList.map((row, index) => {
              console.log("row", row);
              let meetingLogo = "";
              let meetingTitleTxt = "";

              // set meeting type
              if (row.channelType == "GOOGLE_MEET") {
                meetingLogo = "/images/google-meet-logo.svg";
                meetingTitleTxt = "Google meeting";
              } else if (row.channelType == "ZOOM") {
                meetingLogo = "/images/zoom-logo.png";
                meetingTitleTxt = "Zoom meeting";
              }

              return (
                <TableRow
                  key={index}
                  style={{ cursor: "pointer" }}
                  key={row.id}
                >
                  {/* {type === "upcoming" ? null : (
                    <TableCell onClick={() => handleRowClick(row.id)}>
                      {row.readableId}
                    </TableCell>
                  )} */}
                  <TableCell onClick={() => handleRowClick(row.id)}>
                    {row.startTime ? moment(row.startTime).format("lll") : "--"}
                  </TableCell>
                  <TableCell onClick={() => handleRowClick(row.id)}>
                    <img
                      src={meetingLogo}
                      width={20}
                      height={20}
                      title={meetingTitleTxt}
                    />
                  </TableCell>
                  <TableCell onClick={() => handleRowClick(row.id)}>
                    {row.title || "--"}
                  </TableCell>
                  {type === "upcoming" ? null : (
                    <TableCell
                      onClick={() => handleRowClick(row.id)}
                      className="duration"
                    >
                      {row.duration}
                    </TableCell>
                  )}
                  <TableCell align="right">
                    <ParticipantsAvatars row={row} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination-block">
        <Pagination count={totalPages} onChange={onPaginationChange} />
      </div>
    </Card>
  );
}
