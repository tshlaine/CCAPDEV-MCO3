const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const { MongoClient } = require('mongodb');
const fs = require('fs');

const app = express();
const PORT = 3000;
const rawCafe = fs.readFileSync('src/models/cafes.metadata.json');
const cafes = JSON.parse(rawCafe);
const rawUser = fs.readFileSync('src/models/users.metadata.json');
const users = JSON.parse(rawUser);
const rawReview = fs.readFileSync('src/models/reviews.metadata.json');
const reviews = JSON.parse(rawReview);
const rawComment = fs.readFileSync('src/models/comments.metadata.json');
const comments = JSON.parse(rawComment);

const uri = 'mongodb://localhost:27017/mydatabase';

const hbs = require('express-handlebars');
hbs.create({
    extname: '.hbs',
    defaultLayout: false,
    partialsDir: [
        path.join(__dirname, 'src', 'views', 'partials')
    ]
});

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: false
        }));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// Sort the cafes based on their averageRating property from highest to lowest
const cafesSorted = cafes.sort((a, b) => b.averageRating - a.averageRating);
// Select the top three cafes
const topThreeCafes = cafesSorted.slice(0, 3);

// Route handler for /index
app.get('/index', function(req, res) {
    res.render('index', {
        cafes: cafes, // Pass all cafes
        topThreeCafes: topThreeCafes // Pass the top three cafes
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
    });
});

app.get('/other-profile', function(req, res) {
    res.render('other-profile', {
    });
});

app.get('/profile', function(req, res) {
    res.render('profile', {
    });
});

app.get('/reviewpage', function(req, res) {
    res.render('reviewpage', {
    });
});

app.get('/searchpage', function(req, res) {
    res.render('searchpage', {

    });
});

app.get('/view-establishments', function(req, res) {
    res.render('view-establishments', {

    });
});

app.get('/', function(req, res) {
    res.redirect('/index');
});


MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db(); // Get the database

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


        //NOTE: THE USERID, CAFEID, REVIEWID THAT ARE REFERENCED MIGHT NOT REALLY CORRESPOND SA DOCUMENTS ABOVE

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
            // Start the server after data insertion
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch(err => {
            console.error('Error inserting comments into the database:', err);
            client.close(); // Close the MongoDB client if an error occurs
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

