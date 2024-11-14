import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckoutCard from "./CheckOutCard";  // Asegúrate de tener este componente implementado correctamente
import Total from './Total';
import { useStateValue } from '../StateProvider';

const CheckOutPage = () => {
  // En CheckOutPage
  const [{ basket }, dispatch] = useStateValue();
  console.log('Contenido del carrito:', basket);  // Verifica si el carrito tiene los productos correctos
 // Usamos el estado del carrito desde el context

  // Verifica si el carrito está vacío y muestra un mensaje si es así
  const isBasketEmpty = basket.length === 0;

  const handleRemove = (id) => {
    dispatch({
      type: "REMOVE_ITEM",  // Acción para eliminar el producto del carrito
      id,
    });
  };

  function FormRow() {
    return (
      <React.Fragment>
        {basket?.map((item) => (
          <Grid item xs={12} sm={8} md={6} lg={4} key={item.id}>
            <CheckoutCard producto={item} onRemove={handleRemove} />  {/* Pasa la función de eliminar como prop */}
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
            {isBasketEmpty ? "Tu carrito está vacío" : "Carro"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={9} container spacing={2}>
          {!isBasketEmpty && <FormRow />}  {/* Solo muestra los productos si el carrito no está vacío */}
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          {!isBasketEmpty && (
            <Typography align="center" gutterBottom variant="h4">
              <Total />  {/* Muestra el total solo si hay productos en el carrito */}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckOutPage;
