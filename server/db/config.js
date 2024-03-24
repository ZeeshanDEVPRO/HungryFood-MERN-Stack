const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.xy797ci.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        mongoose.connect(URI);
        console.log('Connection successful');
    } catch (error) {
        console.error('Connection failed:', error);
        process.exit(1);
    }
};

connectDB();
