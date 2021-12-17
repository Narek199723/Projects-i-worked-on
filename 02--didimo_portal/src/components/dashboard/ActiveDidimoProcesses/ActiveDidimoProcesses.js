import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Grid, Typography, Avatar
} from '@material-ui/core';
import { ReactComponent as GearsIcon } from './gears.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
  },
  content: {
    width: '100%'
  },
  mainContainer: {
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 700,
    fontSize: '12px',
  },
  avatar: {
    backgroundColor: '#fff', // theme.palette.secondary.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  bronze: {
    color: '#a17419',
  },
  silver: {
    color: '#b7b7b7',
  },
  gold: {
    color: '#d5a500',
  },
  platinum: {
    color: '#e5e4e2',
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
  iconBox: {
    height: '56px',
  },
  caption: {
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif'
  }
}));

const ActiveDidimoProcesses = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Grid container className={classes.mainContainer}>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Currently executing
            </Typography>
            <Typography
              variant="h3"
              className={classes.value}
              display="inline"
              style={{ marginRight: '3px' }}
            >
              0.00
            </Typography>
            <Typography className={classes.caption} display="inline">
              points being used
            </Typography>
            <Typography
              variant="caption"
              display="block"
              style={{ marginTop: '5px' }}
            >
              0 actions executing
            </Typography>
          </Grid>
          <Grid item className={classes.iconBox}>
            <Avatar className={classes.avatar}>
              <GearsIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ActiveDidimoProcesses;
