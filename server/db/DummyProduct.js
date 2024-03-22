const mongoose = require("mongoose");

const dummyProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    restaurant: {
        type: String,
        required: true,
    },
    ratings: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
        default: "dummyProduct"
    }
});

module.exports = mongoose.model("DummyProduct", dummyProductSchema);
