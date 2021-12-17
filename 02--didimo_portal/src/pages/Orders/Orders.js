import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Helmet } from 'react-helmet';
import {
  Backdrop,
  Card,
  CircularProgress,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import InvoiceTable from '../../components/InvoiceTable';
import SuccessSnack from '../../components/SuccessSnack';
import appConfig from '../../components/AppConfig';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import queryString from 'query-string';
import CheckoutDialog from './CheckoutDialog';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ErrorSnack from '../../components/ErrorSnack';
import ConfirmDialog from '../../components/ConfirmDialog';
import { GlobalContext } from 'src/context/store';
const noDataArea = {
    textAlign: 'c   enter',
  },
  noDataText = {
    fontWeight: 'bold',
    fontSize: 20,
  };
const styles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});
const stripePromise = loadStripe(process.env.REACT_APP_STRIPEPUBLISHABLEKEY);

const Orders = (props) => {
  const { state } = useContext(GlobalContext);
  const [checkoutClientSecret, setCheckoutClientSecret] = useState(null);
  const [invoicesLoaded, setInvoicesLoaded] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState({
    open: false,
    message: '',
  });
  const [checkoutOrder, setCheckoutOrder] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState({
    open: false,
    message: '',
  });
  const [invoiceCanceled, setInvoiceCanceled] = useState('');
  const [cancelOrder, setCancelOrder] = useState({});
  const [cancelingOrder, setCancelingOrder] = useState(false);

  let ordersRefresher = null;

  const setOrderRefresher = () =>
    (ordersRefresher = setInterval(() => {
      loadOrders(true);
    }, 3000));

  const loadOrders = useCallback(async (silently) => {
    setInvoicesLoaded(silently);
    const invoiceStates = {
      0: 'pending',
      1: 'pending',
      2: 'paid',
      3: 'pending',
      4: 'canceled',
    };

    let URL = 'accounts/' + state.user.accounts?.uuid + '/orders';
    try {
      const { data } = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${state.user.accessToken}`,
        },
      });
      setInvoicesLoaded(true);
      setInvoiceData(data);
      console.log(data, 'GETTING DATA');

      // const pendingFromResponse = data
      //   ? data.filter((inv) => invoiceStates[inv.status] === 'pending')
      //   : [];
      // setProfileData({
      //   ...profile,
      //   ...{ pendingInvoices: pendingFromResponse },
      // });
      if (
        !data ||
        (data.some((item) => item.status !== 2) && !ordersRefresher)
      ) {
        setOrderRefresher();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleHashChange = async (e) => {
    let checkoutId = queryString.parse(location.hash).checkout;
    if (checkoutId) {
      let credentials = session.credentials;
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ROOT}services/payments/stripe/InvoicesDetails/${checkoutId}`,
        {
          headers: {
            Authorization: `Bearer ${credentials.accessToken}`,
          },
        }
      );
      console.log(data, 'HANDLEHASCHANGE');

      setCheckoutClientSecret(data.paymentClientSecret);
      setCheckoutOpen(true);
      setCheckoutOrder(checkoutId);
    } else {
      setCheckoutClientSecret({ checkoutOpen: false, checkoutOrder: null });
    }
  };
  const addToHash = (values) => {
    let hashItems = queryString.parse(location.hash);
    Object.keys(values).forEach((key) => (hashItems[key] = values[key]));
    return queryString.stringify(hashItems);
  };

  const removeFromHash = (keys) => {
    let hashItems = queryString.parse(location.hash);
    const removableKeys = Array.isArray(keys) ? keys : [keys];

    removableKeys.map((key) => delete hashItems[key]);

    return queryString.stringify(hashItems);
  };

  const handleCheckoutClose = () => {
    setTimeout(() => {
      history.push(`#${removeFromHash('checkout')}`);
    }, 100);
  };
  const routeToCheckout = (orderId) => {
    setTimeout(() => {
      history.push(`#${addToHash({ checkout: orderId })}`);
    }, 100);
  };

  let pageContents;
  if (invoicesLoaded) {
    if (invoiceData.length === 0) {
      pageContents = (
        <Fragment>
          <div style={noDataArea}>
            <AttachMoneyIcon style={{ fontSize: 200 }} />
            <p style={noDataText}>There are no orders!</p>
          </div>
        </Fragment>
      );
    } else {
      pageContents = (
        <Card sx={{ margin: 2 }}>
          <CardHeader title="Orders" />
          <CardContent>
            <InvoiceTable
              invoiceData={invoiceData}
              onCancelOrder={(orderId) => {
                setCancelOrder({ id: orderId });
              }}
            />
          </CardContent>
        </Card>
      );
    }
  }
  useEffect(() => {
    loadOrders().then(() => handleHashChange());
    return () => {
      if (ordersRefresher) {
        clearInterval(ordersRefresher);
        console.log(cancelOrder, 'THIS IS CANCELORDER');
      }
    };
  }, []);

  return (
    <Fragment>
      <Elements stripe={stripePromise} options={{ locale: 'en_US' }}>
        {pageContents}
        <CheckoutDialog
          open={checkoutOpen}
          onClose={handleCheckoutClose}
          orderId={checkoutOrder}
          checkoutClientSecret={checkoutClientSecret}
          ordersData={invoiceData}
          onCheckoutSuccess={(order) => {
            removeFromHash('checkout');
            handleCheckoutClose();
            setPaymentSuccessMessage({ open: true });
          }}
          onCheckoutError={(error) =>
            setPaymentErrorMessage({ open: true, message: error.message })
          }
        />
        <ConfirmDialog
          // open={cancelOrder.id}
          open={false}
          title={'Delete didimos'}
          message={
            <Typography style={{ color: 'red' }}>
              This action will cancel your order. Do you want to continue?
            </Typography>
          }
          continueEnabled={!cancelingOrder}
          onClose={() => {
            setCancelOrder({});
            setCancelingOrder(false);
          }}
          onContinue={(item) => {
            setCancelingOrder(true);
            postData(
              `${process.env.REACT_APP_API_ROOT}services/payments/stripe/CancelOrder`,
              { order_id: cancelOrder.id },
              session
            ).then((response) => {
              setCancelOrder({});
              setCancelingOrder(false);
              setInvoiceCanceled(
                'Invoice canceling request succeeded. The status should be updated soon.'
              );
            });
          }}
          onCancel={() => {
            setCancelOrder({});
            setCancelingOrder(false);
          }}
        />
      </Elements>
      <ErrorSnack
        open={paymentErrorMessage.open}
        onClose={(e) => {
          setPaymentErrorMessage({ open: false, message: '' });
        }}
        message={paymentErrorMessage.message}
      ></ErrorSnack>
      <SuccessSnack
        open={paymentSuccessMessage.open}
        onClose={(e) => {
          setPaymentSuccessMessage({ open: false, message: '' });
        }}
        message={
          'Your payment is beeing processed. Your new package will be available soon!'
        }
      ></SuccessSnack>
      <SuccessSnack
        open={invoiceCanceled}
        onClose={(e) => {
          setInvoiceCanceled('');
        }}
        message={invoiceCanceled}
      ></SuccessSnack>
      <Backdrop open={!invoicesLoaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
};
export default Orders;
