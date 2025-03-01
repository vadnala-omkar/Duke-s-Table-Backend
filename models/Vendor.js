const mongoose = require('mongoose');
const { type } = require('os');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firm:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Firm"
    }]
    
});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;