const Vendor = require('../models/Vendor');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const secretKey = process.env.WhatIsYourName


const vendorRegister = async (req, res)=>{
    const {name, email, password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
       
        const newVendor = new Vendor({
            name,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(400).json({ success: true,  message: "Vendor registered successfully"});
        console.log("Vendor registered successfully");

    }catch(err){
        console.error("Error finding email", err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const vendorLogin =  async(req, res)=>{
    const {email, password}= req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(201).json({ error: "Invalid username or password" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" })

        const vendorId = vendor._id;

        res.status(200).json({ success: "Login successful", token, vendorId })
        
        console.log(email, "this is token", token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllVendors = async (req, res) => {
    try {
        const vendors =  await Vendor.find().populate('firm');
        res.json({vendors});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
        
    }
}


const getVendorById = async (req, res) => {
    const vendorId = req.params.id;
    try {
        const vendor  = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error: "Vendor not found"});
        }
        const vendorFirmId = vendor.firm[0]._id;
        res.status(200).json({ vendorId, vendorFirmId, vendor })
        console.log(vendorFirmId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById}