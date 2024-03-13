const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullname: {
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepicture: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const User = model("User", userSchema);
const getUserByUsername = (username) => User.findOne({ username });
const getUsers = () => User.find();
const createUser = (values) =>
  new User(values).save().then((user) => user.toObject());
module.exports = { User, getUserByUsername, getUsers, createUser };
