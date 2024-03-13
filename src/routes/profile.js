const { profilePage } = require("../controller/profile.controller");
const { isAuthenticated } = require("../middleware");

module.exports = (router) => {
  router.get("/profile", isAuthenticated, profilePage);
};
