import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import accounting from 'accounting';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

export default function CheckoutCard({
  producto: { id, nombre, tipo, imagenUrl, precio, calificacion, descripcion, stock }
}) {
  const [{ basket }, dispatch] = useStateValue();
  const [expanded, setExpanded] = React.useState(false);

  const removeItem = () => {
    dispatch({
      type: actionTypes.REMOVE_ITEM,
      id: id,
    });
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardHeader
        action={
          <Typography sx={{ marginTop: '1rem' }} variant="h5" color="textSecondary">
            {accounting.formatMoney(precio)}
          </Typography>
        }
        title={nombre}
        subheader={stock ? "Hay Stock" : "No hay Stock"}
      />
      <CardMedia
        component="img"
        sx={{ height: 'auto', paddingTop: '0.25%' }} // Estilo ajustado para imagen
        image={imagenUrl}
        alt={nombre}
      />
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
        <div className="cardRating" style={{ display: 'flex' }}>
          {Array(calificacion)
            .fill()
            .map((_, i) => (
              <p key={i}>&#11088;</p>
            ))}
        </div>
        <IconButton onClick={removeItem}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
