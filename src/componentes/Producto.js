import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddShoppingCart } from '@mui/icons-material';
import accounting from 'accounting';
import AddIcon from '@mui/icons-material/Add';  // Icono de '+'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ExpandButtonOverlay = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '140px',
  right: '15px',
  color: theme.palette.common.white,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Botón semitransparente sobre la imagen
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}));

export default function Producto({ producto: { id, nombre, tipo, imagenUrl, precio, calificacion, descripcion, stock } }) {
  const [expanded, setExpanded] = React.useState(false);
  const [{ basket }, dispatch] = useStateValue();
  const [descExpanded, setDescExpanded] = React.useState(false);  // Estado para la descripción

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDescExpandClick = () => {  // Controla la expansión de la descripción
    setDescExpanded(!descExpanded);
  };

  const addToBasket = () => {
    console.log('Producto agregado al carrito');
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id,
        nombre,
        tipo,
        imagenUrl,
        precio,
        calificacion,
        descripcion,
        stock,
      },
    });
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardHeader
        action={
          <Typography sx={{ marginTop: '1rem' }} variant='h5' color='textSecondary'>
            {accounting.formatMoney(precio)}
          </Typography>
        }
        title={nombre}
        subheader={stock ? "Hay Stock" : "No hay Stock"}
      />
      <CardMedia
        component="img"
        sx={{ height: "", paddingTop: '0.25%' }} // Aplica el estilo media
        image={imagenUrl}
        alt={nombre}
      />
      {/* Botón de expansión sobre la imagen */}
      <ExpandButtonOverlay
        expand={descExpanded}
        onClick={handleDescExpandClick}
        aria-expanded={descExpanded}
        aria-label="show description"
      >
        <AddIcon />
      </ExpandButtonOverlay>
      <CardActions disableSpacing>
        <IconButton aria-label='Add to Cart' onClick={addToBasket}>
          <AddShoppingCart fontSize='large' />
        </IconButton>
        {Array(calificacion)
          .fill()
          .map((_, i) => (
            <p key={i}>&#11088;</p>
          ))}
      </CardActions>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {tipo}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>
            {descripcion}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
