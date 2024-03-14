const { get } = require("lodash");

const profilePage = (req, res) => {
  // Extract necessary data from req.identity
  const { fullname: { lastname, firstname }, username, profilepicture, bio } = get(req, "identity");

  // Check the value of profilepicture
  console.log("Profile Picture:", profilepicture);

  // Set pic to profilepicture if available, otherwise set it to a default value
  const pic = profilepicture ?? "/images/user.png";

  // Log the value of pic
  console.log("Pic:", pic);

  // Render the profile page with necessary data
  res.render("profile", { lastname, firstname, username, pic, bio });
};

module.exports = { profilePage };