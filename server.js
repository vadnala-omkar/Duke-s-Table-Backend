const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');
const firmRoutes = require('./routes/firmRoutes');

const vendorRoutes = require('./routes/vendorRoutes');

const app = express();
const port = 3000;

dotenv.config();
app.use(bodyparser.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB", err)
    });

app.use('/vendor', vendorRoutes);


app.listen(port, ()=>{
    console.log("Server Started")
})
app.use('/home', (req, res)=>{
    res.send("Welcome to Home Page");
})
app.use('/firm', firmRoutes);