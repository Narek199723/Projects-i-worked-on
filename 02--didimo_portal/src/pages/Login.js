import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import * as Yup from 'yup';
import {Formik} from 'formik';
import React, {useState, useContext} from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Alert
} from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';
import AppleIcon from '../icons/Apple';

import Amplify, {Auth, Hub} from 'aws-amplify';
import {saveLoginUserData} from 'src/context/actions'
import {GlobalContext} from 'src/context/store';
import axios from 'axios'
import {CircularProgress} from "@mui/material";

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID,
    mandatorySignIn: true,
    storage: localStorage,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'testing-auth.didimo.co',
      scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn:  process.env.REACT_APP_AWS_REDIRECT_SIGNIN ,
      redirectSignOut: process.env.REACT_APP_AWS_REDIRECT_SIGNOUT ,
      responseType: 'code'
    }
  }
});

const Login = () => {
  const navigate = useNavigate();
  const {state} = useContext(GlobalContext);
  const {dispatch} = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [isAuthentiacted, setIsAuthenticated] = useState(false)

  async function signIn(values) {
    setIsAuthenticated(true);
    try {
      const user = await Auth.signIn(values.email, values.password);
      if (user) {
        Auth.currentSession().then(data => {
          const decodeTokens = JSON.parse(atob(data.getIdToken().jwtToken.split('.')[1]))
          axios.get('profiles/' + decodeTokens['custom:didimo_profile_uuid'], {
            headers: {Authorization: `Bearer ${data.accessToken.jwtToken}`}
          }).then((res) => {
            dispatch(saveLoginUserData({
              accessToken: user.signInUserSession.accessToken.jwtToken,
              email: res.data.email_address,
              family_name: res.data.family_name,
              given_name: res.data.given_name,
              accounts: res.data.accounts[0],
              uuid: res.data.uuid,
            }));
            navigate(`${process.env.REACT_APP_ROOT_PATH}/dashboard`, { replace: true });
          });
        });
      }

    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | Didimo</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'david.price@didimo.co',
              password: 'Password!123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={signIn}
          >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
              <form onSubmit={handleSubmit}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <Box sx={{mb: 3, mt: 2}}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={4}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon/>}
                      // onClick={handleSubmit}
                      size="large"
                      variant="contained"
                      onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}
                    >
                      Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon/>}
                      // onClick={handleSubmit}
                      size="large"
                      variant="contained"
                      onClick={() => Auth.federatedSignIn({provider: 'Google'})}
                    >
                      Google
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={4}
                  >
                    <Button
                      fullWidth
                      startIcon={<AppleIcon/>}                      
                      size="large"
                      variant="contained"
                      onClick={() => Auth.federatedSignIn({provider: 'Apple'})}
                    >
                      Apple
                    </Button>
                  </Grid>

                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>


                  {error && <Alert severity="error">{error.message}</Alert>}

                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{py: 2}} className={'SpinnerContainer'}>
                  <Button
                    color="primary"
                    disabled={isAuthentiacted}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {
                      isAuthentiacted
                        ? <CircularProgress/>
                        : <span>Sign in now</span>
                    }
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link component={RouterLink} to="/register" variant="h6" underline="hover">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;