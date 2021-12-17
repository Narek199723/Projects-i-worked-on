import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Grid, Typography, Avatar
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import PropTypes from 'prop-types';
import { formatPoints, formatDate } from '../../Helpers/formaters';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  justifyContainer: {
    justifyContent: 'space-between'
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
    fontSize: '12px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  avatar: {
    backgroundColor: '#fff',
    height: 56,
    width: 56,
  },
  icon: {
    color: theme.palette.error.main,
    height: 32,
    width: 32,
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
  FontStyles: {
    fontWeight: '500',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  caption: {
    fontSize: '14px'
  }
}));

const GlobalBalance = (props) => {
  const {
    value, expiringNext, className, ...rest
  } = props;

  const classes = useStyles();
  return (
    <Card {...rest} className={(classes.root, className)}>
      <CardContent>
        <Grid container className={classes.justifyContainer}>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Balance
            </Typography>
            <Typography
              variant="h3"
              display="inline"
              className={classes.FontStyles}
            >
              {value ? formatPoints(value) : '0'}
            </Typography>
            <Typography className={classes.caption} display="inline">
              {' '}
              points
            </Typography>
            <Typography
              variant="caption"
              display="block"
              style={{ marginTop: '5px' }}
            >
              {expiringNext.balance > 0 && (
                <Typography
                  variant="caption"
                  display="block"
                  style={{ marginTop: '5px' }}
                >
                  (
                  {formatPoints(expiringNext.balance)}
                  {' '}
                  will expire on
                  {' '}
                  {formatDate(expiringNext.date)}
                  )
                </Typography>
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

GlobalBalance.propTypes = {
  className: PropTypes.string,
};

export default GlobalBalance;
