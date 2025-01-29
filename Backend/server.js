if(process.env.NODE_ENV !=='PRODUCTION'){
    require('dotenv').config();
}
const express = require('express');
const {getDB,connection} = require('./src/db/mongo-client.js');
const router=require('./src/routes/routes.js')
const cors=require('cors')

const app = express();
app.use(express.json())
app.use(cors())
app.use('/CRUD',router);
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const checkStatus = await connection.connect();
    const readyState = connection.topology.isConnected()
    ? 'connected'
    : 'disconnected';
    res.send(`<h3>Database Connection Status : ${readyState}</h3>`);
});

app.listen(port,()=>{
    console.log(`Your server is running on http://localhost:${port}`);
});
