const { Schema, model, ObjectId, mongoose } = require('mongoose');

const reviewSchema = new Schema({
    userID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    cafeID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Cafe', 
        required: true 
    }, 
    cafeRating: {
        type: Number,
        required: true
    },
    reviewTitle: {
        type: String,
        required: true
    },
    reviewBody: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    media: {
        type: String
    },
    helpful: {
        type: Number,
        default: 0
    },
    unhelpful: {
        type: Number,
        default: 0
    },
    isEdited: {
        type: Boolean,
        default: false
    }
});

const Review = model('Review', reviewSchema);

module.exports = Review;
