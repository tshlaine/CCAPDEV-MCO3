import mongoose from "mongoose";
const { Schema, model } = mongoose;

const restaurantSchema = new Schema({
    name: String,
    location: String,
    aveRating: Number,
    price: String,
    totalReviews: Number,
    description: String,
    bannerPic: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant; 