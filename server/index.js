const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();

//middleware

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json())

app.post("/api/checkout", async (req, res) => {
    console.log(req.body);
    res.send("recibido")
});


app.listen(3001, () => {
    console.log("Server listening port", 3001);
});