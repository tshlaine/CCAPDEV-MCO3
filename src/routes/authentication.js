const {
    login,
    logout,
    register,
  } = require("../controller/authentication.controller");
  const { upload } = require("../helpers/file-uploader");
  const { isAuthenticated, isGuest } = require("../middleware");
  
  module.exports = (router) => {
    // display login page
    router.get("/login", isGuest, function (req, res) {
      res.render("login", {});
    });
  
    // login user
    router.post("/login", login);
  
    // register user
    router.post("/register", upload.single("profilepicture"), register);
  
    // logout page
    router.get("/logout", isAuthenticated, logout);
  };
  