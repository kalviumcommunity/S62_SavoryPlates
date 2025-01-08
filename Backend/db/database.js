if(process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config()
}
const mongoose=require('mongoose')
const connectDatabase=()=>{
    mongoose
    .connect(process.env.DB_URL)
    .then((data)=>console.log('Database connected successfully'))
    .catch((err)=>console.log('Database connection failed',err.message))

}
module.exports=connectDatabase;