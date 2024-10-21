import React from 'react';
import accounting from 'accounting'
import { Button } from '@mui/material';
import { getBasketTotal } from '../reducer';
import {useStateValue} from '../StateProvider'

const Total = () => {
    const [{basket},dispatch] = useStateValue();

    return (
        <div className='root' style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "20vh"}}>
            <h5>Total productos: {basket?.length}</h5>
            <h5>{accounting.formatMoney(getBasketTotal(basket), "$")}</h5>
            <Button className='boton' variant="contained" color="secondary" sx={{marginTop: "2rem"}}>Comprar</Button>
        </div>
    )
}

export default Total
