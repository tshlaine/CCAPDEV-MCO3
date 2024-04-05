import User from "../models/User.js";
import { validationResult } from "express-validator";

const signUpControl = {
  showSignUpForm(req, res) {
    res.render("login");
  },

  async submitSignUpForm(req, res) {
    const errors = validationResult(req);
    console.log(errors);
    console.log("ERROR (signup): " + errors.isEmpty());
    const unique = await User.findOne({ email: req.body.emailSignup }).exec();
    console.log(unique);
    if (errors.isEmpty() && unique == null) {
      console.log("SIGN UP SUCCESSFUL");
      const today = new Date();
      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.emailSignup,
        password: req.body.passwordSignup,
        helpfulCount: 0,
        reviewCount: 0,
        photoCount: 0,
        monthMade: today.getMonth() + 1,
        dateMade: today.getDate(),
        yearMade: today.getFullYear(),
        biography: "The user has not yet set a biography.",
        profilePic: "assets/png/def-prof.png",
      };
      const newUser = new User(data);
      try {
        await newUser.save();
        res.render("login", {
          isReg: true,
          errorMessage: "Sign up successful. Please log in.",
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
      }
    } else {
      console.log("SIGN UP AGAIN");
      res.render("login", {
        isReg: true,
        errorMessage: "Invalid credentials",
      });
    }
  },
};

export default signUpControl;