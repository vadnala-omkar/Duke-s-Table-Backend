const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');



const app = express();
const port = process.env.PORT || 8000;



dotenv.config(); 
app.use(cors());
app.use(bodyParser.json());



mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB", err)
    });


app.listen(port, ()=>{
    console.log("Server Started")
})
    
app.use('/home', (req, res)=>{
    res.send("Welcome to Dukes Table");
})
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes)
app.use('/uploads', express.static('uploads'));
