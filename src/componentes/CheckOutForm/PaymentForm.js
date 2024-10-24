import React from 'react'
import Review from './Review'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button, Divider, Typography } from '@mui/material'
import { getBasketTotal } from '../../reducer'
import { useStateValue } from '../../StateProvider'
import accounting from 'accounting'


const stripePromise = loadStripe("pk_test_51QDEbRJrT6UijVHwfbEd3jTLyBC3fzaJi5KGmE2egF8YFddEDCWGglAHkXRWUA6BC2iBjol0tBb9cMcja4OWhAvE00h5nzk27K")

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

const CheckOutForm = ({ backStep, nexStep }) => {

  const[{basket},dispatch] = useStateValue();

  return (
    <form>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div style={{display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
        <Button variant='outlined' onClick={backStep}>Atrás</Button>
        <Button disabled={true} type='submit' variant='contained' color='primary'>{`Pagar ${accounting.formatMoney(getBasketTotal(basket),"$")}`}</Button>
      </div>
    </form>
  )
}

const PaymentForm = ({ backStep, nexStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Método de Pago
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckOutForm backStep={backStep} nexStep={nexStep} />
      </Elements>
    </>
  )
}

export default PaymentForm
