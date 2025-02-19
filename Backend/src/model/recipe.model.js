const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    ingredient_name: { type: String, required: true },
    quantity: { type: String, required: true },  // Can be a string to allow flexible inputs like "1 cup" or "2 tsp"
    unit: { type: String, required: true }
});

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: [ingredientSchema], required: true },
    instructions: { type: [String], required: true }, // Array of step-by-step instructions
    cook_time: { type: Number, required: true },  // Storing as a number (in minutes)
    author: { type: String, required: true },
    created_at: { type: Date, default: Date.now } , // Auto-generate timestamp
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
