const { Schema, model, ObjectId, mongoose } = require('mongoose');

const commentSchema = new Schema({

    userID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    reviewID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Review', 
        required: true 
    }, 
    textContent: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
