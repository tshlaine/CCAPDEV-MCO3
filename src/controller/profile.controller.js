const { get } = require("lodash");

const profilePage = (req, res) => {
  const {
    fullname: { lastname, firstname },
    username,
    profilepicture,
    bio,
  } = get(req, "identity");

  const pic = profilepicture ?? "/images/user.png";
  res.render("profile", { lastname, firstname, username, pic, bio });
};

module.exports = { profilePage };
