const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();
const secretkey = process.env.whatIsYourName;

const vendorRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json({message: "Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            name,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message: "Vendor registered successfully"});
        console.log("Vendor registered successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}


const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        const token = jwt.sign({vendorId: vendor._id}, secretkey, {expiresIn: "1h"});


        res.status(200).json({message: "Vendor logged in successfully", token});
        console.log(email, "thi is token", token);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}



module.exports = {vendorRegister, vendorLogin};