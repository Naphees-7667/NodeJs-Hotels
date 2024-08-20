const express = require('express');
const router = express.Router();

const menuItem = require('../models/menuItem.models.js');
const { route } = require('./person.routes.js');

router.post('/',async(req,res) => {
    try{
        const data = req.body;
        const newMenuItem = new menuItem(data);
        const response = await newMenuItem.save();
        console.log("Data Saved Successfully")
        res.status(201).send(response);
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.get('/',async (req,res) => {
    try{
        const data = await menuItem.find()
        console.log("Data fetched Successfully")
        if(data.length == 0){
            res.status(404).send({message:"Database is empty"});
        }
        res.send(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.get('/:tasteOption', async (req,res) => {
    try{
        const tasteOption = req.params.tasteOption;
        if(tasteOption == 'Sweet' || tasteOption == 'Sour' || tasteOption == 'Spicy' || tasteOption == 'Bitter'){

            const data = await menuItem.find({taste:tasteOption})
            if(data.length == 0){
                res.status(404).send({message:"Database is empty"});
            }
            else{
                console.log("Data Fetched Successfully")
                res.status(200).json(data)
            }
        }
        else{
            res.status(400).json({err:"Invalid taste option"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.put('/:id', async (req,res) => {
    try{

        const id = req.params.id;
        const updateData = req.body;

        const reponse = await menuItem.findByIdAndUpdate(id,updateData);
        
        if(!reponse){
            res.status(404).send({message:"Data not found"});
        }
        else{
            console.log("Data Updated Successfully")
            res.status(200).json(reponse);
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.delete('/:id',async (req,res) => {
    try{
        const id = req.params.id;
        const response = await menuItem.findByIdAndDelete(id);
        if(!response){
            res.status(404).send({message:"Data not found"});
        }
        else{
            console.log("Data Deleted Successfully")
            res.status(200).json(response);
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:"Internal Server Error"})
    }
})
module.exports = router