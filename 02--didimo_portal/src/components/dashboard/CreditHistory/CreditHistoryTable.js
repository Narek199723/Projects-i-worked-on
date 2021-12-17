import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import { v4 } from 'uuid';
import {
  formatPoints,
  formatDateTime,
} from '../../../components/Helpers/formaters';
import TablePaginationActions from '../../Transactions/TablePaginationActions';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    width: '15%',
  },
  debitIcon: {
    color: 'red',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  creditIcon: {
    color: 'green',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  CreditPoients: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}));

export default function CreditHistoryTable(props) {
  const [creditRows, setCreditRows] = useState([]);
  const [transactionCount, setTransactionCount] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    let rows = props.creditHistoryData?.transactions || [];
    if (rows.length < props.maxRowsPerPage) {
      const addRowNumber = props.maxRowsPerPage - rows.length;
      for (let i = 0; i < addRowNumber; i++) {
        rows.push({
          name: null,
          value: null,
          createdAt: null,
          balance: null,
          description: null,
        });
      }
    }
    setCreditRows(rows);
    setTransactionCount(props.creditHistoryData?.total_size);
  }, [props.creditHistoryData, props.maxRowsPerPage]);

  return (
    <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead style={{ backgroundColor: '#eeeeee' }}>
          <TableRow key={'tableCellData'}>
            <TableCell align="left" key={'1'}>
              Value
            </TableCell>
            <TableCell align="left" key={'2'}>
              Generated at
            </TableCell>
            <TableCell align="left" key={'3'}>
              Description
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {creditRows.map((row, index, arr) =>
            row.description === null ? null : (
              <TableRow key={v4()}>
                {/* //THis should change in a future version{' '} */}
                {(row.description == null && (
                  <TableCell colSpan="5">No value</TableCell>
                )) || (
                  <React.Fragment>
                    <TableCell
                      align="left"
                      key={`key~${row.value}`}
                      className={classes.tableCell}
                    >
                      {row.value < 0 ? (
                        <React.Fragment>
                          <Tooltip title="Debit" aria-label="debit">
                            <ArrowDownwardIcon className={classes.debitIcon} />
                          </Tooltip>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Tooltip title="Credit" aria-label="credit">
                            <ArrowUpwardIcon className={classes.creditIcon} />
                          </Tooltip>
                        </React.Fragment>
                      )}
                      <Typography variant="p" className={classes.CreditPoients}>
                        {formatPoints(Math.abs(row.value))}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      key={`key~${row.created_at}`}
                      style={{ width: '25%' }}
                    >
                      {formatDateTime(row.created_at)}
                    </TableCell>
                    <TableCell
                      align="left"
                      key={`key~${row.description}`}
                      style={{ width: '50%' }}
                    >
                      {row.description}
                    </TableCell>
                  </React.Fragment>
                )}
              </TableRow>
            )
          )}
        </TableBody>
        <TableFooter>
          <TableRow key={props.page}>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={5}
              count={transactionCount ? transactionCount : 0}
              rowsPerPage={5}
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}-${to === -1 ? count : to}`;
              }}
              page={props.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={props.onPageChange}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
