import mongoose from "mongoose";
import Restaurant from "./Restaurant.js";
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    name: String, 
    description: String,
    image: String,
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Restaurant,
        default: []
    }]
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
