import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from "react";
import AddresForm from "./AddressForm"
import PaymentForm from "./PaymentForm"
import Confirmation from './Confirmation';
import { useStateValue } from '../../StateProvider';

// Estilos usando el sistema styled de MUI
const Layout = styled('main')(({ theme }) => ({
  width: 'auto',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(3),
  },
}));

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [{ paymentMessage }, dispatch] = useStateValue();
  const steps = ["Shipping address", "Payment details"];

  const nextStep = () => setActiveStep((preActivestep) => preActivestep + 1);
  const backStep = () => setActiveStep((preActivestep) => preActivestep - 1);


  const Form = () => activeStep === 0 ? <AddresForm nextStep={nextStep} /> : <PaymentForm backStep={backStep} nextStep={nextStep} />


  return (
    <Layout>
      <StyledPaper>
        <Typography component='h1' variant='h4' align='center'>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map(step => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {
          activeStep === steps.length ? (
            <Confirmation message={paymentMessage} /> // Asegúrate de que `message` sea utilizado en Confirmation
          ) : (
            <Form step={activeStep} />
          )
        }

      </StyledPaper>
    </Layout>
  );
};

export default Checkout;
