const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const { validateCreateContactData } = require('../validations/contact.validation');

router.get("/",async(req,res)=>{
    try {
        const contacts = await Contact.find().sort({createdAt:-1});
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

router.post("/",async(req,res)=>{
    try {
        validateCreateContactData(req);
        const {fullName,email,mobileNumber,city} = req.body;
        const contact = new Contact({
            fullName,
            email,
            mobileNumber,
            city
        })

        const newContact = await contact.save();
        res.status(201).json({
            message:"Contact created successfully",
            contact:newContact
        });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if(!contact){
            return res.status(404).json({message:"Contact not found"});
        }
        res.json({message:"Contact deleted successfully"}); 
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

module.exports = router;