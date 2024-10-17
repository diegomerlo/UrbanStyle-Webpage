import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckoutCard from "./CheckOutCard";  // Asegúrate de tener este componente implementado correctamente
import Total from './Total';
import {useStateValue} from '../StateProvider'


const CheckOutPage = () => {
  const [{basket},dispatch] = useStateValue();

  function FormRow() {
    return (
      <React.Fragment>
        {basket?.map((item) => (
          <Grid item xs={12} sm={8} md={6} lg={4}> {/* Coloca la clave aquí */}
            <CheckoutCard key={item.id} producto={item}/>  {/* Pasas el producto a Producto */}
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" gutterBottom variant="h4">
            Carro
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={9} container spacing={2}>
          <FormRow />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Typography align="center" gutterBottom variant="h4">
            <Total/>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckOutPage;
