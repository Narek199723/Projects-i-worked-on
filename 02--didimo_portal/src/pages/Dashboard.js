import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import GlobalBalance from '../components/dashboard/GlobalBalance/GlobalBalance';
import CurrentTier from '../components/dashboard/CurrentTier/CurrentTier';
import ActiveDidimoProcesses from '../components/dashboard/ActiveDidimoProcesses/ActiveDidimoProcesses';
import CreditHistory from '../components/dashboard/CreditHistory/CreditHistory';
import ActivePackages from '../components/dashboard/ActivePackages/ActivePackages';
import { GlobalContext } from 'src/context/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { isExpired } from 'react-jwt';
import { Auth } from 'aws-amplify';
import {setUserToken} from 'src/context/actions'

const Dashboard = () => {
  const navigate = useNavigate();
  const { state,dispatch } = useContext(GlobalContext);
  
  const [accountStatus, setAccountStatus] = useState();
  const [creditHistoryCurrentPage, setCreditHistoryCurrentPage] = useState(0);
  const [creditHistoryData, setCreditHistoryData] = useState([]);
  const [creditHistoryIsLoading, setCreditHistoryIsLoading] = useState(false);
  const [creditBalanceIsLoading, setCreditBalanceIsLoading] = useState(false);
  const [activePackagesIsLoading, setActivePackagesIsLoading] = useState(false);
  const [cleanup, setCleanup] = useState(true);
  const [activePackagesData, setActivePackagesData] = useState();
  const activePackagesCurrentPage = 0;

  const authCurrentSession = useCallback(async () => {
    try {
      const data = await Auth.currentSession();

      dispatch(setUserToken({
        accessToken: data.idToken.jwtToken
      }));
      
      fetchAccountStatusUUID();
      fetchTransactions(creditHistoryCurrentPage);
      fetchActivePackages(activePackagesCurrentPage);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //  Cleanup function which cleans up the useEffect when component renders
  useEffect(() => {
    if (cleanup) {
      authCurrentSession();
    }
    return () => setCleanup(false);
  }, []);

  const fetchAccountStatusUUID = () => {
    if (state.isAuth) {
      try {
        axios
          .get('accounts/' + state.user.accounts.uuid + '/status', {
            headers: { Authorization: `Bearer ${state.user.accessToken}` },
          })
          .then((res) => {
            setCreditBalanceIsLoading(false);
            setAccountStatus(res.data);
          });
      } catch (err) {
        console.log('fetchProfileUUID:', error);
      }
    } else {
      navigate(`${process.env.REACT_APP_ROOT_PATH}/login`);
    }
  };

  const fetchTransactions = (page) => {
    setCreditHistoryData(null);
    if (state.isAuth) {
      try {
        setCreditHistoryIsLoading(true);
        axios
          .get(
            'accounts/' +
              state.user.accounts.uuid +
              '/transactions?page_size=5' +
              '&page=' +
              parseInt(page + 1),
            {
              headers: { Authorization: `Bearer ${state.user.accessToken}` },
            }
          )
          .then((res) => {
            setCreditHistoryCurrentPage(page);
            setCreditHistoryIsLoading(false);
            setCreditHistoryData(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate(`${process.env.REACT_APP_ROOT_PATH}/login`);
    }
  };

  const fetchActivePackages = () => {
    if (state.isAuth) {
      try {
        setActivePackagesIsLoading(true);
        axios
          .get(
            'accounts/' + state.user.accounts.uuid + '/packages?status=active',
            {
              headers: { Authorization: `Bearer ${state.user.accessToken}` },
            }
          )
          .then((res) => {
            setActivePackagesIsLoading(false);
            setActivePackagesData(res.data.packages);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate(`${process.env.REACT_APP_ROOT_PATH}/login`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Didimo</title>
      </Helmet>
      {!creditBalanceIsLoading &&
      !activePackagesIsLoading &&
      !creditHistoryIsLoading ? (
        <Box
          sx={{
            backgroundColor: 'transparent',
            minHeight: '100%',
            py: 3,
            display: 'flex',
          }}
        >
          <Container maxWidth={false}>
            <Grid container justify="left" spacing={2}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <GlobalBalance
                  value={accountStatus?.balance}
                  expiringNext={{
                    date: accountStatus?.next_expiration_date,
                    balance: accountStatus?.next_expiration_points,
                  }}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <CurrentTier
                  code={accountStatus?.tier.code}
                  name={accountStatus?.tier.name}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ActiveDidimoProcesses
                  activeProcesses={'0'}
                  lockedPoints={accountStatus?.running_operations_locks}
                  executingActionsCount={accountStatus?.running_operations}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="stretch" direction="row">
              <Grid item xs={12} sm={8}>
                <CreditHistory
                  onPageChange={(event, page) => {
                    fetchTransactions(page);
                  }}
                  creditHistoryData={creditHistoryData}
                  page={creditHistoryCurrentPage}
                  maxRowsPerPage={5}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ActivePackages
                  activePackagesData={activePackagesData}
                  activePackagesCurrentPage={activePackagesCurrentPage}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <div style={{ position: 'relative' }}>
          <div style={{ height: 'calc(100vh - 169px)' }}>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => 0 }}
              open={
                creditBalanceIsLoading ||
                activePackagesIsLoading ||
                creditHistoryIsLoading
              }
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
