/**
 * Import dependencies
 * express, cors, body-parser, mongoose, hbs, session, multer
 */
import "dotenv/config"; 
import express from "express"; 
import cors from "cors"; 
import path from "path"; 
import mongoose from "mongoose"; 
import session from "express-session"; 
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import MongoStore from "connect-mongo";
import multer from "multer";
import cookieParser from "cookie-parser";
import { check } from "express-validator";
/**
 * Import local dependencies
 */
/**** MODELS ****/
// import { connectToMongo } from "./db/conn.js";
import Review from "./models/Review.js";
/**** CONTROLLERS ****/
import componentsControl from "./controllers/componentsControl.js";
import indexControl from "./controllers/indexControl.js";
import signUpControl from "./controllers/signUpControl.js";
import logInControl from "./controllers/logInControl.js";
import logOutControl from "./controllers/logOutControl.js";
import profileControl from "./controllers/profileControl.js";
import forgotPasswordControl from "./controllers/forgotPasswordControl.js";
import storeControl from "./controllers/storeControl.js";
import searchControl from "./controllers/searchControl.js";
import { insertUsers } from "./data/users.data.js";
/**
 * Initiliaze express app
 */
const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.engine("hbs", exphbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

/**** FILE UPLOAD ****/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subFolder = "";
    if (req.route.path == "/edit-profile") subFolder = "/profiles";
    else if (req.route.path == "/submit-review") subFolder = "/reviews";

    cb(null, "public/uploads" + subFolder);
  },
  filename: function (req, file, cb) {
    let fileName = Date.now(); //default filename
    let userName = req.session.user.email.split("@")[0];
    let origName = file.originalname.split(".")[0];

    if (req.route.path == "/edit-profile") fileName = userName;
    else if (req.route.path == "/submit-review")
      fileName += "-" + origName + "-" + userName;

    cb(null, fileName + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
const uploadReview = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (req.files && req.files.length >= 5) {
      return cb(new Error("Maximum number of files exceeded."));
    }
    cb(null, true);
  },
});

/**** SESSION ****/
const sessionStore = MongoStore.create({
  mongoUrl: "mongodb+srv://apdevmco:group4@cluster0.jwd8ijh.mongodb.net/",
  ttl: 21 * 24 * 60 * 60,
  autoRemove: "native",
});
app.use(
  session({
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 0, // Set the cookie to expire when the browser is closed
      expires: false,
      httpOnly: true, // Set HttpOnly flag
    },
  })
);

// connectToMongo(() => {
//   console.log("Connected to MongoDB");
// });

/**
 * Controller
 */
/**** COMPONENTS ****/
app.get("/side-bar", componentsControl.showSideBar);
app.get("/location-card", componentsControl.showLocationCard);
app.post("/store-prev", componentsControl.showStorePrev);
app.post("/resto-card", componentsControl.showRestoCard);
app.post("/review-card", componentsControl.showRevCard);
app.post("/create-review", componentsControl.showCreateRev);
app.post(
  "/submit-review",
  [
    uploadReview.array("revUploads", 5),
    check("message").notEmpty(),
    check("subject").notEmpty(),
  ],
  componentsControl.submitCreateRev
);
app.post("/owners-reply", componentsControl.submitOwnersReply);
app.post("/edit-review", componentsControl.showEditRev);
app.post(
  "/submit-edit",
  uploadReview.array("revUploads", 5),
  componentsControl.submitEditRev
);
app.post("/delete-review", componentsControl.deleteRev);

/**** HOME ****/
app.get("/", indexControl.showHomePage);
/**** SIGN UP ****/
app.get("/sign-up", signUpControl.showSignUpForm);
app.post(
  "/sign-up",
  [
    check("firstName").notEmpty(),
    check("lastName").notEmpty(),
    check("emailSignup").isEmail(),
    check("passwordSignup").notEmpty(),
  ],
  signUpControl.submitSignUpForm
);
/**** LOG IN ****/
app.get("/login", logInControl.showLogInForm);
app.post(
  "/login",
  [check("emailLogin").isEmail()],
  logInControl.submitLogInForm
);
/**** FORGOT PASSWORD ****/
app.get("/forgot-password", forgotPasswordControl.showForgotPassword);
app.post("/forgot-password", forgotPasswordControl.submitForgotPassword);
/**** LOG OUT ****/
app.get("/logout", logOutControl.endSession);
/**** PROFILE ****/
app.get("/profile/:userName", profileControl.showProfile);
/**** EDIT PROFILE ****/
app.get("/edit-profile", profileControl.showEditProfile);
app.post(
  "/edit-profile",
  [
    upload.single("profilePictureEdit"),
    check("firstNameEdit").notEmpty(),
    check("lastNameEdit").notEmpty(),
    check("descriptionEdit").notEmpty(),
  ],
  profileControl.submitEditProfile
); //FILE UPLOAD
/**** STORE ****/
app.get("/store/:restaurantName", storeControl.showStore);
/**** SEARCH RESULT ****/
app.post("/search", searchControl.showSearch);
app.post("/filter", searchControl.filterControl);
app.put("/like", async (req, res) => {
  const user = req.session.user;
  const review = await Review.findById(req.body.reviewId);

  var alreadyLiked = review.likeList.includes(user._id);

  if (!alreadyLiked) {
    Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $addToSet: { likeList: user._id },
        $pull: { dislikeList: user._id },
      },
      {
        new: true,
      }
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(422).json({ error: err });
      });
  } else {
    Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $pull: { likeList: user._id },
      },
      {
        new: true,
      }
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(422).json({ error: err });
      });
  }
});

app.put("/dislike", async (req, res) => {
  const user = req.session.user;
  const review = await Review.findById(req.body.reviewId);

  var alreadyDisliked = review.dislikeList.includes(user._id);
  if (!alreadyDisliked) {
    Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $addToSet: { dislikeList: user._id },
        $pull: { likeList: user._id },
      },
      {
        new: true,
      }
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(422).json({ error: err });
      });
  } else {
    Review.findByIdAndUpdate(
      req.body.reviewId,
      {
        $pull: { dislikeList: user._id },
      },
      {
        new: true,
      }
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(422).json({ error: err });
      });
  }
});
// ABOUT
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/session/destroy", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      console.log("Session destroyed");
    }
  });
  res.sendStatus(200);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`App started at http://localhost:${process.env.SERVER_PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("Connected to MongoDB");
    const db = mongoose.connection.db;
    app.locals.db = db;

    // Insert restaurants
    // insertRestaurants(db);

    // Insert users
    // insertUsers(db);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
