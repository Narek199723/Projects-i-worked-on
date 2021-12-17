import React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../../assets/css/upcomingMeeting.scss";
import Box from "@material-ui/core/Box";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import LockIcon from "@material-ui/icons/Lock";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    padding: "50px",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container item xs={12} className="notes-list">
        <ArrowBackIcon /> <span className="details">Back to the list</span>
        <span> </span>
        <span className="details"> | ID 1234 | </span>
        <span>
          {" "}
          <DateRangeIcon />{" "}
        </span>{" "}
        <span className="details"> July 28, 2021 | </span>
        <span>
          {" "}
          <AccessTimeIcon />{" "}
        </span>{" "}
        <span className="details"> 3.30 PM (EDT) | </span>
        <span>
          <AvatarGroup max={4}>
            <Avatar
              className="persons"
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Avatar
              className="persons"
              alt="Travis Howard"
              src="/static/images/avatar/2.jpg"
            />
            <Avatar
              className="persons"
              alt="Cindy Baker"
              src="/static/images/avatar/3.jpg"
            />
            <Avatar
              className="persons"
              alt="Agnes Walker"
              src="/static/images/avatar/4.jpg"
            />
          </AvatarGroup>
        </span>
      </Grid>
      <div>
        <p className="meeting-with-title">
          Meeting with my team about the project{" "}
          <span>
            <LockIcon />
          </span>
        </p>
      </div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <span className="agenda">
              Agenda{" "}
              <span>
                <EditIcon className="edit-icon" />
              </span>
            </span>{" "}
            Edit
            <Box bgcolor="#fff" borderRadius="6px" p={{ xs: 1, sm: 1, md: 1 }}>
              <ol className="agenda-list">
                <li className="agenda-item">
                  <p className="agenda-title">Bla-bla blablabla bla</p>
                  <p>
                    Although I'm not actually embarrassed by this, I tend not to
                    read books that have awesome movies made from them
                  </p>
                </li>
                <li className="agenda-item">
                  <p className="agenda-title">Bla-bla blablabla bla</p>
                  <p>
                    Although I'm not actually embarrassed by this, I tend not to
                    read books that have awesome movies made from them,
                    regardless of how well or badly the movie represented the
                    actual written story.{" "}
                  </p>
                </li>
                <li className="agenda-item">
                  <p className="agenda-title">Bla-bla blablabla bla</p>
                  <p>
                    Although I'm not actually embarrassed by this, I tend not to
                    read books that have awesome movies made from them,
                    regardless of how well or badly the movie represented the
                    actual written story.{" "}
                  </p>
                </li>
                <li className="agenda-item">
                  <p className="agenda-title">Bla-bla blablabla bla</p>
                  <p>
                    Although I'm not actually embarrassed by this, I tend not to
                    read books that have awesome movies made from them,
                    regardless of how well or badly the movie represented the
                    actual written story.{" "}
                  </p>
                </li>
              </ol>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <span className="agenda">
              Notes/Questions{" "}
              <span>
                <EditIcon className="edit-icon" />
              </span>
            </span>{" "}
            Edit
            <Box bgcolor="#fff" borderRadius="6px" p={{ xs: 1, sm: 1, md: 1 }}>
              <Grid container item xs={12} className="notes-list">
                <Avatar
                  className="note-avtar"
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
                <span className="notes-text">
                  Bla-bla blablabla bla bla blabl blabla bla bla blablabla?
                </span>
              </Grid>
              <Grid container item xs={12} className="notes-list">
                <Avatar
                  className="note-avtar"
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
                <span className="notes-text">
                  Bla-bla blablabla bla bla blabl blabla bla bla blablabla?
                </span>
              </Grid>
              <Grid container item xs={12} className="notes-list">
                <Avatar
                  className="note-avtar"
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
                <span className="notes-text">
                  Bla-bla blablabla bla bla blabl blabla bla bla blablabla?
                </span>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
