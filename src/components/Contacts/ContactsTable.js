import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { Link as RouterLink, useHistory } from "react-router-dom";
// material
import { useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { deleteContact } from "../../firebase/firestore";
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
import { ContactsList } from "../../utils/endpoints";
import { getContactById } from "../../firebase/firestore";

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

export default function ContactsTable(props) {
  const { type } = props;
  let apiUrl = ContactsList;
  // if (type === "upcoming") {
  //   apiUrl = UpcomingMeetingsUrl;
  // }

  const history = useHistory();
  const handleRowClick = async (contactId) => {
    history.push(`/contact/${contactId}`);
  };

  const totalRecordsPerPage = 10;

  const [contactList, setContactList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTableRows = async () => {
    let payload = { perPage: totalRecordsPerPage, page: currentPage };
    let apiRes = await Get(apiUrl, payload);
    if (apiRes.status == 200 && apiRes.data.status == "success") {
      const { data, total } = apiRes.data;
      console.log(data, "contacts getting");
      setContactList(data);
      setTotalRecords(total);
    } else {
      console.log("data not fetched");
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

  const handleDelete = async (ID) => {
    let status = await deleteContact(ID);
    if (status) {
      alert("Data deleted");
    }
  };

  return (
    <Card id="block-past-meetings">
      <TableContainer>
        <Table id="pastmeetings">
          <TableHead>
            <TableRow>
              {/* {type === "upcoming" ? null : <TableCell>ID</TableCell>} */}
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              {/* <TableCell className="header-participants">
                Participants
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {contactList.map((el, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{el.firstName}</TableCell>
                  <TableCell>{el.role}</TableCell>
                  <TableCell>
                    {el.emails.length > 1 && el.emails[0].email1}
                  </TableCell>
                  <TableCell>
                    {el.phones.length > 1 && el.phones[0].phone0}
                  </TableCell>
                  <TableCell>
                    <Button style={{ cursor: "pointer" }} variant="outlined">
                      {" "}
                      Go to contact{" "}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Icon
                      icon="carbon:delete"
                      color="red"
                      width="16"
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      onClick={() => handleDelete(el.contactId)}
                      height={"16"}
                    />
                    <Icon
                      icon="carbon:edit"
                      color="red"
                      width="16"
                      onClick={() => handleRowClick(el.contactId)}
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      height={"16"}
                    />
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
