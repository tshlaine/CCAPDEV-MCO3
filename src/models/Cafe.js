const { Schema, model, mongoose } = require('mongoose');

const cafeSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    
    location: {
        type: String,
        required: true
    },
    location_link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0 // Assuming averageRating starts from 0
    },
    logo_images: {type: String, required: true}, // Assuming media is an array of strings (e.g., image URLs)
    cafe_image: {type: String, required: true},
    cafe_header: {type: String, required: true},
    category: {
        type: String,
        required: false
    },
    noOfReviews: {
        type: Number,
        default: 0 // Assuming noOfReviews starts from 0
    },
    noOfLike: {
        type: Number,
        default: 0 // Assuming noOfReviews starts from 0
    },
    noOfDislike: {
        type: Number,
        default: 0 // Assuming noOfReviews starts from 0
    }

});

const Cafe = model('Cafe', cafeSchema);

module.exports = Cafe;
