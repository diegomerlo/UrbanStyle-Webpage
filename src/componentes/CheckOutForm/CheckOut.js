import React from 'react';
import { AppBar, Toolbar, Typography, Paper, CssBaseline, Stepper, Step, StepLabel, Button, Link, Box } from '@mui/material';
import { styled } from '@mui/system';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      
      <Box sx={{ width: 'auto', margin: '0 auto', padding: 2 }}>
        <StyledPaper>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && <AddressForm />}
              {activeStep === 1 && <PaymentForm />}
              {activeStep === 2 && <Review />}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack}>
                    Back
                  </Button>
                )}
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          )}
        </StyledPaper>
        <Copyright />
      </Box>
    </React.Fragment>
  );
}
