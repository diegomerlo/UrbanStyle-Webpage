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
import {useStateValue} from '../StateProvider'
import { actionTypes } from '../reducer';

const stock = false;

export default function CheckoutCard({producto : {id , name, productType, image,price, rating, description}}) {

  const [{basket},dispatch] = useStateValue();
  const [expanded, setExpanded] = React.useState(false);

  const removeItem = () => dispatch({
    type: actionTypes.REMOVE_ITEM,
    id: id,

    

  })

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardHeader
        action={
          <Typography
            sx={{ marginTop: '1rem' }} // Aplica el estilo action
            variant='h5'
            color='textSecondary'
          >
            {accounting.formatMoney(price)}
          </Typography>
        }
        title={name}
        subheader={stock ? "Hay Stock" : "No hay Stock"}
      />
      <CardMedia
        component="img"
        sx={{ height: "", paddingTop: '0.25%' }} // Aplica el estilo media
        image={image}
        alt={name}
      />
      <CardActions disableSpacing sx={{display: "flex", justifyContent: "space-between", textAlign: "center"}}>
        <div className='cardRating' style={{display: "flex"}}>
            {Array(rating)
          .fill()
          .map((_, i) => (
            <p key={i}>&#11088;</p>
          ))}
        </div>
        <IconButton>
        <DeleteIcon fontSize='large' onClick={removeItem}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
