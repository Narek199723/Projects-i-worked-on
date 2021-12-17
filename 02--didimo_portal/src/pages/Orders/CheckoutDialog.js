import React, { useState /*{ useState }*/ } from "react";
import PropTypes from "prop-types";
import { /*makeStyles,*/ useTheme } from "@material-ui/styles";
//import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import {
  //Grid,
  //Divider,
  Button,
  //Modal,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  //DialogContentText,
  Grid,
  TextField,
  //Backdrop,
  //Fade,
  //CircularProgress,
  useMediaQuery,
} from "@material-ui/core";
//import appConfig from "../../components/AppConfig";
//import CheckoutForm from "./CheckoutForm";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import { formatCurrency } from "../../components/Helpers/formaters";

/*const useStyles = makeStyles(theme => ({
  modal: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    //justifyContent: "center",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      //padding: "20px 20px 20px 20px"
    },
    margin: "auto"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));*/

const CheckoutDialog = (props) => {
  const {
    //value,
    //className,
    open,
    onClose,
    onCheckoutError,
    onCheckoutSuccess,
    orderId,
    ordersData,
    checkoutClientSecret,
    //...rest
  } = props;
  //const [isBuying, setIsBuying] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  //const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const checkoutOrder = orderId
    ? ordersData.find((invoice) => invoice.uuid === orderId)
    : null;

    
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setProcessing(true);

    const result = await stripe.confirmCardPayment(checkoutClientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        /*billing_details: {
          name: "Jenny Rosen"
        }*/
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      onCheckoutError({ message: result.error.message });
      setProcessing(false);
      //console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        onCheckoutSuccess(orderId);
        setProcessing(false);
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="configure-api-key-title"
    >
      {orderId && (
        <React.Fragment>
          <DialogTitle id="configure-api-key-title">
            Checkout {checkoutOrder.product.name} package
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled={true}
                  value={checkoutOrder.product.name}
                  label="Description"
                />
              </Grid>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    disabled={true}
                    value={`${formatCurrency(checkoutOrder.base_value)}`}
                    label="Price"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    disabled={true}
                    value={`${formatCurrency(checkoutOrder.tax_value || 0)}`}
                    label="Tax value"
                  />
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  disabled={true}
                  value={`${formatCurrency(checkoutOrder.value)}`}
                  label="Final price"
                />
              </Grid>
              <Grid item xs={12}>
                <CardSection />
              </Grid>
            </Grid>
          </DialogContent>
        </React.Fragment>
      )}
      <DialogActions>
        <Button
          autoFocus
          disabled={!stripe || processing}
          color="primary"
          variant="contained"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Confirm order
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CheckoutDialog.propTypes = {
  className: PropTypes.string,
};

export default CheckoutDialog;
