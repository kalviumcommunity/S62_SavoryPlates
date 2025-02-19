const express = require("express");
const { ObjectId } = require("mongoose").Types;
const Recipe=require('../model/recipe.model') // Import Recipe model
const User = require("../model/user.model"); // Import User model
const { getDB } =require("../db/mongo-client");

const router = express.Router();
router.use(express.json());

// ✅ GET all users
router.get("/users", async (req, res) => {
  try {
    const { usersCollection } = await getDB();
    const users = await usersCollection.find().toArray(); // Fetch all users
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ✅ GET all recipes
router.get("/recipe", async (req, res) => {
  try {
    const { recipesCollection } = await getDB();
    const recipes = await recipesCollection.find().toArray(); // Fetch all recipes
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ✅ CREATE a new recipe
router.post("/create", async (req, res) => {
  try {
    const { title, category, ingredients, instructions, cook_time, author } = req.body;

    if (!ObjectId.isValid(author)) {
      return res.status(400).json({ message: "Invalid author ID." });
    }

    const { usersCollection, recipesCollection } = await getDB();
    
    // Check if author exists
    const userExists = await usersCollection.findOne({ _id: ObjectId(author) });
    if (!userExists) {
      return res.status(404).json({ message: "Author not found." });
    }

    // Create and insert new recipe
    const newRecipe = {
      title,
      category,
      ingredients,
      instructions,
      cook_time,
      author: ObjectId(author),
    };
    const result = await recipesCollection.insertOne(newRecipe);

    return res.status(201).json({ message: "Recipe created successfully!", data: result.ops[0] });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE a recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe ID." });
    }

    const { recipesCollection } = await getDB();
    const deleteResult = await recipesCollection.deleteOne({ _id: ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    return res.status(200).json({ message: "Recipe deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE a recipe by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe ID." });
    }

    const { recipesCollection } = await getDB();
    const updateResult = await recipesCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );

    if (!updateResult.value) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    return res.status(200).json({ message: "Recipe updated successfully!", data: updateResult.value });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
