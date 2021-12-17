import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  CardHeader,
  Button,
  List,
  ListItem,
} from '@material-ui/core';
import CurrentLinearProgress from '../../packages/CurrentLinearProgress';
import { formatDate, formatPoints } from '../../Helpers/formaters';
import './ActivePackages.css';
import { v4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '16px',
    height: 'calc(100% - 16px)',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  value: {
    textTransform: 'uppercase',
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 62,
    width: 62,
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
  productName: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '16px',
    width: '50%',
  },
  buyBtnDesign: {
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#5bed96',
    padding: '4px 10px',
    fontSize: '0.8125rem',
    textTransform: 'capitalize',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
}));

const ActivePackages = (props) => {
  const navigate = useNavigate();
  const { activePackagesData } = props;
  const classes = useStyles();
  const HandleBuyBtn = () => {
    navigate('/v2/welcome', { replace: true });
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={'mainHeaderPackage'}
        action={
          <Button
            color="secondary"
            size="small"
            variant="contained"
            className={classes.buyBtnDesign}
            onClick={HandleBuyBtn}
          >
            Buy
          </Button>
        }
        title="Active packages"
      />
      <CardContent className={'ActivePackageContent'}>
        <List className={classes.root}>
          {activePackagesData?.map((activePackage) => (
            <ListItem key={v4()} className={'TrailPackage'}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  direction="column"
                  justify="space-between"
                  container
                >
                  <Grid container item>
                    <Grid
                      item
                      xs={3}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '50px',
                      }}
                    >
                      <Typography variant="h5" className={classes.productName}>
                        {activePackage.product.name}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      alignContent="left"
                      style={{
                        marginRight: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        width: '50%',
                      }}
                    >
                      {activePackage.expires_at && (
                        <Typography
                          variant="caption"
                          style={{
                            backgroundColor: 'rgba(42,6,81,0.1)',
                            borderRadius: '15px',
                            padding: '0.3em 0.5em',
                          }}
                        >
                          expires on {formatDate(activePackage.expires_at)}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="h4"
                        align="right"
                        style={{ display: 'inline-block' }}
                      >
                        {formatPoints(activePackage.balance)}
                      </Typography>
                      <Typography
                        variant="body2"
                        align="right"
                        style={{ display: 'inline-block', marginLeft: '0.5em' }}
                      >
                        points left
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs style={{ marginTop: '0.8em' }}>
                    <CurrentLinearProgress
                      value={
                        (activePackage.balance / activePackage.initial_value) *
                        100
                      }
                      variant="determinate"
                      style={{ marginBottom: '5px' }}
                      activePackage={activePackage}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Button
          href="/packages"
          size="small"
          color="primary"
          style={{ marginLeft: 'auto', textTransform: 'capitalize' }}
          variant="outlined"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivePackages;
