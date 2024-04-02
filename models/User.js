import mongoose from "mongoose";
import Restaurant from "./Restaurant.js";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    helpfulCount: Number,
    reviewCount: Number, 
    photoCount: Number, 
    monthMade: Number,
    dateMade: Number,
    yearMade: Number,
    biography: String,
    profilePic: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Restaurant,
        default: null
    }
});


userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash; // Update the 'password' field, not 'user.password'
        next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('User', userSchema);

export default User;