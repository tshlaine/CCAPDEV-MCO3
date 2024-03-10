const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const { MongoClient } = require('mongodb');
const fs = require('fs');

const app = express();
const PORT = 3000;
const rawData = fs.readFileSync('src/models/cafes.metadata.json');
const cafes = JSON.parse(rawData);

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
                // Start the server after data insertion
                app.listen(PORT, () => {
                    console.log(`Server is running on port ${PORT}`);
                });
            })
            .catch(err => {
                console.error('Error inserting cafes into the database:', err);
                client.close(); // Close the MongoDB client if an error occurs
            });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

