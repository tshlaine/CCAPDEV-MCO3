const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const router = require("./src/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(cookieParser());

const uri =
  "mongodb+srv://apdevmco:zoeR0k6WubGOuHYD@apdev-mco.jvy7zsd.mongodb.net/?retryWrites=true&w=majority&appName=apdev-mco";

hbs.create({
  extname: ".hbs",
  defaultLayout: false,
  partialsDir: [path.join(__dirname, "src", "views", "partials")],
});

app.engine("hbs", engine({ extname: ".hbs", defaultLayout: false }));

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/other-profile", function (req, res) {
  res.render("other-profile", {});
});

app.get("/reviewpage", function (req, res) {
  res.render("reviewpage", {});
});

app.get("/searchpage", async function (req, res) {
  try {
    let query = req.query.query || ""; // If no query parameter is provided, default to an empty string

    // Check if the query is not empty
    if (query.trim() !== "") {
      const db = req.app.locals.db;
      const result = await db
        .collection("cafes")
        .find({ name: { $regex: query, $options: "i" } })
        .toArray();

      // Render the searchpage.hbs template with the search results only
      return res.render("searchpage", { result: result });
    } else {
      // If the query is empty, render the search page without any results
      return res.render("searchpage", { result: [] });
    }
  } catch (err) {
    console.error("Error searching cafes by name:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/view-establishments", function (req, res) {
  res.render("view-establishments", {});
});

app.get("/", function (req, res) {
  res.redirect("/index");
});

app.get('/profile', async function(req, res) {
    try {
        const db = req.app.locals.db;
        const user = await db.collection('users').findOne({});
        const reviews = await db.collection('reviews').find({ userID: user.inf_id }).toArray();
        
        // Match cafeID of reviews and inf_id of cafe
        const cafes = [];
        for (const review of reviews) {
            const cafe = await db.collection('cafes').findOne({ inf_id: review.cafeID });
            if (cafe) {
                // Add the cafe's logo-image to the review document (para madali for me huhu)
                review.logoimage = cafe.logoimage;
                cafes.push(cafe);
            }
        }
        
        const reviewsCount = reviews.length;
        const numberOfDots = Math.ceil(reviewsCount / 3);
        const dots = Array.from({ length: numberOfDots }, (_, index) => index);

        console.log(reviews);
        
        res.render('profile', { 
            sampleUser: user,
            sampleReviews: reviews,
            cafes: cafes,
            dots: dots
        });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// const rawUser = fs.readFileSync("src/models/users.metadata.json");
// const users = JSON.parse(rawUser);
// const rawReview = fs.readFileSync("src/models/reviews.metadata.json");
// const reviews = JSON.parse(rawReview);
// const rawComment = fs.readFileSync("src/models/comments.metadata.json");
// const comments = JSON.parse(rawComment);
mongoose.Promise = Promise;
mongoose.connect(uri).then((client) => {
  console.log("Connected to MongoDB");
  const db = mongoose.connection.db; // Get the database
  app.locals.db = db; // Set the database connection to app.locals

  // db.dropDatabase()
  //   .then((result) => {
  //     console.log("Database deleted successfully");
  //   })
  //   .catch((err) => {
  //     console.error("Error deleting database:", err);
  //   });

  // // Insert data into the database
  // db.collection("cafes")
  //   .insertMany(cafes)
  //   .then((result) => {
  //     console.log(`${result.insertedCount} cafes inserted`);
  //   })
  //   .catch((err) => {
  //     console.error("Error inserting cafes into the database:", err);
  //     client.close(); // Close the MongoDB client if an error occurs
  //   });

  // db.collection("users")
  //   .insertMany(users)
  //   .then((result) => {
  //     console.log(`${result.insertedCount} users inserted`);
  //   })
  //   .catch((err) => {
  //     console.error("Error inserting users into the database:", err);
  //     client.close(); // Close the MongoDB client if an error occurs
  //   });

  // //NOTE: THESE DOCUMENTS ONLY REFERENCE THE INFORMAL IDS OF THOSE USERS AND CAFES

  // db.collection("reviews")
  //   .insertMany(reviews)
  //   .then((result) => {
  //     console.log(`${result.insertedCount} reviews inserted`);
  //   })
  //   .catch((err) => {
  //     console.error("Error inserting reviews into the database:", err);
  //     client.close(); // Close the MongoDB client if an error occurs
  //   });

  // db.collection("comments")
  //   .insertMany(comments)
  //   .then((result) => {
  //     console.log(`${result.insertedCount} comments inserted`);
  //   })
  //   .catch((err) => {
  //     console.error("Error inserting comments into the database:", err);
  //     client.close(); // Close the MongoDB client if an error occurs
  //   });
});
mongoose.connection.on("error", (error) =>
  console.error("Error connecting to MongoDB:", error)
);

app.use("/", router());
// Start the server after data insertion
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
