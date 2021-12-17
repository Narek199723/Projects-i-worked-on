import React from 'react';
import {Card, CardHeader} from "@material-ui/core";
import CreditHistoryTable from './CreditHistoryTable'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '16px',
    padding: '8px'
  },
  title: {
    padding: '16px',
    fontSize: '20px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500
  }
}));

const CreditHistory = (props) => {
  const {
    onPageChange,
    creditHistoryData,
    maxRowsPerPage,
    page,
  } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <h5 className={classes.title}>Transactions report</h5>
      <CreditHistoryTable
        onPageChange={onPageChange}
        creditHistoryData={creditHistoryData}
        page={page}
        maxRowsPerPage={maxRowsPerPage}
      />
    </Card>
  );
};


export default CreditHistory;
