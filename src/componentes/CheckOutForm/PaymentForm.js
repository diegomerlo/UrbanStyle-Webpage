import React, { useState } from 'react';
import Review from './Review';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button, CircularProgress, Divider, Typography } from '@mui/material';
import { actionTypes, getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import accounting from 'accounting';
import axios from 'axios';

const stripePromise = loadStripe("pk_test_51QDEbRJrT6UijVHwfbEd3jTLyBC3fzaJi5KGmE2egF8YFddEDCWGglAHkXRWUA6BC2iBjol0tBb9cMcja4OWhAvE00h5nzk27K");

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      fontSize: "18px",
      "::placeholder": {
        color: "#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

const CheckOutForm = ({ backStep, nextStep }) => {
  const [{ basket }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:3001/api/checkout", {
          id,
          amount: getBasketTotal(basket) * 100,
        });

        dispatch({
          type: 'SET_PAYMENT_MESSAGE',
          paymentMessage: data.message
        });

        if (data.message === "Successful Payment ") {
          dispatch({ type: actionTypes.EMPTY_BASKET });
        }

        elements.getElement(CardElement).clear();
        nextStep();
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'SET_PAYMENT_MESSAGE',
          paymentMessage: "Error en el pago"
        });
        nextStep();
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
        <Button variant='outlined' onClick={backStep}>Atrás</Button>
        <Button disabled={loading} type='submit' variant='contained' color='primary'>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            `Pagar ${accounting.formatMoney(getBasketTotal(basket), "$")}`
          )}
        </Button>
      </div>
    </form>
  );
};

const PaymentForm = ({ backStep, nextStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Método de Pago
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckOutForm backStep={backStep} nextStep={nextStep} />
      </Elements>
    </>
  );
};

export default PaymentForm;
