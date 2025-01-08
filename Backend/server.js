if(process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config()
}
const express = require('express');
const connectDatabase = require('./db/database');
const app =express();
const PORT=process.env.PORT||3010
app.get('/ping',(request,response)=>{
    return response.send('pong')
})
app.listen(PORT,()=>{
    connectDatabase()
    console.log(`server is running in http://localhost:${PORT}`)
})
