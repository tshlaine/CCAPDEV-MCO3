import Review from "../models/Review.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

const componentsControl = {
  showSideBar(req, res) {
    const user = req.session.user;
    var userSesh = null;

    if (user) {
      userSesh = user.email.split("@")[0];
    }
    res.render("components/side-bar", { user: userSesh });
  },
  showLocationCard(req, res) {
    res.render("components/location-card");
  },
  async showStorePrev(req, res) {
    res.render("components/store-prev", {
      name: req.body.post.name,
      location: req.body.post.location,
      description: req.body.post.description,
      aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
      cardNum: req.body.cardNum,
      bannerPic: req.body.post.bannerPic,
    });
  },

  async showRestoCard(req, res) {
    // TODO: EDIT additional
    let priceSymbol = "";
    for (let i = 0; i < req.body.post.price; i++) {
      priceSymbol += "₱";
    }
    // console.log(req.body.post);
    var restaurantsReview = await Review.find({
      restaurant: req.body.post._id,
    });
    const reviewCount = restaurantsReview.length;
    res.render("components/resto-card", {
      name: req.body.post.name,
      aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
      totalReviews: reviewCount,
      location: req.body.post.location,
      price: priceSymbol,
      description: req.body.post.description,
      aveRating: parseFloat(req.body.post.aveRating).toFixed(1),
      bannerPic: req.body.post.bannerPic,
    });
  },

  async showRevCard(req, res) {
    const user = await User.findById(req.body.post.user);
    try {
      const name = user.firstName + " " + user.lastName;
      const email = user.email;
      const profilePic = user.profilePic;
      const restaurant = await Restaurant.findById(req.body.post.restaurant);
      const restoName = restaurant.name;

      // CHECKS IF POST OWNER
      var userSesh = null;
      var isPostOwner = false;
      if (req.session.user) {
        userSesh = req.session.user._id;
        if (req.session.user._id == req.body.post.user) {
          isPostOwner = true;
        }
      }

      // FOR OWNER's REPLY
      var dispReply = "display:none;";
      var postOrEditReply = "Post";
      var value = null;
      if (req.body.post.reply != "" && req.body.post.reply != null) {
        dispReply = "display: block;";
        postOrEditReply = "Edit";
        value = req.body.post.reply;
      }

      // FOR POSTED OR EDITED ON DATE
      var postedOrEdited = "Posted";
      if (req.body.post.edited == "true") {
        //console.log("IN");
        postedOrEdited = "Last Edited";
      }

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var dateString =
        months[req.body.post.monthPosted - 1] +
        " " +
        req.body.post.datePosted +
        ", " +
        req.body.post.yearPosted;
      //console.log(req.body.post);
      //console.log(req.body.post._id);
      res.render("components/review-card", {
        username: user.email.split("@")[0],
        restoName: restoName,
        name: name,
        rating: req.body.post.rating,
        email: email,
        profilePic: profilePic,
        postTitle: req.body.post.postTitle,
        description: req.body.post.description,
        helpfulCount: req.body.post.helpfulCount,
        unhelpfulCount: req.body.post.unhelpfulCount,
        postedOrEdited: postedOrEdited,
        date: dateString,
        images: JSON.stringify(req.body.post.images),
        image1: req.body.post.images.image1,
        image2: req.body.post.images.image2,
        image3: req.body.post.images.image3,
        image4: req.body.post.images.image4,
        cardNum: req.body.cardNum,
        reviewId: req.body.post._id,
        postOrEditReply: postOrEditReply,
        displayReply: dispReply,
        ownersReply: req.body.post.reply,
        repValue: value,
        likeList: JSON.stringify(req.body.post.likeList),
        dislikeList: JSON.stringify(req.body.post.dislikeList),
        viewer: userSesh,
        isPostOwner: isPostOwner,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async submitOwnersReply(req, res) {
    try {
      const rev = await Review.findById(req.body.revId);
      const resto = await Restaurant.findById(rev.restaurant);
      rev.reply = req.body.ownersReply;
      await rev.save();
      res.redirect("/store/" + resto.name);
    } catch (error) {
      console.error("Error posting reply:", error);
      res.status(500).send("Failed to post reply");
    }
  },

  showCreateRev(req, res) {
    const restaurantId = req.body.post._id;
    if (req.session.user)
      //FIX THIS
      res.render("components/create-review", {
        restaurantId: restaurantId,
      });
  },
  async saveRestaurantAveRating(restaurant_id) {
    const reviews = await Review.find({ restaurant: restaurant_id });
    let total = reviews.reduce(
      (accumulator, currentValue) => accumulator + currentValue.rating,
      0
    );
  
    const aveRating = total / reviews.length;
    await Restaurant.findByIdAndUpdate(restaurant_id, { aveRating });
  },
  async submitCreateRev(req, res) {
    const resto = await Restaurant.findById(req.body.restaurantId, "name");
    const errors = validationResult(req);
    console.log("TRYING TO SUBMIT REVIEW");
    if (!errors.isEmpty()) {
      console.log("ERROR IN REVIEW");
      let store_name = req.headers.referer.split("/")[4].split("%20").join(" ");
      res.redirect("/store/" + store_name);
    } else {
      console.log("NO ERROR IN REVIEW");
      const resto_name = resto.name;
      console.log(resto_name);
      const today = new Date();
      var imageNames = [];
      for (let i = 0; i < 4; i++) {
        if (req.files[i] != undefined) {
          console.log(req.files[i].path.split("/").slice(1).join("/"));
          imageNames.push(req.files[i].path.split("/").slice(1).join("/"));
        } else {
          imageNames.push("");
        }
      }
      const data = {
        postTitle: req.body.subject,
        rating: req.body.rating,
        description: req.body.message,
        helpfulCount: 0,
        unhelpfulCount: 0,
        monthPosted: today.getMonth() + 1,
        datePosted: today.getDate(),
        yearPosted: today.getFullYear(),
        edited: false,
        images: {
          image1: imageNames[0],
          image2: imageNames[1],
          image3: imageNames[2],
          image4: imageNames[3],
        },
        user: req.session.user._id,
        restaurant: req.body.restaurantId,
        reply: null,
      };
      console.log(data);
      try {
        await Review.insertMany([data]);
        await saveRestaurantAveRating(req.body.restaurantId)
        res.redirect("/store/" + resto_name);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
      }
    }
  },

  showEditRev(req, res) {
    let reviewInfo = req.body.post;

    res.render("components/edit-review", {
      restaurant: reviewInfo.restoName,
      subjectValue: reviewInfo.postTitle,
      messageValue: unescape(reviewInfo.description),
      ratingValue: parseInt(reviewInfo.rating),
      reviewId: reviewInfo.id,
    });
  },

  async submitEditRev(req, res) {
    try {
      const rev = await Review.findById(req.body.reviewId);
      // SAVE ALL NEW VALUES TO VARIABLES
      const isValidValue = value => value !== null && value !== "";
      let madeChange = false;
      // CHECK IF THE VALUES ARE NULL OR SAME WITH CURRENT ENTRIES, SAVE CHANGES IF NOT
      // postTitle
      if (isValidValue(req.body.subject)) {
        rev.postTitle = req.body.subject;
        madeChange = true;
      }

      // rating
      if (req.body.rating != rev.rating) {
        console.log("2");
        rev.rating = req.body.rating;
        madeChange = true;
      }

      // description
      if (isValidValue(req.body.message)) {
        rev.description = req.body.message;
        madeChange = true;
      }

      if (madeChange) {
        console.log("MADE CHANGE");
        rev.edited = true;
        const date = new Date();

        console.log("DATE" + date);
        console.log("DAY" + date.getDate());
        console.log("MONTH" + date.getMonth());
        console.log("YEAR" + date.getFullYear());

        rev.datePosted = date.getDate();
        rev.monthPosted = date.getMonth() + 1;
        rev.yearPosted = date.getFullYear();
      }

      //console.log(rev);
      await rev.save();
      await saveRestaurantAveRating(rev.restaurant);
      res.redirect("back");
    } catch (error) {
      console.error("Error posting reply:", error);
      res.status(500).send("Failed to post reply");
    }
  },
  async deleteRev(req, res) {
    try { 
      await Review.findByIdAndDelete(req.body.reviewId).exec();
      await saveRestaurantAveRating(rev.restaurant);
      res.redirect("back");
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to delete review");
    }
  },
};

export default componentsControl;
