import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Producto from './Producto';
import { db } from '../firebase';  // Asegúrate de que este path es correcto
import { collection, getDocs } from 'firebase/firestore';

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
  const [productos, setProductos] = React.useState([]);

  // Obtener productos desde Firestore
  React.useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, 'productos'));  // Asume que la colección se llama "productos"
      const productosArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),  // Asegura que los datos del producto estén completos
      }));
      setProductos(productosArray);
    };

    obtenerProductos();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ paddingTop: '8%', paddingLeft: '2%' }}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={producto.id}>
            <Producto producto={producto} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
