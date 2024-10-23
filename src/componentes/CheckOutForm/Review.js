import { List, ListItem, ListItemText, Typography } from '@mui/material'
import { useStateValue } from '../../StateProvider'
import { getBasketTotal } from '../../reducer'
import accounting from 'accounting'

const Review = () => {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>

      {
          basket?.map(product => (
            <ListItem key={product.name}>
              <ListItemText primary={product.name} secondary={`Cantidad : ${1}`}/>
              <Typography>
                {accounting.formatMoney(product.price, "$")}
              </Typography>
            </ListItem>
          ))
        }
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1">
            {accounting.formatMoney(getBasketTotal(basket), "$")}
          </Typography>
        </ListItem>

      </List>
    </div>
  )
}

export default Review
