const mongoose=require('mongoose')
const express=require('express')
const router=express.Router()
const { ObjectId } = require('mongodb');
const {getDB} = require('../db/mongo-client.js');
router.use(express.json())

router.get('/recipe',async(req,res)=>{
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
        const { title, category, ingredients, instructions, cook_time, author } = req.body;

    // Manual Validation
    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return res.status(400).json({ message: "Title is required and must be at least 3 characters long." });
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ message: "Category is required and must be a non-empty string." });
    }
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ message: "Ingredients must be a non-empty array." });
    }
    for (const ing of ingredients) {
      if (!ing.ingredient_name || typeof ing.ingredient_name !== "string" || ing.ingredient_name.trim() === "") {
        return res.status(400).json({ message: "Each ingredient must have a valid name." });
      }
      if (!ing.quantity || (typeof ing.quantity !== "string" && typeof ing.quantity !== "number")) {
        return res.status(400).json({ message: "Each ingredient must have a valid quantity." });
      }
      if (!ing.unit || typeof ing.unit !== "string" || ing.unit.trim() === "") {
        return res.status(400).json({ message: "Each ingredient must have a valid unit." });
      }
    }
    if (!Array.isArray(instructions) || instructions.length === 0 || instructions.some(instr => typeof instr !== "string" || instr.trim() === "")) {
      return res.status(400).json({ message: "Instructions must be a non-empty array of strings." });
    }
    if (!cook_time || typeof cook_time !== "string" || cook_time.trim() === "") {
      return res.status(400).json({ message: "Cook time is required and must be a non-empty string." });
    }
    if (!author || typeof author !== "string" || author.trim() === "") {
      return res.status(400).json({ message: "Author is required and must be a non-empty string." });
    }
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