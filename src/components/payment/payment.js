import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  Icon,
  Typography,
} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { getAllInfoByISO } from "iso-country-currency";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/styles";
import { loadStripe } from "@stripe/stripe-js";
import "./payment.css";
import { getData, postData } from "./../../utils";

import PlanSelection from "./plans";
// import SetupIntent from './setupIntent'
import firebase from "./../../firebase/firebase.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "100%",
      margin: "10px 0",
    },
  },
  container: {
    //backgroundImage: `url("images/pricing-bg.png")`,
  },
  pricingTxt: {
    color: "#fff",
    fontSize: "34px",
    fontWeight: "600",
    paddingTop: "5%",
  },
  titleContainer: {
    textAlign: "center",
    height: "100px",
    width: "100%",
  },
  freePaidTxt: {
    color: "#fff",
    fontSize: "22px",
    paddingTop: "3%",
  },
  priceBox: {
    // height: '300px',
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "20px",
    width: "730px",
    boxShadow:
      "0px 34px 67px rgba(0, 0, 0, 0.07), 0px 22.037px 39.2384px rgba(0, 0, 0, 0.0531481), 0px 13.0963px 21.3407px rgba(0, 0, 0, 0.0425185)",
    marginTop: "10px",
  },
  selectedPriceBox: {
    // height: '300px',
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "20px",
    width: "230px",
    // height:"400px",
    // overflow: 'auto',
    // maxHeight:"500px",
    boxShadow:
      "0px 34px 67px rgba(0, 0, 0, 0.07), 0px 22.037px 39.2384px rgba(0, 0, 0, 0.0531481), 0px 13.0963px 21.3407px rgba(0, 0, 0, 0.0425185)",
    marginTop: "10px",
  },
  button: {
    "&:hover": {
      backgroundColor: "#EDF3FF",
      color: "#2C73FF",
    },
  },
  yourDetails: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
}));

export default function Plans() {
  const classes = useStyles();
  const location = useLocation();
  const [price, setPrice] = useState("");
  const [plan, setPlan] = useState("");

  const [selectedPlan, setSelectedPlan] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState(0);

  // function handleSubmit(event) {
  //     event.preventDefault();
  //     let payload = {

  //     };
  //     console.log(event);

  // }

  let [clientSecret, setClientSecret] = useState(false);
  useEffect(() => {
    // console.log(location.state.price);
    // setPrice(location.state.price)
    // setPlan(location.state.planType)

    // Get client seceret

    firebase
      .auth()
      .currentUser.getIdToken()
      .then(async function (jwtToken) {
        let clientSecretResponce = await getData(
          `${process.env.REACT_APP_BASE_API_URL}/payment/getClientSecret`,
          jwtToken
        );
        // console.log("clientSecretResponce", clientSecretResponce)
        if (clientSecretResponce.status == "success") {
          setClientSecret(clientSecretResponce.data.clientSecret);
        }
      });

    if (localStorage.getItem("selectedPlan") !== null) {
      setSelectedPlan(localStorage.getItem("selectedPlan"));
    }

    if (localStorage.getItem("selectedCurrency") !== null) {
      setSelectedCurrency(localStorage.getItem("selectedCurrency"));
    }
  }, []);

  const CARD_OPTIONS = {
    hidePostalCode: true,
    clientSecret,
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000",
        fontWeight: 500,
        // fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#87bbfd",
        },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  const CardField = ({ onChange }) => (
    <div className="FormRow">
      <CardElement
        stripe={stripePromise}
        options={CARD_OPTIONS}
        onChange={onChange}
      />
    </div>
  );

  const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
      className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
      type="submit"
      disabled={processing || disabled}
    >
      {processing ? "Processing..." : children}
    </button>
  );

  const ErrorMessage = ({ children }) => (
    <div className="ErrorMessage" role="alert">
      <svg width="16" height="16" viewBox="0 0 17 17">
        <path
          fill="#FFF"
          d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
        />
        <path
          fill="#6772e5"
          d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
        />
      </svg>
      {children}
    </div>
  );

  const ResetButton = ({ onClick }) => (
    <button type="button" className="ResetButton" onClick={onClick}>
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <path
          fill="#FFF"
          d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
        />
      </svg>
    </button>
  );

  const CheckoutForm = (props) => {
    let history = useHistory();

    const stripe = useStripe();
    const elementsMain = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
      email: "",
      phone: "",
      name: "",
      country: "",
    });

    useEffect(() => {
      if (localStorage.getItem("weatherdata") !== null) {
        let localDataString = localStorage.getItem("weatherdata");
        let localData = JSON.parse(localDataString);

        if (localData.country) {
          setBillingDetails({ ...billingDetails, country: localData.country });

          let isoDetails = getAllInfoByISO(localData.country);
          let currencyList = ["USD", "CAD", "AUD", "GBP", "EURO", "NZD"];

          if (currencyList.includes(isoDetails.currency)) {
            let currencyListObj = {
              USD: 0,
              CAD: 1,
              AUD: 2,
              GBP: 3,
              EURO: 4,
              NZD: 5,
            };
            props.setSelectedCurrency(currencyListObj[isoDetails.currency]);
          }
        }
      }
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elementsMain) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      if (error) {
        elementsMain.getElement("card").focus();
        return;
      }

      if (cardComplete) {
        setProcessing(true);
      }

      // const payload = await stripe.createPaymentMethod({
      //     type: "card",
      //     card: elements.getElement(CardElement),
      //     billing_details: billingDetails
      // });
      let elements = elementsMain.getElement("card");
      console.log(elements);
      const confirmSetupResponse = await stripe.confirmCardSetup(
        props.clientSecret,
        {
          //`Elements` instance that was used to create the Payment Element
          payment_method: {
            card: elements,
          },
        }
      );

      console.log("payload==>", confirmSetupResponse);

      if (confirmSetupResponse.error) {
        return false;
      }
      // setProcessing(false);

      console.log(billingDetails, selectedPlan);

      firebase
        .auth()
        .currentUser.getIdToken()
        .then(async function (jwtToken) {
          let planKeyList = ["basic", "advanced", "professional", "business"];

          let payload = {
            paymentMethodId: confirmSetupResponse.setupIntent.payment_method,
            planType: planKeyList[selectedPlan],
            billingAddress: {
              city: billingDetails.city,
              country: billingDetails.country,
              line1: billingDetails.addressLine1,
              line2: billingDetails.addressLine2,
              postal_code: billingDetails.postal,
              state: billingDetails.state,
            },
          };
          let initPlanResponce = await postData(
            `${process.env.REACT_APP_BASE_API_URL}/payment/initiatePlan`,
            jwtToken,
            payload
          );
          console.log("initPlanResponce", initPlanResponce);
          setProcessing(false);
          if (initPlanResponce.status == "success") {
            //history.push('/dashboard')
            window.location.href = "/dashboard";
            // setClientSecret(clientSecretResponce.data.clientSecret)
          }
        });

      // if (payload.error) {
      //     setError(payload.error);
      // } else {
      //     setPaymentMethod(payload.paymentMethod);
      // }
    };

    const reset = () => {
      setError(null);
      setProcessing(false);
      setPaymentMethod(null);
      setBillingDetails({
        email: "",
        phone: "",
        name: "",
      });
    };

    const planList = [
      [
        {
          title: "Basic",
          description: "$0/month",
          features: ["Unlimited transcript", "Unlimited notes"],
        },
        {
          title: "Advanced",
          description: "$13/month",
          features: [
            "Unlimited Meetings",
            "Up to 4 hours meeting with meeting analytics. Upto 2gb of storage is included.",
            "Chat support included and Email / business hours",
          ],
        },
        {
          title: "Professional",
          description: "$22/month",
          features: [
            "Up to 8 hours meeting with meeting analytics. Upto 4gb of storage is included.",
            "Premium fulfillments - calendar assistant for scheduling, conflict monitoring during conversations",
            "Chat, email. 24/7.",
            "15 summary / 20 credits / min",
          ],
        },
        {
          title: "Business",
          description: "$150/month",
          features: [
            "Up to 60 hours meeting with deeper meetings and organizational analytics. Upto 100 GB of storage is included.",
            "Chat/email/phone. 24/7",
          ],
        },
      ],

      [
        {
          title: "Basic",
          description: "$0/month",
          features: ["Unlimited transcript", "Unlimited notes"],
        },
        {
          title: "Advanced",
          description: "$15/month",
          features: [
            "Unlimited Meetings",
            "Up to 4 hours meeting with meeting analytics. Upto 2gb of storage is included.",
            "Chat support included and Email / business hours",
          ],
        },
        {
          title: "Professional",
          description: "$25/month",
          features: [
            "Up to 8 hours meeting with meeting analytics. Upto 4gb of storage is included.",
            "Premium fulfillments - calendar assistant for scheduling, conflict monitoring during conversations",
            "Chat, email. 24/7.",
            "15 summary / 20 credits / min",
          ],
        },
        {
          title: "Business",
          description: "$170/month",
          features: [
            "Up to 60 hours meeting with deeper meetings and organizational analytics. Upto 100 GB of storage is included.",
            "Chat/email/phone. 24/7",
          ],
        },
      ],

      [
        {
          title: "Basic",
          description: "$0/month",
          features: ["Unlimited transcript", "Unlimited notes"],
        },
        {
          title: "Advanced",
          description: "$15/month",
          features: [
            "Unlimited Meetings",
            "Up to 4 hours meeting with meeting analytics. Upto 2gb of storage is included.",
            "Chat support included and Email / business hours",
          ],
        },
        {
          title: "Professional",
          description: "$25/month",
          features: [
            "Up to 8 hours meeting with meeting analytics. Upto 4gb of storage is included.",
            "Premium fulfillments - calendar assistant for scheduling, conflict monitoring during conversations",
            "Chat, email. 24/7.",
            "15 summary / 20 credits / min",
          ],
        },
        {
          title: "Business",
          description: "$170/month",
          features: [
            "Up to 60 hours meeting with deeper meetings and organizational analytics. Upto 100 GB of storage is included.",
            "Chat/email/phone. 24/7",
          ],
        },
      ],

      [
        {
          title: "Basic",
          description: "£0/month",
          features: ["Unlimited transcript", "Unlimited notes"],
        },
        {
          title: "Advanced",
          description: "£12/month",
          features: [
            "Unlimited Meetings",
            "Up to 4 hours meeting with meeting analytics. Upto 2gb of storage is included.",
            "Chat support included and Email / business hours",
          ],
        },
        {
          title: "Professional",
          description: "£20/month",
          features: [
            "Up to 8 hours meeting with meeting analytics. Upto 4gb of storage is included.",
            "Premium fulfillments - calendar assistant for scheduling, conflict monitoring during conversations",
            "Chat, email. 24/7.",
            "15 summary / 20 credits / min",
          ],
        },
        {
          title: "Business",
          description: "£140/month",
          features: [
            "Up to 60 hours meeting with deeper meetings and organizational analytics. Upto 100 GB of storage is included.",
            "Chat/email/phone. 24/7",
          ],
        },
      ],

      [
        {
          title: "Basic",
          description: "€0/month",
          features: ["Unlimited transcript", "Unlimited notes"],
        },
        {
          title: "Advanced",
          description: "€13/month",
          features: [
            "Unlimited Meetings",
            "Up to 4 hours meeting with meeting analytics. Upto 2gb of storage is included.",
            "Chat support included and Email / business hours",
          ],
        },
        {
          title: "Professional",
          description: "€22/month",
          features: [
            "Up to 8 hours meeting with meeting analytics. Upto 4gb of storage is included.",
            "Premium fulfillments - calendar assistant for scheduling, conflict monitoring during conversations",
            "Chat, email. 24/7.",
            "15 summary / 20 credits / min",
          ],
        },
        {
          title: "Business",
          description: "€140/month",
          features: [
            "Up to 60 hours meeting with deeper meetings and organizational analytics. Upto 100 GB of storage is included.",
            "Chat/email/phone. 24/7",
          ],
        },
      ],

      [
        {
          title: "Basic",
          description: "$0/month",
          features: ["Unlimited transcript", "Unlimited notes"],
        },
        {
          title: "Advanced",
          description: "$15/month",
          features: [
            "Unlimited Meetings",
            "Up to 4 hours meeting with meeting analytics. Upto 2gb of storage is included.",
            "Chat support included and Email / business hours",
          ],
        },
        {
          title: "Professional",
          description: "$25/month",
          features: [
            "Up to 8 hours meeting with meeting analytics. Upto 4gb of storage is included.",
            "Premium fulfillments - calendar assistant for scheduling, conflict monitoring during conversations",
            "Chat, email. 24/7.",
            "15 summary / 20 credits / min",
          ],
        },
        {
          title: "Business",
          description: "$170/month",
          features: [
            "Up to 60 hours meeting with deeper meetings and organizational analytics. Upto 100 GB of storage is included.",
            "Chat/email/phone. 24/7",
          ],
        },
      ],
    ];

    return paymentMethod ? (
      <div className="Result">
        <div className="ResultTitle" role="alert">
          Payment successful
        </div>
        <div className="ResultMessage">
          Thanks for trying Stripe Elements. No money was charged, but we
          generated a PaymentMethod: {paymentMethod.id}
        </div>
        <ResetButton onClick={reset} />
      </div>
    ) : (
      <div>
        <Box display="flex" marginTop="50px" justifyContent="center">
          <form
            className={classes.root}
            style={{ paddingRight: "20px" }}
            onSubmit={handleSubmit}
          >
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-around"
              flexDirection="column"
              // padding="0 10.5%"
              // marginTop="-150px"
            >
              <Box className={classes.priceBox}>
                <Typography className={classes.yourDetails}>
                  Billing address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      // component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                    >
                      <TextField
                        id="addr1"
                        label="Address line 1"
                        placeholder="3961 102nd Avenue"
                        autoComplete="address1"
                        value={billingDetails.addressLine1}
                        onChange={(e) => {
                          setBillingDetails({
                            ...billingDetails,
                            addressLine1: e.target.value,
                          });
                        }}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      // component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                    >
                      <TextField
                        id="addr2"
                        label="Address line 2"
                        placeholder=""
                        autoComplete="address2"
                        value={billingDetails.addressLine2}
                        onChange={(e) => {
                          setBillingDetails({
                            ...billingDetails,
                            addressLine2: e.target.value,
                          });
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      // component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                    >
                      <TextField
                        id="city"
                        label="City"
                        placeholder="Nelson"
                        autoComplete="city"
                        value={billingDetails.city}
                        onChange={(e) => {
                          setBillingDetails({
                            ...billingDetails,
                            city: e.target.value,
                          });
                        }}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      // component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                    >
                      <TextField
                        id="postal"
                        label="Postal code"
                        placeholder="Postal code"
                        autoComplete="postal"
                        value={billingDetails.postal}
                        onChange={(e) => {
                          setBillingDetails({
                            ...billingDetails,
                            postal: e.target.value,
                          });
                        }}
                        required
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      // component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                    >
                      {billingDetails.country &&
                      (billingDetails.country == "CA" ||
                        billingDetails.country == "US") ? (
                        <FormControl style={{ marginTop: "10px" }} fullWidth>
                          <InputLabel id="state-label">
                            State/Province
                          </InputLabel>

                          {billingDetails.country == "CA" && (
                            <Select
                              labelId="state-label"
                              value={billingDetails.state}
                              label="State/Province"
                              required
                              onChange={(e) => {
                                setBillingDetails({
                                  ...billingDetails,
                                  state: e.target.value,
                                });
                              }}
                            >
                              <MenuItem value="AB">Alberta</MenuItem>
                              <MenuItem value="BC">British Columbia</MenuItem>
                              <MenuItem value="MB">Manitoba</MenuItem>
                              <MenuItem value="NB">New Brunswick</MenuItem>
                              <MenuItem value="NF">Newfoundland</MenuItem>
                              <MenuItem value="NT">
                                Northwest Territories
                              </MenuItem>
                              <MenuItem value="NS">Nova Scotia</MenuItem>
                              <MenuItem value="NU">Nunavut</MenuItem>
                              <MenuItem value="ON">Ontario</MenuItem>
                              <MenuItem value="PE">
                                Prince Edward Island
                              </MenuItem>
                              <MenuItem value="PQ">Quebec</MenuItem>
                              <MenuItem value="SK">Saskatchewan</MenuItem>
                              <MenuItem value="YT">Yukon</MenuItem>
                            </Select>
                          )}

                          {billingDetails.country == "US" && (
                            <Select
                              labelId="state-label"
                              value={billingDetails.state}
                              label="State/Province"
                              required
                              onChange={(e) => {
                                setBillingDetails({
                                  ...billingDetails,
                                  state: e.target.value,
                                });
                              }}
                            >
                              <MenuItem value="AL"> Alabama</MenuItem>
                              <MenuItem value="AK"> Alaska</MenuItem>
                              <MenuItem value="AS"> American Samoa</MenuItem>
                              <MenuItem value="AZ"> Arizona</MenuItem>
                              <MenuItem value="AR"> Arkansas</MenuItem>
                              <MenuItem value="CA"> California</MenuItem>
                              <MenuItem value="CO"> Colorado</MenuItem>
                              <MenuItem value="CT"> Connecticut</MenuItem>
                              <MenuItem value="DE"> Delaware</MenuItem>
                              <MenuItem value="DC">
                                District Of Columbia
                              </MenuItem>
                              <MenuItem value="FM">
                                Federated States Of Micronesia
                              </MenuItem>
                              <MenuItem value="FL"> Florida</MenuItem>
                              <MenuItem value="GA"> Georgia</MenuItem>
                              <MenuItem value="GU"> Guam</MenuItem>
                              <MenuItem value="HI"> Hawaii</MenuItem>
                              <MenuItem value="ID"> Idaho</MenuItem>
                              <MenuItem value="IL"> Illinois</MenuItem>
                              <MenuItem value="IN"> Indiana</MenuItem>
                              <MenuItem value="IA"> Iowa</MenuItem>
                              <MenuItem value="KS"> Kansas</MenuItem>
                              <MenuItem value="KY"> Kentucky</MenuItem>
                              <MenuItem value="LA"> Louisiana</MenuItem>
                              <MenuItem value="ME"> Maine</MenuItem>
                              <MenuItem value="MH">Marshall Islands</MenuItem>
                              <MenuItem value="MD"> Maryland</MenuItem>
                              <MenuItem value="MA"> Massachusetts</MenuItem>
                              <MenuItem value="MI"> Michigan</MenuItem>
                              <MenuItem value="MN"> Minnesota</MenuItem>
                              <MenuItem value="MS"> Mississippi</MenuItem>
                              <MenuItem value="MO"> Missouri</MenuItem>
                              <MenuItem value="MT"> Montana</MenuItem>
                              <MenuItem value="NE"> Nebraska</MenuItem>
                              <MenuItem value="NV"> Nevada</MenuItem>
                              <MenuItem value="NH"> New Hampshire</MenuItem>
                              <MenuItem value="NJ"> New Jersey</MenuItem>
                              <MenuItem value="NM"> New Mexico</MenuItem>
                              <MenuItem value="NY"> New York</MenuItem>
                              <MenuItem value="NC"> North Carolina</MenuItem>
                              <MenuItem value="ND"> North Dakota</MenuItem>
                              <MenuItem value="MP">
                                Northern Mariana Islands
                              </MenuItem>
                              <MenuItem value="OH"> Ohio</MenuItem>
                              <MenuItem value="OK"> Oklahoma</MenuItem>
                              <MenuItem value="OR"> Oregon</MenuItem>
                              <MenuItem value="PW"> Palau</MenuItem>
                              <MenuItem value="PA"> Pennsylvania</MenuItem>
                              <MenuItem value="PR"> Puerto Rico</MenuItem>
                              <MenuItem value="RI"> Rhode Island</MenuItem>
                              <MenuItem value="SC"> South Carolina</MenuItem>
                              <MenuItem value="SD"> South Dakota</MenuItem>
                              <MenuItem value="TN"> Tennessee</MenuItem>
                              <MenuItem value="TX"> Texas</MenuItem>
                              <MenuItem value="UT"> Utah</MenuItem>
                              <MenuItem value="VT"> Vermont</MenuItem>
                              <MenuItem value="VI"> Virgin Islands</MenuItem>
                              <MenuItem value="VA"> Virginia</MenuItem>
                              <MenuItem value="WA"> Washington</MenuItem>
                              <MenuItem value="WV"> West Virginia</MenuItem>
                              <MenuItem value="WI"> Wisconsin</MenuItem>
                              <MenuItem value="WY"> Wyomin</MenuItem>
                            </Select>
                          )}
                        </FormControl>
                      ) : (
                        <TextField
                          id="outlined-name"
                          label="State/Province"
                          placeholder="British Columbia"
                          autoComplete="state"
                          value={billingDetails.state}
                          onChange={(e) => {
                            setBillingDetails({
                              ...billingDetails,
                              state: e.target.value,
                            });
                          }}
                          required
                        />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      // component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                    >
                      {/* <TextField
                                                id="outlined-name"
                                                label="Country"
                                                placeholder="Canada"
                                                autoComplete="country"
                                                value={billingDetails.country}
                                                onChange={(e) => {
                                                    setBillingDetails({ ...billingDetails, country: e.target.value });
                                                }}
                                                required
                                            /> */}

                      <FormControl style={{ marginTop: "10px" }} fullWidth>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                          labelId="country-label"
                          value={billingDetails.country}
                          label="Country"
                          required
                          onChange={(e) => {
                            let statesOfCanada = [
                              "AB",
                              "BC",
                              "MB",
                              "NB",
                              "NF",
                              "NT",
                              "NS",
                              "NU",
                              "ON",
                              "PE",
                              "PQ",
                              "SK",
                              "YT",
                            ];
                            let statesOfUs = [
                              "AL",
                              "AK",
                              "AS",
                              "AZ",
                              "AR",
                              "CA",
                              "CO",
                              "CT",
                              "DE",
                              "DC",
                              "FM",
                              "FL",
                              "GA",
                              "GU",
                              "HI",
                              "ID",
                              "IL",
                              "IN",
                              "IA",
                              "KS",
                              "KY",
                              "LA",
                              "ME",
                              "MH",
                              "MD",
                              "MA",
                              "MI",
                              "MN",
                              "MS",
                              "MO",
                              "MT",
                              "NE",
                              "NV",
                              "NH",
                              "NJ",
                              "NM",
                              "NY",
                              "NC",
                              "ND",
                              "MP",
                              "OH",
                              "OK",
                              "OR",
                              "PW",
                              "PA",
                              "PR",
                              "RI",
                              "SC",
                              "SD",
                              "TN",
                              "TX",
                              "UT",
                              "VT",
                              "VI",
                              "VA",
                              "WA",
                              "WV",
                              "WI",
                              "WY",
                            ];

                            if (
                              e.target.value == "CA" &&
                              !statesOfCanada.includes(billingDetails.state)
                            ) {
                              setBillingDetails({
                                ...billingDetails,
                                country: e.target.value,
                                state: "",
                              });
                            } else if (
                              e.target.value == "US" &&
                              !statesOfUs.includes(billingDetails.state)
                            ) {
                              setBillingDetails({
                                ...billingDetails,
                                country: e.target.value,
                                state: "",
                              });
                            } else {
                              setBillingDetails({
                                ...billingDetails,
                                country: e.target.value,
                              });
                            }
                          }}
                        >
                          <MenuItem value="AF">Afghanistan</MenuItem>
                          <MenuItem value="AX">Åland Islands</MenuItem>
                          <MenuItem value="AL">Albania</MenuItem>
                          <MenuItem value="DZ">Algeria</MenuItem>
                          <MenuItem value="AS">American Samoa</MenuItem>
                          <MenuItem value="AD">Andorra</MenuItem>
                          <MenuItem value="AO">Angola</MenuItem>
                          <MenuItem value="AI">Anguilla</MenuItem>
                          <MenuItem value="AQ">Antarctica</MenuItem>
                          <MenuItem value="AG">Antigua and Barbuda</MenuItem>
                          <MenuItem value="AR">Argentina</MenuItem>
                          <MenuItem value="AM">Armenia</MenuItem>
                          <MenuItem value="AW">Aruba</MenuItem>
                          <MenuItem value="AU">Australia</MenuItem>
                          <MenuItem value="AT">Austria</MenuItem>
                          <MenuItem value="AZ">Azerbaijan</MenuItem>
                          <MenuItem value="BS">Bahamas</MenuItem>
                          <MenuItem value="BH">Bahrain</MenuItem>
                          <MenuItem value="BD">Bangladesh</MenuItem>
                          <MenuItem value="BB">Barbados</MenuItem>
                          <MenuItem value="BY">Belarus</MenuItem>
                          <MenuItem value="BE">Belgium</MenuItem>
                          <MenuItem value="BZ">Belize</MenuItem>
                          <MenuItem value="BJ">Benin</MenuItem>
                          <MenuItem value="BM">Bermuda</MenuItem>
                          <MenuItem value="BT">Bhutan</MenuItem>
                          <MenuItem value="BO">
                            Bolivia, Plurinational State of
                          </MenuItem>
                          <MenuItem value="BQ">
                            Bonaire, Sint Eustatius and Saba
                          </MenuItem>
                          <MenuItem value="BA">Bosnia and Herzegovina</MenuItem>
                          <MenuItem value="BW">Botswana</MenuItem>
                          <MenuItem value="BV">Bouvet Island</MenuItem>
                          <MenuItem value="BR">Brazil</MenuItem>
                          <MenuItem value="IO">
                            British Indian Ocean Territory
                          </MenuItem>
                          <MenuItem value="BN">Brunei Darussalam</MenuItem>
                          <MenuItem value="BG">Bulgaria</MenuItem>
                          <MenuItem value="BF">Burkina Faso</MenuItem>
                          <MenuItem value="BI">Burundi</MenuItem>
                          <MenuItem value="KH">Cambodia</MenuItem>
                          <MenuItem value="CM">Cameroon</MenuItem>
                          <MenuItem value="CA">Canada</MenuItem>
                          <MenuItem value="CV">Cape Verde</MenuItem>
                          <MenuItem value="KY">Cayman Islands</MenuItem>
                          <MenuItem value="CF">
                            Central African Republic
                          </MenuItem>
                          <MenuItem value="TD">Chad</MenuItem>
                          <MenuItem value="CL">Chile</MenuItem>
                          <MenuItem value="CN">China</MenuItem>
                          <MenuItem value="CX">Christmas Island</MenuItem>
                          <MenuItem value="CC">
                            Cocos (Keeling) Islands
                          </MenuItem>
                          <MenuItem value="CO">Colombia</MenuItem>
                          <MenuItem value="KM">Comoros</MenuItem>
                          <MenuItem value="CG">Congo</MenuItem>
                          <MenuItem value="CD">
                            Congo, the Democratic Republic of the
                          </MenuItem>
                          <MenuItem value="CK">Cook Islands</MenuItem>
                          <MenuItem value="CR">Costa Rica</MenuItem>
                          <MenuItem value="CI">Côte d'Ivoire</MenuItem>
                          <MenuItem value="HR">Croatia</MenuItem>
                          <MenuItem value="CU">Cuba</MenuItem>
                          <MenuItem value="CW">Curaçao</MenuItem>
                          <MenuItem value="CY">Cyprus</MenuItem>
                          <MenuItem value="CZ">Czech Republic</MenuItem>
                          <MenuItem value="DK">Denmark</MenuItem>
                          <MenuItem value="DJ">Djibouti</MenuItem>
                          <MenuItem value="DM">Dominica</MenuItem>
                          <MenuItem value="DO">Dominican Republic</MenuItem>
                          <MenuItem value="EC">Ecuador</MenuItem>
                          <MenuItem value="EG">Egypt</MenuItem>
                          <MenuItem value="SV">El Salvador</MenuItem>
                          <MenuItem value="GQ">Equatorial Guinea</MenuItem>
                          <MenuItem value="ER">Eritrea</MenuItem>
                          <MenuItem value="EE">Estonia</MenuItem>
                          <MenuItem value="ET">Ethiopia</MenuItem>
                          <MenuItem value="FK">
                            Falkland Islands (Malvinas)
                          </MenuItem>
                          <MenuItem value="FO">Faroe Islands</MenuItem>
                          <MenuItem value="FJ">Fiji</MenuItem>
                          <MenuItem value="FI">Finland</MenuItem>
                          <MenuItem value="FR">France</MenuItem>
                          <MenuItem value="GF">French Guiana</MenuItem>
                          <MenuItem value="PF">French Polynesia</MenuItem>
                          <MenuItem value="TF">
                            French Southern Territories
                          </MenuItem>
                          <MenuItem value="GA">Gabon</MenuItem>
                          <MenuItem value="GM">Gambia</MenuItem>
                          <MenuItem value="GE">Georgia</MenuItem>
                          <MenuItem value="DE">Germany</MenuItem>
                          <MenuItem value="GH">Ghana</MenuItem>
                          <MenuItem value="GI">Gibraltar</MenuItem>
                          <MenuItem value="GR">Greece</MenuItem>
                          <MenuItem value="GL">Greenland</MenuItem>
                          <MenuItem value="GD">Grenada</MenuItem>
                          <MenuItem value="GP">Guadeloupe</MenuItem>
                          <MenuItem value="GU">Guam</MenuItem>
                          <MenuItem value="GT">Guatemala</MenuItem>
                          <MenuItem value="GG">Guernsey</MenuItem>
                          <MenuItem value="GN">Guinea</MenuItem>
                          <MenuItem value="GW">Guinea-Bissau</MenuItem>
                          <MenuItem value="GY">Guyana</MenuItem>
                          <MenuItem value="HT">Haiti</MenuItem>
                          <MenuItem value="HM">
                            Heard Island and McDonald Islands
                          </MenuItem>
                          <MenuItem value="VA">
                            Holy See (Vatican City State)
                          </MenuItem>
                          <MenuItem value="HN">Honduras</MenuItem>
                          <MenuItem value="HK">Hong Kong</MenuItem>
                          <MenuItem value="HU">Hungary</MenuItem>
                          <MenuItem value="IS">Iceland</MenuItem>
                          <MenuItem value="IN">India</MenuItem>
                          <MenuItem value="ID">Indonesia</MenuItem>
                          <MenuItem value="IR">
                            Iran, Islamic Republic of
                          </MenuItem>
                          <MenuItem value="IQ">Iraq</MenuItem>
                          <MenuItem value="IE">Ireland</MenuItem>
                          <MenuItem value="IM">Isle of Man</MenuItem>
                          <MenuItem value="IL">Israel</MenuItem>
                          <MenuItem value="IT">Italy</MenuItem>
                          <MenuItem value="JM">Jamaica</MenuItem>
                          <MenuItem value="JP">Japan</MenuItem>
                          <MenuItem value="JE">Jersey</MenuItem>
                          <MenuItem value="JO">Jordan</MenuItem>
                          <MenuItem value="KZ">Kazakhstan</MenuItem>
                          <MenuItem value="KE">Kenya</MenuItem>
                          <MenuItem value="KI">Kiribati</MenuItem>
                          <MenuItem value="KP">
                            Korea, Democratic People's Republic of
                          </MenuItem>
                          <MenuItem value="KR">Korea, Republic of</MenuItem>
                          <MenuItem value="KW">Kuwait</MenuItem>
                          <MenuItem value="KG">Kyrgyzstan</MenuItem>
                          <MenuItem value="LA">
                            Lao People's Democratic Republic
                          </MenuItem>
                          <MenuItem value="LV">Latvia</MenuItem>
                          <MenuItem value="LB">Lebanon</MenuItem>
                          <MenuItem value="LS">Lesotho</MenuItem>
                          <MenuItem value="LR">Liberia</MenuItem>
                          <MenuItem value="LY">Libya</MenuItem>
                          <MenuItem value="LI">Liechtenstein</MenuItem>
                          <MenuItem value="LT">Lithuania</MenuItem>
                          <MenuItem value="LU">Luxembourg</MenuItem>
                          <MenuItem value="MO">Macao</MenuItem>
                          <MenuItem value="MK">
                            Macedonia, the former Yugoslav Republic of
                          </MenuItem>
                          <MenuItem value="MG">Madagascar</MenuItem>
                          <MenuItem value="MW">Malawi</MenuItem>
                          <MenuItem value="MY">Malaysia</MenuItem>
                          <MenuItem value="MV">Maldives</MenuItem>
                          <MenuItem value="ML">Mali</MenuItem>
                          <MenuItem value="MT">Malta</MenuItem>
                          <MenuItem value="MH">Marshall Islands</MenuItem>
                          <MenuItem value="MQ">Martinique</MenuItem>
                          <MenuItem value="MR">Mauritania</MenuItem>
                          <MenuItem value="MU">Mauritius</MenuItem>
                          <MenuItem value="YT">Mayotte</MenuItem>
                          <MenuItem value="MX">Mexico</MenuItem>
                          <MenuItem value="FM">
                            Micronesia, Federated States of
                          </MenuItem>
                          <MenuItem value="MD">Moldova, Republic of</MenuItem>
                          <MenuItem value="MC">Monaco</MenuItem>
                          <MenuItem value="MN">Mongolia</MenuItem>
                          <MenuItem value="ME">Montenegro</MenuItem>
                          <MenuItem value="MS">Montserrat</MenuItem>
                          <MenuItem value="MA">Morocco</MenuItem>
                          <MenuItem value="MZ">Mozambique</MenuItem>
                          <MenuItem value="MM">Myanmar</MenuItem>
                          <MenuItem value="NA">Namibia</MenuItem>
                          <MenuItem value="NR">Nauru</MenuItem>
                          <MenuItem value="NP">Nepal</MenuItem>
                          <MenuItem value="NL">Netherlands</MenuItem>
                          <MenuItem value="NC">New Caledonia</MenuItem>
                          <MenuItem value="NZ">New Zealand</MenuItem>
                          <MenuItem value="NI">Nicaragua</MenuItem>
                          <MenuItem value="NE">Niger</MenuItem>
                          <MenuItem value="NG">Nigeria</MenuItem>
                          <MenuItem value="NU">Niue</MenuItem>
                          <MenuItem value="NF">Norfolk Island</MenuItem>
                          <MenuItem value="MP">
                            Northern Mariana Islands
                          </MenuItem>
                          <MenuItem value="NO">Norway</MenuItem>
                          <MenuItem value="OM">Oman</MenuItem>
                          <MenuItem value="PK">Pakistan</MenuItem>
                          <MenuItem value="PW">Palau</MenuItem>
                          <MenuItem value="PS">
                            Palestinian Territory, Occupied
                          </MenuItem>
                          <MenuItem value="PA">Panama</MenuItem>
                          <MenuItem value="PG">Papua New Guinea</MenuItem>
                          <MenuItem value="PY">Paraguay</MenuItem>
                          <MenuItem value="PE">Peru</MenuItem>
                          <MenuItem value="PH">Philippines</MenuItem>
                          <MenuItem value="PN">Pitcairn</MenuItem>
                          <MenuItem value="PL">Poland</MenuItem>
                          <MenuItem value="PT">Portugal</MenuItem>
                          <MenuItem value="PR">Puerto Rico</MenuItem>
                          <MenuItem value="QA">Qatar</MenuItem>
                          <MenuItem value="RE">Réunion</MenuItem>
                          <MenuItem value="RO">Romania</MenuItem>
                          <MenuItem value="RU">Russian Federation</MenuItem>
                          <MenuItem value="RW">Rwanda</MenuItem>
                          <MenuItem value="BL">Saint Barthélemy</MenuItem>
                          <MenuItem value="SH">
                            Saint Helena, Ascension and Tristan da Cunha
                          </MenuItem>
                          <MenuItem value="KN">Saint Kitts and Nevis</MenuItem>
                          <MenuItem value="LC">Saint Lucia</MenuItem>
                          <MenuItem value="MF">
                            Saint Martin (French part)
                          </MenuItem>
                          <MenuItem value="PM">
                            Saint Pierre and Miquelon
                          </MenuItem>
                          <MenuItem value="VC">
                            Saint Vincent and the Grenadines
                          </MenuItem>
                          <MenuItem value="WS">Samoa</MenuItem>
                          <MenuItem value="SM">San Marino</MenuItem>
                          <MenuItem value="ST">Sao Tome and Principe</MenuItem>
                          <MenuItem value="SA">Saudi Arabia</MenuItem>
                          <MenuItem value="SN">Senegal</MenuItem>
                          <MenuItem value="RS">Serbia</MenuItem>
                          <MenuItem value="SC">Seychelles</MenuItem>
                          <MenuItem value="SL">Sierra Leone</MenuItem>
                          <MenuItem value="SG">Singapore</MenuItem>
                          <MenuItem value="SX">
                            Sint Maarten (Dutch part)
                          </MenuItem>
                          <MenuItem value="SK">Slovakia</MenuItem>
                          <MenuItem value="SI">Slovenia</MenuItem>
                          <MenuItem value="SB">Solomon Islands</MenuItem>
                          <MenuItem value="SO">Somalia</MenuItem>
                          <MenuItem value="ZA">South Africa</MenuItem>
                          <MenuItem value="GS">
                            South Georgia and the South Sandwich Islands
                          </MenuItem>
                          <MenuItem value="SS">South Sudan</MenuItem>
                          <MenuItem value="ES">Spain</MenuItem>
                          <MenuItem value="LK">Sri Lanka</MenuItem>
                          <MenuItem value="SD">Sudan</MenuItem>
                          <MenuItem value="SR">Suriname</MenuItem>
                          <MenuItem value="SJ">Svalbard and Jan Mayen</MenuItem>
                          <MenuItem value="SZ">Swaziland</MenuItem>
                          <MenuItem value="SE">Sweden</MenuItem>
                          <MenuItem value="CH">Switzerland</MenuItem>
                          <MenuItem value="SY">Syrian Arab Republic</MenuItem>
                          <MenuItem value="TW">
                            Taiwan, Province of China
                          </MenuItem>
                          <MenuItem value="TJ">Tajikistan</MenuItem>
                          <MenuItem value="TZ">
                            Tanzania, United Republic of
                          </MenuItem>
                          <MenuItem value="TH">Thailand</MenuItem>
                          <MenuItem value="TL">Timor-Leste</MenuItem>
                          <MenuItem value="TG">Togo</MenuItem>
                          <MenuItem value="TK">Tokelau</MenuItem>
                          <MenuItem value="TO">Tonga</MenuItem>
                          <MenuItem value="TT">Trinidad and Tobago</MenuItem>
                          <MenuItem value="TN">Tunisia</MenuItem>
                          <MenuItem value="TR">Turkey</MenuItem>
                          <MenuItem value="TM">Turkmenistan</MenuItem>
                          <MenuItem value="TC">
                            Turks and Caicos Islands
                          </MenuItem>
                          <MenuItem value="TV">Tuvalu</MenuItem>
                          <MenuItem value="UG">Uganda</MenuItem>
                          <MenuItem value="UA">Ukraine</MenuItem>
                          <MenuItem value="AE">United Arab Emirates</MenuItem>
                          <MenuItem value="GB">United Kingdom</MenuItem>
                          <MenuItem value="US">United States</MenuItem>
                          <MenuItem value="UM">
                            United States Minor Outlying Islands
                          </MenuItem>
                          <MenuItem value="UY">Uruguay</MenuItem>
                          <MenuItem value="UZ">Uzbekistan</MenuItem>
                          <MenuItem value="VU">Vanuatu</MenuItem>
                          <MenuItem value="VE">
                            Venezuela, Bolivarian Republic of
                          </MenuItem>
                          <MenuItem value="VN">Viet Nam</MenuItem>
                          <MenuItem value="VG">
                            Virgin Islands, British
                          </MenuItem>
                          <MenuItem value="VI">Virgin Islands, U.S.</MenuItem>
                          <MenuItem value="WF">Wallis and Futuna</MenuItem>
                          <MenuItem value="EH">Western Sahara</MenuItem>
                          <MenuItem value="YE">Yemen</MenuItem>
                          <MenuItem value="ZM">Zambia</MenuItem>
                          <MenuItem value="ZW">Zimbabwe</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box className={classes.priceBox}>
                <Typography className={classes.yourDetails}>
                  Payment details
                </Typography>
                <TextField
                  label="Name"
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  autoComplete="name"
                  value={billingDetails.name}
                  onChange={(e) => {
                    setBillingDetails({
                      ...billingDetails,
                      name: e.target.value,
                    });
                  }}
                />
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="janedoe@gmail.com"
                  required
                  autoComplete="email"
                  value={billingDetails.email}
                  onChange={(e) => {
                    setBillingDetails({
                      ...billingDetails,
                      email: e.target.value,
                    });
                  }}
                />
                <TextField
                  label="Phone"
                  id="phone"
                  type="tel"
                  placeholder="(941) 555-0123"
                  required
                  autoComplete="tel"
                  value={billingDetails.phone}
                  onChange={(e) => {
                    setBillingDetails({
                      ...billingDetails,
                      phone: e.target.value,
                    });
                  }}
                />
                {clientSecret && (
                  <CardField
                    onChange={(e) => {
                      setError(e.error);
                      setCardComplete(e.complete);
                    }}
                  />
                )}
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                <SubmitButton
                  processing={processing}
                  error={error}
                  disabled={!stripe}
                >
                  Subscribe
                </SubmitButton>
              </Box>
            </Box>
          </form>
          <Box>
            <Box className={classes.selectedPriceBox}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography className={classes.yourDetails}>
                  {planList[props.selectedCurrency][props.selectedPlan].title}
                </Typography>
                <p style={{ fontSize: "1.17em", color: "#2C73FF" }}>
                  {
                    planList[props.selectedCurrency][props.selectedPlan]
                      .description
                  }
                </p>

                {planList[props.selectedCurrency][props.selectedPlan]
                  .features &&
                  planList[props.selectedCurrency][
                    props.selectedPlan
                  ].features.map((line, index) => {
                    if (index == 0) {
                      return (
                        <>
                          <p
                            style={{
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            {line}
                          </p>
                          <hr></hr>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <p
                            style={{ paddingTop: "5px", paddingBottom: "5px" }}
                          >
                            {line}
                          </p>
                        </>
                      );
                    }
                  })}
              </Box>
              <Box display="flex" justifyContent="center">
                <a href="https://www.bluecap.ai/pricing#pricing-section">
                  Change Plan
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  };

  const ELEMENTS_OPTIONS = {
    clientSecret,
    // fonts: [
    //     {
    //         cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    //     }
    // ]
  };

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const planList = [
    [
      {
        title: "Basic",
        description: "$0/month",
      },
      {
        title: "Advanced",
        description: "$13/month",
      },
      {
        title: "Professional",
        description: "$22/month",
      },
      {
        title: "Business",
        description: "$150/month",
      },
    ],

    [
      {
        title: "Basic",
        description: "$0/month",
      },
      {
        title: "Advanced",
        description: "$15/month",
      },
      {
        title: "Professional",
        description: "$25/month",
      },
      {
        title: "Business",
        description: "$170/month",
      },
    ],

    [
      {
        title: "Basic",
        description: "$0/month",
      },
      {
        title: "Advanced",
        description: "$15/month",
      },
      {
        title: "Professional",
        description: "$25/month",
      },
      {
        title: "Business",
        description: "$170/month",
      },
    ],

    [
      {
        title: "Basic",
        description: "£0/month",
      },
      {
        title: "Advanced",
        description: "£12/month",
      },
      {
        title: "Professional",
        description: "£20/month",
      },
      {
        title: "Business",
        description: "£140/month",
      },
    ],

    [
      {
        title: "Basic",
        description: "€0/month",
      },
      {
        title: "Advanced",
        description: "€13/month",
      },
      {
        title: "Professional",
        description: "€22/month",
      },
      {
        title: "Business",
        description: "€140/month",
      },
    ],

    [
      {
        title: "Basic",
        description: "$0/month",
      },
      {
        title: "Advanced",
        description: "$15/month",
      },
      {
        title: "Professional",
        description: "$25/month",
      },
      {
        title: "Business",
        description: "$170/month",
      },
    ],
  ];

  const [selectedLocation, setSelectedLocation] = useState(1);
  const handleLocationChange = (e) => setSelectedLocation(e.target.value);

  return (
    <div>
      {/* <Grid container className={classes.container}>
                <Box className={classes.titleContainer}> */}

      {/* <FormControl style={{width:"150px", marginTop:"30px", padding:"3px", background:"#fff"}}>
                    <InputLabel style={{marginTop:"12px", marginLeft:"8px"}} id="location-select-label">Location</InputLabel>
                    <Select
                    labelId="location-select-label"
                    
                    value={selectedLocation}
                    label="Location"
                    onChange={handleLocationChange}
                    >
                    <MenuItem value={0}>USD</MenuItem>
                    <MenuItem value={1}>CAD</MenuItem>
                    <MenuItem value={2}>AUD</MenuItem>
                    <MenuItem value={3}>GBP</MenuItem>
                    <MenuItem value={4}>EURO</MenuItem>
                    <MenuItem value={5}>NZD</MenuItem>
                    </Select>
                </FormControl> */}

      {/* <PlanSelection setSelectedPlan={setSelectedPlan}  cardContents={planList[selectedLocation]} ></PlanSelection> */}
      {/* <p className={classes.freePaidTxt}>Payment</p> */}
      {/* </Box>
            </Grid> */}

      {clientSecret && (
        <Box>
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <CheckoutForm
              selectedPlan={selectedPlan}
              selectedCurrency={selectedCurrency}
              clientSecret={clientSecret}
              setSelectedCurrency={setSelectedCurrency}
            />
          </Elements>
        </Box>
      )}

      {/* {clientSecret && <SetupIntent clientSecret={clientSecret} />} */}
    </div>
  );
}
