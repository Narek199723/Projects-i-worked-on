import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Typography,
  TableFooter,
  TablePagination,
  CardHeader,
  Card,
  CardContent,
  Grid,
  Box,
  Container,
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {
  formatPoints,
  formatDateTime,
} from '../../components/Helpers/formaters';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TablePaginationActions from '../../components/Transactions/TablePaginationActions';
import GlobalBalance from '../../components/dashboard/GlobalBalance/GlobalBalance';
import ActiveDidimoProcesses from '../../components/dashboard/ActiveDidimoProcesses/ActiveDidimoProcesses';
import { GlobalContext } from 'src/context/store';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  applicationDetail: {
    flexDirection: 'column',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transactions = () => {
  const { state } = useContext(GlobalContext);
  const classes = useStyles();
  const [creditHistoryCurrentPage, setCreditHistoryCurrentPage] = useState(0);
  const [creditHistoryLoaded, setCreditHistoryLoaded] = useState(false);
  const [creditHistoryData, setCreditHistoryData] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  const [creditBalance, setCreditBalance] = useState({});

  useEffect(() => {
    fetchTransactions(creditHistoryCurrentPage);
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    if (state.isAuth) {
      const URL = 'accounts/' + state.user.accounts?.uuid + '/status';

      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${state.user.accessToken}`,
        },
      });
      setCreditBalance(response.data);
    }
  };

  const fetchTransactions = async (page) => {
    const URL =
      'accounts/' +
      state.user.accounts?.uuid +
      '/transactions?page_size=50&page=' +
      parseInt(page + 1);

    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${state.user.accessToken}`,
      },
    });

    let finalRows = response.data.transactions;

    setCreditHistoryLoaded(true);
    setCreditHistoryData(finalRows);
    setTransactionCount(response.data.total_size);
  };

  let pageContents = [];
  const noDataArea = {
      textAlign: 'center',
    },
    noDataText = {
      fontWeight: 'bold',
      fontSize: 20,
    };

  if (creditHistoryLoaded) {
    if (creditHistoryData?.length === 0) {
      pageContents = (
        <React.Fragment>
          <div style={noDataArea}>
            <ShoppingBasketIcon style={{ fontSize: 200 }} />
            <p style={noDataText}>There are no transactions on this account.</p>
          </div>
        </React.Fragment>
      );
    } else {
      pageContents = (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Generated at</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {creditHistoryData &&
                  creditHistoryData.map((row, index, arr) => (
                    <TableRow
                      key={row.name}
                      style={{
                        visibility: row.name === null ? 'hidden' : 'visible',
                      }}
                    >
                      {(row.name === null && (
                        <TableCell colSpan="5">No value</TableCell>
                      )) || (
                        <React.Fragment>
                          <TableCell
                            align="left"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            {row.value < 0 ? (
                              <React.Fragment>
                                <Tooltip title="Debit" aria-label="debit">
                                  <ArrowDownwardIcon
                                    style={{
                                      color: 'red',
                                      display: 'inline-block',
                                      verticalAlign: 'middle',
                                    }}
                                  />
                                </Tooltip>
                                <Typography variant="srOnly">Debit</Typography>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <Tooltip title="Credit" aria-label="credit">
                                  <ArrowUpwardIcon
                                    style={{
                                      color: 'green',
                                      display: 'inline-block',
                                      verticalAlign: 'middle',
                                    }}
                                  />
                                </Tooltip>
                                <Typography variant="srOnly">Credit</Typography>
                              </React.Fragment>
                            )}
                            <Typography
                              variant="p"
                              style={{
                                display: 'inline-block',
                                verticalAlign: 'middle',
                              }}
                            >
                              {formatPoints(Math.abs(row.value))}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {formatDateTime(row.created_at)}
                          </TableCell>
                          <TableCell align="right">{row.description}</TableCell>
                          <TableCell align="right">
                            {formatPoints(row.balance)}
                          </TableCell>
                        </React.Fragment>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[]}
                    colSpan={5}
                    count={transactionCount}
                    rowsPerPage={50}
                    labelDisplayedRows={({ from, to, count }) => {
                      return `${from}-${to === -1 ? count : to}`;
                    }}
                    page={creditHistoryCurrentPage}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={(event, page) => {
                      fetchTransactions(page).then(() =>
                        setCreditHistoryCurrentPage(page)
                      );
                    }}
                    //onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      );

      pageContents = <div>{pageContents}</div>;
    }
  } else {
    pageContents = '';
  }

  return (
    <>
      <Helmet>
        <title>Transactions | Didimo</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'transparent',
          minHeight: '100%',
          py: 3,
          display: 'flex',
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item container justify="left" spacing={2}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <GlobalBalance
                  value={creditBalance.balance}
                  expiringNext={{
                    date: creditBalance.next_expiration_date,
                    balance: creditBalance.next_expiration_points,
                  }}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ActiveDidimoProcesses
                  activeProcesses={'0'}
                  lockedPoints={creditBalance.running_operations_locks}
                  executingActionsCount={creditBalance.running_operations}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  className={classes.heading}
                  title={`Transactions${
                    transactionCount ? ' (' + transactionCount + ')' : ''
                  }`}
                />
                <CardContent>{pageContents}</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Transactions;
