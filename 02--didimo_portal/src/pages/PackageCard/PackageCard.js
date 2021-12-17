import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TierIcon from '../../components/TierIcon';
import { formatCurrency, formatPoints } from '../../helpers/formaters';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '900px',
    padding: theme.spacing(3),
    margin: '10px 0',
  },
  media: {
    height: 140,
  },
  icon: {
    height: 80,
    width: 80,
    objectFit: 'scale-down',
  },
  trial: {
    backgroundColor: theme.packages.trial.mainColor,
  },
  Trial: {
    backgroundColor: theme.packages.trial.mainColor,
  },
  Basic: {
    backgroundColor: theme.packages.basic.mainColor,
  },
  basic: {
    backgroundColor: theme.packages.basic.mainColor,
  },
  Starter: {
    backgroundColor: theme.packages.basic.mainColor,
  },
  starter: {
    backgroundColor: theme.packages.basic.mainColor,
  },
  Advanced: {
    backgroundColor: theme.packages.advanced.mainColor,
  },
  advanced: {
    backgroundColor: theme.packages.advanced.mainColor,
  },
  Pro: {
    backgroundColor: theme.packages.pro.mainColor,
  },
  pro: {
    backgroundColor: theme.packages.pro.mainColor,
  },
  Enterprise: {
    backgroundColor: theme.packages.enterprise.mainColor,
  },
  enterprise: {
    backgroundColor: theme.packages.enterprise.mainColor,
  },
}));

export default function PackageCard(props) {
  
  const classes = useStyles();

  const handleBuyOnClick = (e) => {
    // e.stopPropagation();
    e.preventDefault();
    props.onBuy(e.currentTarget.getAttribute('data-id'));
  };

  const redirectToContactPage = () => {
    window.open('https://www.didimo.co/contact', '_blank');
  };

  return (
    <Card
      className={`${classes.root} ${classes[props.tierCode]} ${props.classes}`}
    >
      <Grid
        container
        display="flex"
        style={{ justifyContent: 'flex-end' }}
        spacing={2}
      >
        <Grid
          item
          container
          justify="center"
          style={{ width: '80px', paddingTop: '5%' }}
          //flexGrow={1}
        >
          <TierIcon tierCode={props.title} className={classes.icon} />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-end"
          style={{
            paddingLeft: '3%',
            flexGrow: '1',
            flexShrink: '1',
            flexBasis: '220px',
            //width: "auto",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginTop: '5%',
            }}
          >
            <Typography gutterBottom variant="h3" style={{ fontSize: '22px' }}>
              {props.title}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{
              display: 'flex',
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '5%',
            }}
          >
            {props.points > 0 && (
              <Grid item>
                <Typography
                  variant="h4"
                  style={{
                    textAlign: 'center',
                    display: 'inline-block',
                    fontSize: '18px',
                  }}
                >
                  {formatPoints(props.points, 0)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'center',
                    display: 'inline-block',
                    marginLeft: '5px',
                  }}
                >
                  points
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          item
          style={{ width: 'auto', gap: '1rem', marginTop: '3%' }}
        >
          {props.price > 0 && (
            <Grid item style={{}}>
              <Typography
                variant="h3"
                style={{
                  textAlign: 'center',
                  fontSize: '16px',
                }}
              >
                {formatCurrency(props.price, 0)}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  textAlign: 'center',
                }}
              >
                plus taxes
              </Typography>
            </Grid>
          )}
          <Grid
            item
            container
            justify="center"
            direction="row"
            style={{
              /*minWidth: "230px",*/
              width: '120px',
              alignItems: 'start',
              gap: '2rem',
            }}
          >
            {(props.price > 0 && (
              <>
                <Grid
                  item
                  sx={{ alignItems: 'start' }}
                  style={{ textAlign: 'center' }}
                >
                  <Button
                    data-id={props.productId}
                    size="medium"
                    color="secondary"
                    variant="contained"
                    onClick={handleBuyOnClick}
                    disabled={props.isBuying}
                    //ref={focusButton}
                  >
                    Buy
                  </Button>
                </Grid>
              </>
            )) ||
              (props.title.toLowerCase() === 'trial' && (
                <Grid
                  item
                  direction="column"
                  xs={6}
                  style={{
                    textAlign: 'center',
                    alignItems: 'flex-end',
                    marginLeft: 'auto',
                  }}
                >
                  <Button
                    data-id={props.productId}
                    size="medium"
                    color="secondary"
                    variant="contained"
                    onClick={(e) => {
                      this.setState({ contactUsOpen: true });
                    }}
                  >
                    Register
                  </Button>
                </Grid>
              )) || (
                <Grid
                  item
                  direction="column"
                  style={{
                    textAlign: 'center',
                    alignItems: 'flex-end',
                    //marginLeft: "auto",
                  }}
                >
                  <Button
                    data-id={props.productId}
                    size="medium"
                    color="primary"
                    variant="outlined"
                    onClick={redirectToContactPage}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    Talk to us
                  </Button>
                </Grid>
              )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
