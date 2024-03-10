const { Schema, model, mongoose } = require('mongoose');

const userSchema = new Schema({
    fullname: {
        lastname: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        }
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepicture: {
        type: String 
    },
    bio: {
        type: String
    }
});

const User = model('User', userSchema);

module.exports = User;
