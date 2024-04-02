import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const restaurants = [
  {
    _id: new ObjectId("64b80bb35331324946284763"),
    name: "Prelude Cafe and Restaurant",
    location: "810 Castro Street, Manila, Philippines",
    aveRating: 4,
    price: 2,
    totalReviews: 124,
    description:
      "Feel an atmosphere perfect for enjoying meals and quality time with friends. From their coffee to their mouthwatering dishes, it's a delightful spot for coffee lovers and food enthusiasts alike.",
    bannerPic: "uploads/stores/prelude.png",
  },
  {
    _id: new ObjectId("64b80bb35331324946284764"),
    name: "Obscure Cafe",
    location: "810 Castro Street , Manila, Philippines",
    aveRating: 4,
    price: 2.5,
    totalReviews: 111,
    description:
      "Obscure Cafe in Taft, Manila is a hidden gem known for its unique ambiance. Step into this charming space for specialty brews, delectable treats, and a touch of mystery.",
    bannerPic: "uploads/stores/obsecure.png",
  },
  {
    _id: new ObjectId("64b80bb35331324946284765"),
    name: "Drip Kofi",
    location: "Unit G5, Burgundy Transpacific Place, Taft Avenue",
    aveRating: 3,
    price: 3,
    totalReviews: 100,
    description:
      "A trendy cafe known for its specialty mochas and artisanal desserts!",
    bannerPic: "uploads/stores/dripkofi.png",
  },
  {
    _id: new ObjectId("64b80bb35331324946284766"),
    name: "Cloudscape",
    location:
      "3rd Floor D' Students Place, Vito Cruz Taft Avenue, Malate, Manila, Philippines",
    aveRating: 3,
    price: 2,
    totalReviews: 75,
    description:
      "Welcome to Cloudscape, Cloudscape, located high above Taft, Manila, offers panoramic views and a serene ambiance. Escape the hustle and bustle as you sip on freshly brewed coffee and indulge in heavenly pastries in this tranquil rooftop oasis.",
    bannerPic: "uploads/stores/cloudscape.png",
  },
  {
    _id: new ObjectId("64b80bb35331324946284767"),
    name: "Starbucks Greencourt Manila",
    location: "Fidel A.Reyes, Malate, Manila, 1004 Metro Manila",
    aveRating: 3,
    price: 2,
    totalReviews: 0,
    description:
      "Welcome to Starbucks, has become a symbol of quality coffee and a cultural icon, serving millions of customers worldwide and shaping the coffee industry with its innovative approach to coffee culture and customer experience.",
    bannerPic: "uploads/stores/starbs.png",
  },
  {
    _id: new ObjectId("64b80bb35331324946284769"),
    name: "TOMO Coffee",
    location:
      "University Mall, 2507 Taft Ave, Malate, Manila, 1004 Metro Manila",
    aveRating: 4,
    price: 4,
    totalReviews: 0,
    description:
      "Welcome to TOMO, With its trendy decor and artisanal coffee blends, Tomo Coffee in Taft, Manila provides a modern yet relaxed setting for coffee enthusiasts to savor their favorite brews and unwind.",
    bannerPic: "uploads/stores/tomo.png",
  },
  {
    _id: new ObjectId("64b80bb35331324946284773"),
    name: "Coffee Bean",
    location: "Henry Sy Area",
    aveRating: 4,
    price: 3,
    totalReviews: 0,
    description:
      "Want coffee! We are here to bring you one at the comfort of your own library",
    bannerPic: "uploads/stores/Coffee-Bean.jpg",
  },
];

export const insertRestaurants = (db) => {
  db.collection("restaurants")
    .insertMany(restaurants)
    .then((result) => {
      console.log(`${result.insertedCount} restaurants inserted`);
    })
    .catch((err) => {
      console.error("Error inserting restaurants into the database:", err);
    });
};
