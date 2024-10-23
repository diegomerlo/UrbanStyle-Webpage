import React from 'react'
import Review from './Review'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe("")

const PaymentForm = ({backStep, nexStep}) => {
  return (
    <>
      <Review/>

    </>
  )
}

export default PaymentForm
