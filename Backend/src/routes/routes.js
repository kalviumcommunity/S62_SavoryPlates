const mongoose=require('mongoose')
const express=require('express')
const router=express.Router()
const { ObjectId } = require('mongodb');
const {getDB} = require('../db/mongo-client.js');
router.use(express.json())

router.get('/user',async(req,res)=>{
    try{
        const db=await getDB();
        console.log(db);
        const userData=await db.find().toArray();
        console.log(userData);
        return res.status(200).send(userData);
    }catch(err){
        return res.status(500).send({message:err.message});
    }
})
router.post('/create',async(req,res)=>{
    try{
        const db=await getDB();
        console.log(db,req.body);
        const insertData=await db.insertOne(req.body);
        return res.status(201).send({message:"Data inserted successfully",insertData});

    }catch(err){
        return res.status(500).send({message:err.message});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const db=await getDB();
        console.log(db);
        const {id}=req.params;
        const deleteUser=await db.deleteOne({_id:new ObjectId(id)});
        return res.status(200).send({message:"Deleted successfully",deleteUser})

    }catch(err){
        return res.status(500).send({message:err.message});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const db=await getDB();
        console.log(db);
        const {id}=req.params;
        const updateUser=await db.updateOne({_id:new ObjectId(id)}, { $set: req.body })
        return res.status(200).send({message:"Updated successfully",updateUser})

    }catch(err){
        return res.status(500).send({message:err.message});
    }
})

module.exports=router;