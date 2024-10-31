import { Divider, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const Confirmation = ({ message }) => {
    console.log(message)
    return (
    <>
            <Typography variant='h6'>{message}</Typography>
            <Divider/>
            <Typography variant='subtitule2' gutterbottom>
                {message === "Successful Payment"
                ? "Your booking reference : Rgh8787878lkj"
                : ""}
            </Typography>
            <Button component={Link} to = '/' variant='oulkined' type='buttom'>
                    Back to home Page
            </Button>
        
        </>
    )
}

export default Confirmation