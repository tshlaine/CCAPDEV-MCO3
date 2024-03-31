const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const router = require("./src/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { login, register } = require("./src/controller/authentication.controller");
const Handlebars = require('handlebars');

Handlebars.registerHelper('isInteger', function(value) {
    return Number.isInteger(value);
});

Handlebars.registerHelper('times', function(n, block) {
    let accum = '';
    for(let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper('subtract', function(a, b) {
    return a - b;
});

Handlebars.registerHelper('floor', function(value) {
    return Math.floor(value);
});

const app = express();
const PORT = 3000;
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
const rawCafe = fs.readFileSync("src/models/cafes.metadata.json");
const cafes = JSON.parse(rawCafe);
const rawUser = fs.readFileSync("src/models/users.metadata.json");
const users = JSON.parse(rawUser);
const rawReview = fs.readFileSync("src/models/reviews.metadata.json");
const reviews = JSON.parse(rawReview);
const rawComment = fs.readFileSync("src/models/comments.metadata.json");
const comments = JSON.parse(rawComment);

const uri = "mongodb://localhost:27017/mydatabase";

const client = new MongoClient(uri);

const hbs = require("express-handlebars");
hbs.create({
  extname: ".hbs",
  defaultLayout: false,
  partialsDir: [path.join(__dirname, "src", "views", "partials")],
});

app.engine("hbs", engine({ extname: ".hbs", defaultLayout: false }));

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));
const cafesSorted = cafes.sort((a, b) => b.averageRating - a.averageRating);

const budgetFriendlyCafes = cafes.filter((cafe) => 
    (cafe.category1 === "Budget-Friendly" || cafe.category2 === "Budget-Friendly")
);

const studyFriendlyCafes = cafes.filter((cafe) => 
    (cafe.category1 === "Study-Friendly" || cafe.category2 === "Study-Friendly")
);

// Select the top three cafes
const topThreeCafes = cafesSorted.slice(0, 3);

const { profilePage } = require("./src/controller/profile.controller");

// Route handler for /index
app.get("/index", async function (req, res) {

    const username = req.query.username || null; // Get username
    const db = req.app.locals.db;
    const user = await db.collection('users').findOne({ username: username });

    if(!user){
        res.render("index", {
            studyFriendlyCafes: studyFriendlyCafes,
            budgetFriendlyCafes: budgetFriendlyCafes,
            cafes: cafes, // Pass all cafes
            topThreeCafes: topThreeCafes, // Pass the top three cafes
            username : username
        });
    }

    else{

        const pic = user.profilepicture;

        res.render("index", {
            studyFriendlyCafes: studyFriendlyCafes,
            budgetFriendlyCafes: budgetFriendlyCafes,
            cafes: cafes, // Pass all cafes
            topThreeCafes: topThreeCafes, // Pass the top three cafes
            username : username,
            pic : pic
        });

    }
});

app.get("/login", function (req, res) {
  res.render("login", {});
});

app.get("/logout", function (req, res) {
    res.render("login", {});
  });

app.post("/login", login);

app.post("/register", register);

app.get("/other-profile", function (req, res) {
  res.render("other-profile", {});
});


Handlebars.registerHelper('lookupUsername', function(userIdToUsernameMap, userid) {
    return userIdToUsernameMap[userid] || 'Unknown User';
});


app.get('/reviewpage', async (req, res) => {
    try {
        const db = req.app.locals.db;

        // Get the establishment ID from the query parameters
        const cafeID = req.query.inf_id;


        // Retrieve establishment details based on the cafeID
        const establishment = await db.collection('cafes').findOne({  inf_id: cafeID  });

        // If the establishment is found, proceed to fetch reviews
        if (establishment) {
            // Retrieve reviews for the specific establishment
            const reviews = await db.collection('reviews').find({ cafeID }).toArray();
            const reviewCount = await db.collection('reviews').countDocuments({ cafeID });
            // Get other query parameters
            const username = req.query.username;
            // Construct cafeDetails object
            const cafeDetails = {
                
                name: req.query.name,
                location: req.query.location,
                location_link: req.query.location_link,
                description: req.query.description,
                averageRating: req.query.averageRating,
                slideImages1: req.query.slideImages1, // Use the array of image paths
                slideImages2: req.query.slideImages2, // Use the array of image paths
                slideImages3: req.query.slideImages3, // Use the array of image paths
                category1: req.query.category1,
                category2: req.query.category2,
            };

            const userIds = reviews.map(review => review.userID);
            const users = await db.collection('users').find({ inf_id: { $in: userIds } }).toArray();

            const userIdToUsernameMap = {};
            users.forEach(user => {
                userIdToUsernameMap[user.inf_id] = user.username;
            });
            console.log('Users:', userIdToUsernameMap); // Log users array to check its content
            console.log('Users:', users); // Log users array to check its contents
            // Render the review page template with all the necessary data

            const userIdS = Object.entries(userIdToUsernameMap);
            res.render('reviewpage', { 

                reviews: reviews,
                username: username,
                cafes: cafes,
                cafe: cafeDetails,
                reviewCount: reviewCount,
       
                username:username,
                userIdToUsernameMap: userIdS,
            });
        } else {
            // Handle case where establishment is not found
            res.status(404).send('Establishment not found');
        }
    } catch (error) {
        console.error(error);
        // Handle errors appropriately
        res.status(500).send('Internal Server Error');
    }
});



app.get('/delete-review/:reviewId', (req, res) => {
    // This route handler is just for demonstration purposes
    // You might want to handle the GET request differently, such as rendering an error page
    res.status(404).send('Not found');
});


app.get('/searchpage', async function(req, res) {
  try {
      let query = req.query.query || ''; // If no query parameter is provided, default to an empty string

      // Check if the query is not empty
      if (query.trim() !== '') {
          const db = req.app.locals.db;
          const result = await db.collection('cafes').find({ name: { $regex: query, $options: 'i' } }).toArray();
          
          // Render the searchpage.hbs template with the search results only
          return res.render('searchpage', { result: result });
      } else {
          // If the query is empty, render the search page without any results
          return res.render('searchpage', { result: [] });
      }
  } catch (err) {
      console.error('Error searching cafes by name:', err);
      return res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/profile', async function(req, res) {
    try {
        const db = req.app.locals.db;
        const username = req.query.username; // Get username
        
        // Find the user
        const matchedUser = await db.collection('users').findOne({ username: username });
        
        if (!matchedUser) {
            // Error for no user found
            return res.status(404).send('User not found');
        }
        const userInfId = matchedUser.inf_id;
        
        // match user inf_id with review user_ID
        const reviews = await db.collection('reviews').find({ userID: userInfId }).toArray();
        const comments = await db.collection('comments').find({ userID: userInfId }).toArray();
        
        // Divide reviews into sets of three
        const reviewSets = [];
        for (let i = 0; i < reviews.length; i += 3) {
            reviewSets.push(reviews.slice(i, i + 3));
        }

        // Divide comments into sets of three
        const commentSets = [];
        for (let i = 0; i < comments.length; i += 3) {
            commentSets.push(comments.slice(i, i + 3));
        }
  
        const cafes = [];
        for (const reviewSet of reviewSets) {
            for (const review of reviewSet) {
                const cafe = await db.collection('cafes').findOne({ inf_id: review.cafeID });
                if (cafe) {
                    review.logoimage = cafe.logoimage;
                    cafes.push(cafe);
                }
            }
        }

        const commentCafes = [];
        for (const commentSet of commentSets) {
            for (const comment of commentSet) {
                const user = await db.collection('users').findOne({ inf_id: comment.userID });
                const review = await db.collection('reviews').findOne({ inf_id: comment.reviewID });
                const reviewer = await db.collection('users').findOne({ inf_id: review.userID });
                if (user) {
                    comment.profilepicture = reviewer.profilepicture;
                    comment.reviewtitle = review.reviewtitle;
                    comment.reviewer = reviewer.username;
                    commentCafes.push(user);
                }
            }
        }
        
        const pages = reviews.length + 3 + comments.length;
        const numberOfDots = Math.ceil(pages / 3);
        const dots = Array.from({ length: numberOfDots }, (_, index) => index + 1);
  
        res.render('profile', { 
            sampleUser: matchedUser,
            reviewSets: reviewSets,
            commentSets: commentSets,
            commentCafes: commentCafes,
            cafes: cafes,
            dots: dots,
            username: username
        });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/view-establishments', async function(req, res) {

    const db = req.app.locals.db;
    const username = req.query.username; // Get username
    const filter = req.query.filter; // Get data filter
    const user = await db.collection('users').findOne({ username: username });
    
    if (user){

        const pic = user.profilepicture;

        if (filter === "Top-recommendations"){
            res.render('view-establishments', {
                cafes: topThreeCafes, // Pass the top three cafes
                username :username,
                pic : pic
            });
        }

        else if (filter === "Budget-Friendly"){
            res.render('view-establishments', {
                cafes: budgetFriendlyCafes, // Pass the budget friendly cafes
                username :username,
                pic : pic
            });
        }

        else if (filter === "Study-Friendly"){
            res.render('view-establishments', {
                cafes: studyFriendlyCafes, // Pass the student friendly cafes
                username :username,
                pic : pic
            });
        }

        else{

            res.render('view-establishments', {
                studyFriendlyCafes: studyFriendlyCafes,
                budgetFriendlyCafes: budgetFriendlyCafes,
                cafes: cafes, // Pass all cafes
                topThreeCafes: topThreeCafes, // Pass the top three cafes
                username :username,
                pic : pic
            });
        }
    }

    else{

        if (filter === "Top-recommendations"){
            res.render('view-establishments', {
                cafes: topThreeCafes, // Pass the top three cafes
                username :username,
            });
        }

        else if (filter === "Budget-Friendly"){
            res.render('view-establishments', {
                cafes: budgetFriendlyCafes, // Pass the budget friendly cafes
                username :username,
            });
        }

        else if (filter === "Study-Friendly"){
            res.render('view-establishments', {
                cafes: studyFriendlyCafes, // Pass the student friendly cafes
                username :username,
            });
        }

        else{

            res.render('view-establishments', {
                studyFriendlyCafes: studyFriendlyCafes,
                budgetFriendlyCafes: budgetFriendlyCafes,
                cafes: cafes, // Pass all cafes
                topThreeCafes: topThreeCafes, // Pass the top three cafes
                username :username,
            });
        }
    }
});

app.get('/', function(req, res) {
    res.redirect('/index');
});

MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db(); // Get the database
        app.locals.db = db; // Set the database connection to app.locals

        db.dropDatabase()
            .then(result => {
                console.log('Database deleted successfully');
            })
            .catch(err => {
                console.error('Error deleting database:', err);
        });

        // Insert data into the database
        db.collection('cafes').insertMany(cafes)
            .then(result => {
                console.log(`${result.insertedCount} cafes inserted`);
            })
            .catch(err => {
                console.error('Error inserting cafes into the database:', err);
                client.close(); // Close the MongoDB client if an error occurs
            });

        db.collection('users').insertMany(users)
        .then(result => {
            console.log(`${result.insertedCount} users inserted`);
        })
        .catch(err => {
            console.error('Error inserting users into the database:', err);
            client.close(); // Close the MongoDB client if an error occurs
        });

        //NOTE: THESE DOCUMENTS ONLY REFERENCE THE INFORMAL IDS OF THOSE USERS AND CAFES

        db.collection('reviews').insertMany(reviews)
        .then(result => {
            console.log(`${result.insertedCount} reviews inserted`);
        })
        .catch(err => {
            console.error('Error inserting reviews into the database:', err);
            client.close(); // Close the MongoDB client if an error occurs
        });

        db.collection('comments').insertMany(comments)
        .then(result => {
            console.log(`${result.insertedCount} comments inserted`);
        })
        .catch(err => {
            console.error('Error inserting comments into the database:', err);
            client.close(); // Close the MongoDB client if an error occurs
        });

        // Start the server after data insertion
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

