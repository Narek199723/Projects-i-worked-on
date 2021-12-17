import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
  ListItemAvatar,
  ListItemText,
  Avatar,
  CircularProgress,
  ListItemSecondaryAction,
  Divider,
  Container,
} from '@material-ui/core';
import TierIcon from '../../components/TierIcon';
import PackageCard from '../PackageCard/PackageCard';
import CurrentLinearProgress from '../../components/packages/CurrentLinearProgress';
import { formatPoints, formatDateTime } from '../../helpers/formaters';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    logo: {
      height: 64,
      width: 64,
      objectFit: 'scale-down',
    },
    topMenu: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },

    MobileShowcase: {
      backgroundColor: theme.packages.trial.mainColor,
    },
    trial: {
      backgroundColor: theme.packages.trial.mainColor,
    },
    basic: {
      backgroundColor: theme.packages.basic.mainColor,
    },
    starter: {
      backgroundColor: theme.packages.basic.mainColor,
    },
    advanced: {
      backgroundColor: theme.packages.advanced.mainColor,
    },
    pro: {
      backgroundColor: theme.packages.pro.mainColor,
    },
    enterprise: {
      backgroundColor: theme.packages.enterprise.mainColor,
    },
  };
});

export default function PackageTable({
  bucketData: rows,
  products,
  currentTier,
  className,
  onBuy,
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        alignItems="stretch"
        alignContent="stretch"
        justify="space-evenly"
      >
        <Grid item xs={12}>
          <Card className={className}>
            <CardHeader
              action={
                <Button
                  href="/packages/details"
                  size="small"
                  variant="outlined"
                >
                  Details
                </Button>
              }
              title="Available packages"
            />
            <CardContent>
              <Grid container spacing={2} direction="row" alignItems="center">
                {products
                  .filter((product) => product.price > 0)
                  .map((product) => (
                    <React.Fragment key={product.uuid}>
                      <Grid item xs>
                        <PackageCard
                          title={product.name}
                          tierCode={product.name}
                          productId={product.uuid}
                          isBuyable={true}
                          price={product.price}
                          points={product.credits}
                          onBuy={onBuy}
                          description={product.shortDescription}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card>
            <CardContent
              className={classes[currentTier.tier && currentTier.tier.code]}
            >
              <Typography
                variant="h5"
                style={{
                  textAlign: 'center',
                }}
              >
                Your current tier level is{' '}
                <strong>{currentTier.tier && currentTier.tier.name}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={className}>
            <CardHeader title="Active packages" />
            <CardContent>
              {rows.packages.map((packageItem, index) => (
                <React.Fragment key={packageItem.product.uuid}>
                  {index > 0 && <Divider />}
                  <Grid container style={{ margin: '10px 0' }}>
                    <Grid item>
                      <TierIcon
                        tierCode={packageItem.product.name}
                        className={classes.logo}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={8}
                      direction="column"
                      justify="space-between"
                      container
                      style={{
                        flexGrow: 1,
                        width: 'auto',
                        marginRight: '15px',
                      }}
                    >
                      <Grid container justify="space-between" item>
                        <Grid item>
                          <Typography variant="h3" component="h2">
                            {packageItem.product.name}
                          </Typography>
                          <Typography variant="body2">
                            subscribed on{' '}
                            {formatDateTime(packageItem.created_at)}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {packageItem.expiresOn && (
                            <Typography variant="body2">
                              expires on{' '}
                              {formatDateTime(packageItem.expires_at)}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item>
                        <CurrentLinearProgress
                          value={
                            (packageItem.balance / packageItem.initial_value) *
                            100
                          }
                          variant="determinate"
                          style={{ marginBottom: '5px' }}
                          activePackage={packageItem}
                        />
                      </Grid>
                    </Grid>
                    <Grid item style={{ marginLeft: 'auto', minWidth: '5em' }}>
                      <Typography variant="h4" align="right">
                        {formatPoints(packageItem.balance)}
                      </Typography>
                      <Typography variant="body2" align="right">
                        points left
                      </Typography>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
