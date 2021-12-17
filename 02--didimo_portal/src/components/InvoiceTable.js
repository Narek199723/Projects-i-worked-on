import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red, green, grey } from '@material-ui/core/colors';
import { formatDateTime } from '../components/Helpers/formaters';
import { v4 } from 'uuid';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  pendingInvoice: {
    color: red[500],
  },
  paidInvoice: {
    color: green[500],
  },
  canceledInvoice: {
    color: grey[500],
  },
});

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function InvoiceTable(props) {
  const classes = useStyles();
  const { onCancelOrder } = props;

  /*const handleBuyOnClick = e => {
    e.preventDefault();
    e.stopPropagation();
    props.onBuy(parseInt(e.currentTarget.getAttribute("data-id")));
    //alert(e.currentTarget.getAttribute("data-id"));
  };*/

  const rows = props.invoiceData;

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].status != 'paid') {
      rows[i].receipt_uri = null;
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Package
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Created at
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Value
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Status
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={v4()}>
              <TableCell component="th" scope="row">
                {row.product.name}
              </TableCell>
              <TableCell align="right">
                {formatDateTime(row.created_at)}
              </TableCell>
              <TableCell align="right">US${row.value.toFixed(2)}</TableCell>
              <TableCell
                align="right"
                className={
                  {
                    draft: classes.pendingInvoice,
                    draft: classes.pendingInvoice,
                    paid: classes.paidInvoice,
                    draft: classes.pendingInvoice,
                    voided: classes.canceledInvoice,
                  }[row.status]
                }
              >
                {
                  {
                    draft: 'Pending',
                    draft: 'Pending',
                    paid: 'Paid',
                    draft: 'Pending',
                    voided: 'Canceled',
                  }[row.status]
                }
              </TableCell>
              <TableCell align="right">
                {row.status === 'draft' && (
                  <Button
                    size="small"
                    color="primary"
                    href={`/billing#checkout=${row.uuid}`}
                  >
                    Checkout
                  </Button>
                )}{' '}
                <Button
                  size="small"
                  color="primary"
                  href={row.invoice_uri}
                  disabled={!row.invoice_uri}
                  style={{ fontWeight: '700' }}
                >
                  Get Invoice
                </Button>{' '}
                <Button
                  style={{ fontWeight: '700' }}
                  size="small"
                  color="primary"
                  href={row.receipt_uri}
                  disabled={!row.receipt_uri}
                >
                  Get Receipt
                </Button>{' '}
                {row.status == 'draft' && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => onCancelOrder(row.uuid)}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
