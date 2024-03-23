const mongoose = require('mongoose');
require('dotenv').config()

const URI = process.env.MONGO_URL;

const connectDB=async()=>{
    try{
        await mongoose.connect(URI);
        console.log('connection success');
    }
    catch(e){
        console.error("failed connection");
        process.exit(0);
    }
}
connectDB();