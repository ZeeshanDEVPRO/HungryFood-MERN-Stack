const mongoose = require('mongoose');

const URI ="mongodb+srv://professionalid2003:singleuse@cluster0.xy797ci.mongodb.net/?retryWrites=true&w=majority";

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