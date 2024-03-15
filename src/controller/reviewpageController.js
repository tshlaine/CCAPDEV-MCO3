const express = require('express');
const router = express.Router();
const cafes = require('../models/cafes.metadata.json');
const reviews = require('../models/reviews.metadata.json');
const users = require('../models/users.metadata.json');

router.get('/reviewpage', (req, res) => {
    // Ensure category is an array
    let category = req.query.category || [];
    if (!Array.isArray(category)) {
        category = [category]; // Convert to array if it's not already
    }

    const category1 = category[0]
    const category2 = category[1]

    const cafeDetails = {
        name: req.query.name,
        location: req.query.location,
        description: req.query.description,
        averageRating: req.query.averageRating,
        slideImages1: req.query.slideImages1, // Use the array of image paths
        slideImages2: req.query.slideImages2, // Use the array of image paths
        slideImages3: req.query.slideImages3, // Use the array of image paths
        category1,category2
    };

    res.render('reviewpage', { 
        cafes: cafes,
        cafe: cafeDetails,
        reviews: reviews,
        users: users 
    });
});
