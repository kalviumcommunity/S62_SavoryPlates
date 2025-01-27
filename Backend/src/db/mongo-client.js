
if(process.env.NODE_ENV !=='PRODUCTION'){
    require('dotenv').config();
}
const mongoClient = require('mongodb').MongoClient;

const connection = new mongoClient(process.env.DB_URL)
async function getDB(){
    let db = connection.db("SavoryPlates");
    db=db.collection('Recipes');
    return db;
}

module.exports = {getDB, connection};