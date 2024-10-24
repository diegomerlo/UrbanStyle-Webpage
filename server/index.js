const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = new Stripe("sk_test_51QDEbRJrT6UijVHw2UtQOirEXVfaAFkI2VQQ1ujICBwQjwZnMcXhRBwN8ZQCsFJCuEMjeScV8853WnaAsVj2L4EN005Msx7Vc4");

const app = express();

//middleware

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json())

app.post("/api/checkout", async (req, res) => {
    console.log(req.body);
    const {id,amount} = req.body;

    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "ARS",
            description: "Basket de productos",
            payment_method:id,
            confirm: true
        })

        console.log(payment)
        return res.status(200).json({message: "Pago exitoso"});

    }catch(error){
        return res.json({message: error.raw.message})
    }
    
});


app.listen(3001, () => {
    console.log("Server listening port", 3001);
});