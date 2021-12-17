import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import TierIcon from '../../../components/TierIcon';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    content: {
      alignItems: 'center',
      display: 'flex',
    },
    title: {
      fontWeight: 700,
    },
    value: {},
    avatar: {
      backgroundColor: '#fff',
      borderColor: theme.palette.primary.main,
      height: 54,
      width: 54,
    },
    icon: {
      height: 55,
      width: 55,
      objectFit: 'scale-down',
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
    trial: {
      backgroundColor: 'rgb(219,221,223)',
    },
    basic: {
      backgroundColor: 'rgb(241, 237, 217)',
    },
    starter: {
      backgroundColor: 'rgb(241, 237, 217)',
    },
    advanced: {
      backgroundColor: 'rgb(224, 219, 194)',
    },
    pro: {
      backgroundColor: `rgb(198, 193, 168)`,
    },
    enterprise: {
      backgroundColor: `rgb(187, 176, 199)`,
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
  })
);

const CurrentTier = (props) => {
  const { code, name, className, ...rest } = props;

  const classes = useStyles();
  const iconClass = code
    ? {
        pro: classes.pro,
        indie: classes.indie,
        indieplus: classes.indieplus,
        enterprise: classes.enterprise,
        free: classes.trial,
      }[code]
    : classes.trial;

  return (
    <Card
      {...rest}
      className={clsx(
        classes.root,
        className,
        classes[code ? code.toLowerCase() : 'trial']
      )}
    >
      <CardContent>
        {(name && (
          <Grid container style={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Current Tier
              </Typography>
              <Typography variant="h3" className={classes.value}>
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar} classes={iconClass}>
                <TierIcon tierCode={code} className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
        )) || <React.Fragment />}
        <div className={classes.difference} />
      </CardContent>
    </Card>
  );
};

CurrentTier.propTypes = {
  className: PropTypes.string,
};

export default CurrentTier;
