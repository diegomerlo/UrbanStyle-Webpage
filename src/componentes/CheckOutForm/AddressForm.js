import { Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import AddressInput from './AddressInput'; // Asegúrate de que el nombre de importación sea correcto
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import { type } from '@testing-library/user-event/dist/type';

const AddressForm = ({nextStep}) => {
  const methods = useForm();
  const [{ shippingData }, dispatch] = useStateValue();
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Dirección de envío
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => {
            dispatch({
              type: actionTypes.SET_SHIPPINGDATA,
              shippingData: data,
            });
            nextStep();
        })}>
          <Grid container spacing={3}>
            <AddressInput required name='firstName' label='Nombre' />
            <AddressInput required name='lastName' label='Apellido' />
            <AddressInput required name='address1' label='Dirección' />
            <AddressInput name='email' label='Correo electrónico' />
            <AddressInput required name='city' label='Ciudad' />
            <AddressInput required name='postCode' label='Código Postal' />
          </Grid>
          <div style={{display: "flex", justifyContent:"space-between", marginTop:"1rem"}}>
          <Button component={Link} color="black" to="/checkout-page">Volver a la página de pago</Button>
          <Button type="submit" variant="contained" color="primary">Siguiente</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
