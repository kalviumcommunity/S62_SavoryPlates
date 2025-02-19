
if(process.env.NODE_ENV !=='PRODUCTION'){
    require('dotenv').config();
}
const mongoClient = require('mongodb').MongoClient;

const connection = new mongoClient(process.env.DB_URL)
async function getDB(){
    let db = connection.db("SavoryPlates");
    const recipesCollection = db.collection('Recipes');
    const usersCollection = db.collection('User');
    
    // Return both collections so you can use them elsewhere
    return { recipesCollection, usersCollection };
}

// Example function to fetch users
async function getUsers() {
    try {
        const { usersCollection } = await getDB(); // Fetch the users collection
        const users = await usersCollection.find().toArray(); // Convert to array to return all users
        return users;
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
}

// Example function to fetch recipes
async function getRecipes() {
    try {
        const { recipesCollection } = await getDB(); // Fetch the recipes collection
        const recipes = await recipesCollection.find().toArray(); // Convert to array to return all recipes
        return recipes;
    } catch (err) {
        console.error('Error fetching recipes:', err);
        throw err;
    }
}

module.exports = {getDB, connection,getRecipes,getUsers};