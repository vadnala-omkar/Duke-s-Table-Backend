const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { error } = require('console');
dotenv.config()
const secretkey = process.env.whatIsYourName

const verifyToken = async (req, res, next)=>{
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error: "thoken is required"});
    }
    try{
        const decoded = jwt.verify(token, secretkey)
        const vendor = await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res.status(404).json({error: "vendor not found"})
        }

        req.vendorId = Vendor._id
        next()
    }
    catch(err){
        console.error(err)
        return res.status(500).json({error: "Invalid Token"})
    }
}
module.exports = verifyToken;