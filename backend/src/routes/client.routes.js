const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const { upload, processImage } = require('../middleware/upload');

router.get('/',async(req,res)=>{
    try {
        const clients = await Client.find().sort({createdAt:-1});
        res.json(clients)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const client = await Client.findById(req.params.id);
        if(!client){
            return res.status(404).json({message:"Client not found"});
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

router.post("/",upload.single('image'),processImage,async(req,res)=>{
    try {
        const {name,description,designation} = req.body;
        if(!req.file){
            return res.status(400).json({message:"Image file is required"});
        }
        const client = new Client({
            name,
            description,
            designation,
            image:req.file.filename
        })
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({message:error.message});  
    }
})

router.put("/:id",upload.single('image'),processImage,async(req,res)=>{
    try {
        const {name,description,designation} = req.body;
        const client = await Client.findById(req.params.id);
        if(!client){
            return res.status(404).json({message:"Client not found"});
        }
        client.name = name;
        client.description = description;
        client.designation = designation;

        if(req.file){
            client.image = req.file.filename;
        }
        const updatedClient = await client.save();
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if(!client){
            return res.status(404).json({message:"Client not found"});
        }
        await res.status(200).json({message:"Client deleted successfully"});
    } catch (error) {
       res.status(500).json({message:error.message}); 
    }
})

module.exports = router;