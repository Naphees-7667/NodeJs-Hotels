const express = require('express');
const router = express.Router();

const passport = require('../middleware/auth.js');
const authMiddleware = passport.authenticate('local', {session: false});

const Person = require('../models/person.models.js');

router.post('/',async (req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save()
        console.log("Data Saved Successfully")
        res.status(201).send(response);
    }  
    catch(err){
        console.log(err);
        res.status(500).send({err:"Internal Server Error"});
    }
})


router.get('/',authMiddleware,async (req,res)=>{
    try{
        const data = await Person.find();
        console.log("Data fetched Successfully")
        if(data.length == 0){
            res.status(404).send({message:"Database is empty"});
        }
        res.send(data);
    }
    catch(err){
        console.log(err);
        res.status(500).send({err:"Internal Server Error"});
    }
})

router.get('/:identifier',authMiddleware,async (req,res) => {
    try{

        const Identifier = req.params.identifier;
        let data

        if(['manager','chef','waiter'].includes(Identifier)){
            data = await Person.find({work:Identifier});
        }
        else{
            data = await Person.findOne({username:Identifier});
        }

        if(!data || Array.isArray(data) && data.length == 0){
            res.status(404).send({message:"Data not found"});
        }
        else{
            console.log("Data fetched Successfully")
            res.status(200).json(data);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({err:"Internal Server Error"});
    }
})

// router.get('/:username',authMiddleware,async (req,res) => {
//     try{
//         const username = req.params.username;
//         const data = await Person.findOne({username:username});
//         if(!data){
//             res.status(404).send({message:"Data not found"});
//         }
//         else{
//             console.log("Data fetched Successfully")
//             res.status(200).json(data);
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send({err:"Internal Server Error"});
//     }
// })

// router.get('/work/:workType',authMiddleware,async (req,res) => {
//     try{
//         const workType = req.params.workType;
//         const data = await Person.find({work:workType});
//         if(data.length == 0){
//             res.status(404).send({message:"Currently Database do not contain this work type"});
//         }
//         else{
//             console.log("Data fetched Successfully")
//             res.status(200).json(data);
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send({err:"Internal Server Error"});
//     }
// })

router.put('/:id',async (req,res) => {
    try{
        const id = req.params.id;
        const updateData = req.body;
        const response = await Person.findByIdAndUpdate(id,updateData,{
            new:true,
            runValidators:true
        });
        if(!response){
            res.status(404).send({message:"Data not found"});
        }
        else{
            console.log("Data Updated Successfully")
            res.status(200).json(response);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({err:"Internal Server Error"});
    }
})

router.delete('/:id',async (req,res) => {
    try{
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
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
        res.status(500).json({err:"Internal Server Error"});
    }
})

module.exports = router