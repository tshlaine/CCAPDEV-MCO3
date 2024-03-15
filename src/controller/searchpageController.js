const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/searchpage', async function(req, res) {
    try {
        // Logic to search for cafes in the database
        res.render('searchpage', { result: result });
    } catch (err) {
        console.error('Error searching cafes by name:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;