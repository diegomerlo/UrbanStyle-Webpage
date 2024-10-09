import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckoutCard from "./CheckOutCard";  // Asegúrate de tener este componente implementado correctamente
import productos from '../producto-data';  // Importamos los datos de los productos
import Producto from './Producto';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



const CheckOutPage = () => {

  function FormRow() {
    return (
      <React.Fragment>
        {productos?.map((item) => (
          <Grid key={item.id} item xs={12} sm={8} md={6} lg={4}> {/* Coloca la clave aquí */}
            <Producto producto={item}/>  {/* Pasas el producto a Producto */}
            <CheckoutCard producto={item} />  {/* Pasas el producto a CheckoutCard */}
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
            Shopping Cart
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={9} container spacing={2}>
          <FormRow />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Typography align="center" gutterBottom variant="h4">
            Total
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckOutPage;
