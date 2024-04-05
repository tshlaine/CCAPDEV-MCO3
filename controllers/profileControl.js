import User from "../models/User.js";
import Review from "../models/Review.js";
import { validationResult } from "express-validator";

const profileControl = {
  async showProfile(req, res) {
    const user2 = req.params.userName;
    await User.findOne({
      email: user2,
    }).then(async user => {
      var userLoggedIn = req.session.user;

      var userSesh = null;
      var isSelf = false;
      if (userLoggedIn) {
        userSesh = userLoggedIn.email.split("@")[0];

        if (user?.email && userLoggedIn.email == user.email) isSelf = true;
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
        months[user?.monthMade - 1] +
        " " +
        user?.dateMade +
        ", " +
        user?.yearMade;

      var reviewsByUser = await Review.find({ user: user?._id }).populate({
        path: "restaurant",
        select: "bannerPic name",
      });

      reviewsByUser.sort((a, b) => {
        return b.helpfulCount - a.helpfulCount;
      });

      const totalLikes = reviewsByUser.reduce((total, review) => {
        return total + review.helpfulCount;
      }, 0);

      const reviewCount = reviewsByUser.length;

      const totalImages = reviewsByUser.reduce((total, review) => {
        // Iterate through each image property in the 'images' object and check if it's not null
        Object.values(review.images).forEach(image => {
          if (image != "") {
            total++;
          }
        });
        return total;
      }, 0);

      reviewsByUser = reviewsByUser.map(review => {
        return {
          allData: JSON.stringify(review),
          _id: review._id,
          logo: review.restaurant.bannerPic,
          postTitle: review.postTitle,
          rating: review.rating,
          description: review.description,
          helpfulCount: review.helpfulCount,
          unhelpfulCount: review.unhelpfulCount,
          monthPosted: review.monthPosted,
          datePosted: review.datePosted,
          yearPosted: review.yearPosted,
          edited: review.edited,
          images: review.images,
          user: review.user,
          restaurant: review.restaurant,
          reply: review.reply,
          isSelf: isSelf,
          likeList: review.likeList,
          dislikeList: review.dislikeList,
        };
      });
      await res.render("profile", {
        currentIndex: req.query.index,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        password: user?.password,
        helpfulCount: totalLikes,
        reviewCount: reviewCount,
        photoCount: totalImages,
        dateMade: dateString,
        biography: user?.biography,
        profilePic: user?.profilePic,
        reviews: reviewsByUser,
        isSelf: isSelf,
      });
    });
  },

  showEditProfile(req, res) {
    const user = req.session.user;
    res.render("edit-profile", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      profilePicture: user?.profilePic,
      description: user?.biography,
    });
  },
  async submitEditProfile(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let user = req.session.user;
      let userName = user.email;
      res.redirect("/profile/" + userName);
    } else {
      try {
        let user = req.session.user;
        let userName = user.email;

        let upFirstName = req.body.firstNameEdit;
        let upLastName = req.body.lastNameEdit;
        let upDescription = req.body.descriptionEdit;
        let upProfilePicture;
        if (req.file != null) upProfilePicture = req.file.filename;

        const foundUser = await User.findOne({ email: user?.email }).exec();

        if (upFirstName != null) foundUser.firstName = upFirstName;
        if (upLastName != null) foundUser.lastName = upLastName;
        if (upDescription != null) foundUser.biography = upDescription;
        if (upProfilePicture != null)
          foundUser.profilePic = "uploads/profiles/" + upProfilePicture;
        await foundUser.save();
        req.session.user = foundUser;
        res.redirect("/profile/" + userName);
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Failed to update user");
      }
    }
  },
};

export default profileControl;