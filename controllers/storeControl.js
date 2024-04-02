import Restaurant from "../models/Restaurant.js";
import Review from "../models/Review.js";

const storeControl = {
  async showStore(req, res) {
    try {
      const restaurantName = req.params.restaurantName;
      var restaurant = await Restaurant.find({ name: restaurantName });
      restaurant = restaurant[0];

      var reviews = await Review.find({ restaurant: restaurant._id });

      if (!restaurant || !reviews) {
        return res.status(404).send("Restaurant not found");
      }

      reviews = reviews.map((review) => {
        return {
          _id: review._id,
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
          likeList: review.likeList,
          dislikeList: review.dislikeList,
        };
      });

      const userSesh = req.session.user;
      var isOwner = false;
      var viewer = null;

      if (userSesh) {
        if (userSesh.restaurant == restaurant._id) {
          isOwner = true;
        }
        viewer = userSesh._id;
      }

      res.render("store", {
        storeName: restaurant.name,
        restaurantInfo: JSON.stringify(restaurant),
        reviews: JSON.stringify(reviews),
        isOwner: isOwner,
        viewer: viewer,
      });
    } catch (error) {
      console.error("Error in showStore:", error);
      res.status(500).send("Server Error");
    }
  },
};

export default storeControl;
