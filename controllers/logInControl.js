import User from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

const logInControl = {
  showLogInForm(req, res) {
    const viewer = req.session.user;
    if (!viewer) {
      res.render("login");
    } else {
      const username = viewer.email;
      res.redirect("/profile/" + username);
    }
  },

  async submitLogInForm(req, res) {
    try {
      const check = await User.findOne({ email: req.body.emailLogin });
      const remember = req.body.remember;
      const passwordMatch = await bcrypt.compare(
        req.body.passwordLogin,
        check.password
      );
      console.log(passwordMatch);
      const errors = validationResult(req);
      console.log("PASSWORD MATCH: " + passwordMatch);
      console.log("ERRORS (login): " + errors.isEmpty());
      if (passwordMatch && errors.isEmpty()) {
        User.findOne({ email: req.body.emailLogin })
          .then(user => {
            if (!user) {
              res.send("User not found");
            } else {
              //console.log(typeof(remember))
              if (!req.session.user && remember == "on") {
                // Create a new session with an extended expiration time
                req.session.user = user;

                // Set the session to have a longer expiration time
                req.session.cookie.maxAge = 21 * 24 * 60 * 60 * 1000; // 3 weeks
                req.session.cookie.httpOnly = true;
                // Update the session expiration time in the session store
                req.session.save();
              } else if (!req.session.user && remember != "on") {
                // Set the session to be a temporary session
                req.session.user = user;
                req.session.cookie.httpOnly = true;
                req.session.cookie.expires = false;
                req.session.save();
              } else {
                const currentDate = new Date();
                const expirationDate = new Date(
                  currentDate.getTime() + 21 * 24 * 60 * 60 * 1000
                ); // Extend by 3 weeks
                req.session.cookie.expires = expirationDate; // Set new expiration date
              }
              //console.log('LOG IN SUCCESSFUL BY:\n' + user.firstName + ' ' + user.lastName);
              res.redirect("/");
            }
          })
          .catch(error => {
            console.error(error);
            res.send("Error retrieving user data");
          });
      } else {
        res.render("login", {
          errorMessage: "Invalid credentials",
        });
      }
    } catch (error) {
      res.render("login", {
        errorMessage: "Invalid credentials",
      });
    }
  },
};

export default logInControl;
