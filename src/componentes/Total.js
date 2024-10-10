import React from 'react'
import accounting from 'accounting'
import { Button } from '@mui/material'

const Total = () => {

    return (
        <div className='root' style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "20vh"}}>
            <h5>Total productos: 2</h5>
            <h5>{accounting.formatMoney(120, "$")}</h5>
            <Button className='boton' variant="contained" color="secondary" sx={{marginTop: "2rem"}}>Comprar</Button>
        </div>
    )
}

export default Total
