import Restaurant from "../models/Restaurant.js";
import Location from "../models/Location.js";

const indexControl = {
  async showHomePage(req, res) {
    if (req.session.user) {
      const currentDate = new Date();
      const expirationDate = new Date(
        currentDate.getTime() + 21 * 24 * 60 * 60 * 1000
      ); // Extend by 3 weeks
      req.session.cookie.expires = expirationDate; // Set new expiration date
    }
    let locations = await Location.find().exec();

    let { page, limit } = req.query;
    // DEFAULT PAGE AND LIMIT
    if (!page) page = 1;
    if (!limit) limit = 12;
    const skip = (page - 1) * limit;
    let restaurants = await Restaurant.find().skip(skip).limit(limit).exec();
    restaurants = restaurants.map((restaurant) => {
      return {
        _id: restaurant._id,
        name: restaurant.name,
        location: restaurant.location,
        aveRating: restaurant.aveRating,
        description: restaurant.description,
        bannerPic: restaurant.bannerPic,
      };
    });

    res.render("index", {
      restaurants: restaurants,
      locations: JSON.stringify(locations),
    });
  },
};

export default indexControl;
