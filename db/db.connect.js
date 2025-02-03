const mongoose=require('mongoose');
require('dotenv').config();
const mongo=process.env.MONGODB;

const initializeDatabase=async()=>{
    await mongoose.connect(mongo).then(()=>console.log("Database Connected.")).catch(error=>console.log('Database not connected.'))
}

module.exports={initializeDatabase}