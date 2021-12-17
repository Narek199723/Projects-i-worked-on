import React from 'react';
import {
  Container,
  Grid,
  Button,
  Hidden,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import slash from '../../Images/splash_page.png';
import Box from '@mui/material/Box';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome_content">
      <Container maxWidth="sm" className="container_main">
        <Box />
        <Grid
          style={{
            padding: '3rem',
            fontWeight: 500,
          }}
        >
          <p
            className="main_title"
            style={{
              fontSize: '4rem',
              lineHeight: '4rem',
              fontWeight: 700,
              marginTop: 0,
              marginBottom: 0,
              color: '#2A0651',
              fontFamily: 'sans-serif',
            }}
          >
            Welcome
          </p>
          <p
            className="sub_title"
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginTop: 0,
              marginBottom: 0,
              color: '#2A0651',
              fontFamily: 'sans-serif',
            }}
          >
            to the Didimo Customer Portal
          </p>
        </Grid>
        <Grid container>
          <Grid
            container
            className="content"
            item
            xs={12}
            lg={8}
            padding={5}
            style={{
              minHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 3rem',
              fontWeight: 500,
              fontFamily: 'sans-serif',
            }}
          >
            <Grid
              item
              style={{
                fontSize: '1.2rem',
              }}
            >
              <p>
                We are excited to help you achieve your vision for high-fidelity
                user-specific digital humans.
              </p>
              <p>Via this portal, you can manage your account, including:</p>
              <ul
                className="list_details"
                style={{
                  marginTop: '1.5rem',
                  marginBottom: '3rem',
                  paddingInlineStart: '5rem',
                }}
              >
                <li style={{ lineHeight: '2rem' }}>
                  Update your account settings
                </li>
                <li style={{ lineHeight: '2rem' }}>
                  Review, manage and download your didimos
                </li>
                <li style={{ lineHeight: '2rem' }}>
                  Manage your applications and API keys
                </li>
                <li style={{ lineHeight: '2rem' }}>
                  Access the Didimo trial package
                </li>
                <li style={{ lineHeight: '2rem' }}>
                  Purchase or renew Access Packages
                </li>
                <li style={{ lineHeight: '2rem' }}>
                  Review your transactions &amp; orders
                </li>
              </ul>
              <p>
                For question or technical support regarding anything in this
                portal, please contact Didimo Support at:{' '}
                <a href="mailto:support@didimo.co">support@didimo.co</a>
              </p>
            </Grid>
          </Grid>

          <Hidden lgDown>
            <Grid item xs={12} lg={4}>
              <Container>
                <img
                  alt="Welcome"
                  src={slash}
                  style={{
                    maxWidth: '100%',
                  }}
                />
              </Container>
            </Grid>
          </Hidden>
        </Grid>
        <Grid
          className="check_bar"
          item
          container
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'right',
          }}
        >
          <Grid item xs={12}>
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label="Do not show this screen on login"
              labelPlacement="end"
            />
            <Button color="primary" variant="contained">
              Go to dashboard
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Welcome;
