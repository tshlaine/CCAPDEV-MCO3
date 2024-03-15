const express = require('express');
const router = express.Router();
const cafes = require('../models/cafes.metadata.json');

const cafesSorted = cafes.sort((a, b) => b.averageRating - a.averageRating);

const budgetFriendlyCafes = cafes.filter(cafe => cafe.category && cafe.category.includes('Budget-Friendly'));

const studyFriendlyCafes = cafes.filter(cafe => cafe.category && cafe.category.includes('Study-Friendly'));

// Select the top three cafes
const topThreeCafes = cafesSorted.slice(0, 3);

router.get('/view-establishments', function(req, res) {
    res.render('view-establishments', {
        studyFriendlyCafes: studyFriendlyCafes,
        budgetFriendlyCafes: budgetFriendlyCafes,
        cafes: cafes,
        topThreeCafes: topThreeCafes
    });
});

module.exports = router;
