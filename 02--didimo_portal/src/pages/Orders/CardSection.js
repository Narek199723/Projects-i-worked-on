/**
 * Use the CSS tab above to style your Element's container.
 */
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "./CardSectionStyles.css";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

function CardSection() {
  return (
    <React.Fragment>
      <div class="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
        <label
          class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink Mui-disabled Mui-disabled MuiFormLabel-filled"
          data-shrink="true"
        >
          Credit card details
        </label>
        <div class="MuiInputBase-root MuiInput-root MuiInput-underline Mui-disabled Mui-disabled MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
          <CardElement
            id="card-element"
            options={CARD_ELEMENT_OPTIONS}
            //onChange={handleChange}
          />
        </div>
        <img
          alt="Powered by Stripe"
          src={`/stripe/powered_by_stripe.png`}
          style={{ marginTop: "3px", marginRight: "auto" }}
          //className={className}
        />
      </div>
    </React.Fragment>
  );
}
/*
<div class="form-row">
        <label
          for="card-element"
          class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink Mui-disabled Mui-disabled MuiFormLabel-filled"
        >
          Credit card details
        </label>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          //onChange={handleChange}
        />
        <img
          alt="Powered by Stripe"
          src={`/stripe/powered_by_stripe.png`}
          //className={className}
        />
      </div>
*/
export default CardSection;
