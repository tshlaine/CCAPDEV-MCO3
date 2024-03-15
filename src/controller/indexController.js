const express = require('express');
const router = express.Router();
const cafes = require('../models/cafes.metadata.json');

const cafesSorted = cafes.sort((a, b) => b.averageRating - a.averageRating);
const budgetFriendlyCafes = cafes.filter(cafe => cafe.category && cafe.category.includes('Budget-Friendly'));
const studyFriendlyCafes = cafes.filter(cafe => cafe.category && cafe.category.includes('Study-Friendly'));
const topThreeCafes = cafesSorted.slice(0, 3);

router.get('/index', function(req, res) {
    res.render('index', {
        studyFriendlyCafes: studyFriendlyCafes,
        budgetFriendlyCafes: budgetFriendlyCafes,
        cafes: cafes,
        topThreeCafes: topThreeCafes
    });
});

module.exports = router;
