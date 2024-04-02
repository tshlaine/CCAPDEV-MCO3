import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import bcrypt from "bcrypt";

const users = [
  {
    _id: new ObjectId("64b8dc5a14e5a57fb23793ee"),
    firstName: "Carl",
    lastName: "Delos Reyes",
    email: "carl_delosreyes@dlsu.edu.ph",
    password: await bcrypt.hash("cjdr", 10),
    helpfulCount: 0,
    reviewCount: 0,
    photoCount: 0,
    monthMade: 7,
    dateMade: 20,
    yearMade: 2023,
    biography: "Hi, I'm Ju! I may or may not be here.",
    profilePic: "uploads/profiles/carl_DL.jpeg",
    __v: 0,
    restaurant: null,
  },
  {
    _id: new ObjectId("64b8e053320a0d98005de887"),
    firstName: "Atasha",
    lastName: "Pidlaoan",
    email: "atasha_pidlaoan@dlsu.edu.ph",
    password: await bcrypt.hash("ap", 10),
    helpfulCount: 0,
    reviewCount: 0,
    photoCount: 0,
    monthMade: 7,
    dateMade: 20,
    yearMade: 2023,
    biography: "The user has not yet set a biography.",
    profilePic: "uploads/profiles/atasha_pidlaoan.jpeg",
    __v: 0,
    restaurant: null,
  },
  {
    _id: new ObjectId("64b8e278320a0d98005de88b"),
    firstName: "Matthew",
    lastName: "Sanchez",
    email: "matthew_sanchez@dlsu.edu.ph",
    password: await bcrypt.hash("mos", 10),
    helpfulCount: 0,
    reviewCount: 0,
    photoCount: 0,
    monthMade: 7,
    dateMade: 20,
    yearMade: 2023,
    biography: "hello my name is matthew!",
    profilePic: "uploads/profiles/matthew_sanchez.jpeg",
    __v: 0,
    restaurant: new ObjectId("64b80bb35331324946284764"),
  },
  {
    _id: new ObjectId("64b8e397320a0d98005de89b"),
    firstName: "Lee",
    lastName: "Sandoval",
    email: "lee_sandoval@dlsu.edu.ph",
    password: await bcrypt.hash("lbvs", 10),
    helpfulCount: 0,
    reviewCount: 0,
    photoCount: 0,
    monthMade: 7,
    dateMade: 20,
    yearMade: 2023,
    biography: "You are my sunshine:)",
    profilePic: "uploads/profiles/lee_sandoval.jpeg",
    __v: 0,
    restaurant: new ObjectId("64b80bb35331324946284763"),
  },
  {
    _id: new ObjectId("64b8e3fd320a0d98005de8a1"),
    firstName: "Lester",
    lastName: "Anthony",
    email: "lester_anthony@dlsu.edu.ph",
    password: await bcrypt.hash("lester01", 10),
    helpfulCount: 0,
    reviewCount: 0,
    photoCount: 0,
    monthMade: 7,
    dateMade: 20,
    yearMade: 2023,
    biography: "Code is Life!",
    profilePic: "uploads/profiles/user.jpg",
    __v: 0,
    restaurant: new ObjectId("64b80bb35331324946284765"),
  },
  {
    _id: new ObjectId("64b8e499320a0d98005de8a7"),
    firstName: "Asher",
    lastName: "Rikku",
    email: "asher_rikku@dlsu.edu.ph",
    password: await bcrypt.hash("gabIsAwesome", 10),
    helpfulCount: 0,
    reviewCount: 0,
    photoCount: 0,
    monthMade: 7,
    dateMade: 20,
    yearMade: 2023,
    biography: "Never say never!",
    profilePic: "uploads/profiles/user.png",
    __v: 0,
    restaurant: null,
  },
];

export const insertUsers = (db) => {
  db.collection("users")
    .insertMany(users)
    .then((result) => {
      console.log(`${result.insertedCount} users inserted`);
    })
    .catch((err) => {
      console.error("Error inserting users into the database:", err);
    });
};
