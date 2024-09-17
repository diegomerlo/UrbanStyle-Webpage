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

const stock = false;
const rating = 4;

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

export default function Producto() {
  const [expanded, setExpanded] = React.useState(false);
  const [descExpanded, setDescExpanded] = React.useState(false);  // Estado para la descripción

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDescExpandClick = () => {  // Controla la expansión de la descripción
    setDescExpanded(!descExpanded);
  };

  const addToBasket = () => {
    console.log('Producto agregado al carrito');
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardHeader
        action={
          <Typography
            sx={{ marginTop: '1rem' }} // Aplica el estilo action
            variant='h5'
            color='textSecondary'
          >
            {accounting.formatMoney(15000)}
          </Typography>
        }
        title="THYERRY REMERA"
        subheader={stock ? "Hay Stock" : "No hay Stock"}
      />
      <CardMedia
        component="img"
        sx={{ height: "", paddingTop: '0.25%' }} // Aplica el estilo media
        image="https://batuk.com.ar/storage/photos/huoky-model-38.jpg"
        alt="THYERRY REMERA"
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
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p key={i}>&#11088;</p>
          ))}
      </CardActions>
      <Collapse in={descExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            La remera Thyerry es la elección ideal para quienes buscan un estilo sofisticado y una comodidad 
            sin igual. Fabricada en algodón 100% de alta calidad, esta prenda garantiza un tacto suave y un ajuste 
            cómodo que se adapta a tu cuerpo. Su diseño de corte clásico y el discreto logo en el pecho 
            la convierten en una pieza versátil para cualquier ocasión.
          </Typography>
        </CardContent>
      </Collapse>
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
          <Typography sx={{ marginBottom: 2 }}>Para mantener la remera Thyerry en óptimas condiciones, sigue estas recomendaciones:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            - Lavar a máquina en frío con colores similares.<br />
            - No usar blanqueador.<br />
            - Secar a baja temperatura o secar al aire para preservar la forma y el color.<br />
            - Planchar a baja temperatura si es necesario, evitando el logo.
          </Typography> 
          <Typography sx={{ marginBottom: 2 }}>
            Tabla de Talles:
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            - S: Pecho 46 cm, Largo 68 cm <br />
            - M: Pecho 49 cm, Largo 70 cm <br />
            - L: Pecho 52 cm, Largo 72 cm <br />
            - XL: Pecho 55 cm, Largo 74 cm
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
