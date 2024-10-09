import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Producto from './Producto';
import Productoo from '../producto-data'; // Asegúrate de que estás importando el array de productos

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Productos() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {Productoo.map((producto) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Producto key={producto.id} producto={producto} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
