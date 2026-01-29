const express = require('express');
const router = express.Router();
const {validateNewsletterSubscription,validateNewsletterId} = require('../validations/newsletter.validation');
const newsletter = require('../models/newsletter');

router.get("/",async(req,res)=>{
    try {
        const newsletters = await Newsletter.find().sort({createdAt:-1});
        res.status(200).json(newsletters);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

router.post("/",async(req,res)=>{
    try {
        validateNewsletterSubscription(req);
        const {email} = req.body; 

        const existingSubscription = await newsletter.findOne({email})
        if(existingSubscription){
            return res.status(400).json({message:"This email is already subscribed to the newsletter"});
        }
        const newSubscription = new newsletter({email});
        const savedSubscription = await newSubscription.save();
        res.status(201).json({
            message:"Subscribed to newsletter successfully",
            subscription:savedSubscription
        });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        validateNewsletterId(req)

        const subscription = await newsletter.findByIdAndDelete(req.params.id);
        if(!subscription){
            return res.status(404).json({message:"Subscription not found"});
        }
        res.status(200).json({message:"Subscription deleted successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

module.exports = router;