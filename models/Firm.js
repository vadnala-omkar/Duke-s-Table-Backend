const mongoose = require('mongoose');
const { type } = require('os');
const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        require: true,
        unique: true
    },
    area:{
        type: String,
        required: true
    },
    category:{
        type:[{
            type:String,
            enum: ["veg", "non-veg"]
        }]
    },
    region:{
        type:[{
            type:String,
            enum: ["south-india", "north-india", 'chinese', "bakery"]
        }]
    },
    offer:{
        type:String,
    },
    image:{
        type: String,
    },
    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor"
        }
    ]
})

const Firm = mongoose.model("Firm", firmSchema);
module.exports = Firm;